<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sell;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class SellController extends Controller
{
    public function index()
    {
        return Sell::with('itens.product')->orderBy('sale_date', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'itens' => 'required|array|min:1',
            'itens.*.product_id' => 'required|exists:products,id',
            'itens.*.amount' => 'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        DB::beginTransaction();
        try {
            foreach ($request->itens as $itemData) {
                $product = Product::find($itemData['product_id']);
                if ($product->stock < $itemData['amount']) {
                    throw new Exception("Estoque insuficiente para o product: {$product->name}");
                }
            }
            $valorTotalSell = 0;
            foreach ($request->itens as $itemData) {
                $product = Product::find($itemData['product_id']);
                $valorTotalSell += $product->sale_price * $itemData['amount'];
            }
            $sell = Sell::create(['total_value' => $valorTotalSell]);
            foreach ($request->itens as $itemData) {
                $product = Product::find($itemData['product_id']);
                $sell->itens()->create([
                    'product_id' => $product->id,
                    'amount' => $itemData['amount'],
                    'unit_price' => $product->sale_price,
                    'subtotal' => $product->sale_price * $itemData['amount'],
                ]);
                $product->decrement('stock', $itemData['amount']);
            }
            DB::commit();
            return response()->json($sell->load('itens.product'), 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao processar a venda', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(Sell $sell)
    {
        return $sell->load('itens.product');
    }

    public function update(Request $request, Sell $sell)
    {
        $validator = Validator::make($request->all(), [
            'itens' => 'required|array|min:1',
            'itens.*.product_id' => 'required|exists:products,id',
            'itens.*.amount' => 'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        DB::beginTransaction();
        try {
            foreach ($sell->itens as $itemOriginal) {
                Product::find($itemOriginal->product_id)->increment('stock', $itemOriginal->amount);
            }
            foreach ($request->itens as $itemNovoData) {
                $product = Product::find($itemNovoData['product_id']);
                if ($product->stock < $itemNovoData['amount']) {
                    throw new Exception("Estoque insuficiente para o product: {$product->name}");
                }
            }
            $novoValorTotal = 0;
            $sell->itens()->delete();
            foreach ($request->itens as $itemNovoData) {
                $product = Product::find($itemNovoData['product_id']);
                $subtotal = $product->sale_price * $itemNovoData['amount'];
                $novoValorTotal += $subtotal;
                $sell->itens()->create([
                    'product_id' => $product->id,
                    'amount' => $itemNovoData['amount'],
                    'unit_price' => $product->sale_price,
                    'subtotal' => $subtotal,
                ]);
                $product->decrement('stock', $itemNovoData['amount']);
            }
            $sell->update(['total_value' => $novoValorTotal]);
            DB::commit();
            return response()->json($sell->load('itens.product'));
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao atualizar a venda', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function destroy(Sell $sell)
    {
        DB::beginTransaction();
        try {
            foreach ($sell->itens as $item) {
                Product::find($item->product_id)->increment('stock', $item->amount);
            }
            $sell->delete();
            DB::commit();
            return response()->json(null, 204);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao cancelar a venda', 'error' => $e->getMessage()], 500);
        }
    }
}
