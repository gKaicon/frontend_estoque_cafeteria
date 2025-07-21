<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Buy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class BuyController extends Controller
{
    public function index()
    {
        return Buy::with('itens.product')->orderBy('purchase_date', 'desc')->get();
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

        $productIds = collect($request->itens)->pluck('product_id');
        $products = Product::findMany($productIds)->keyBy('id');

        DB::beginTransaction();
        try {
            $valorTotalBuy = 0;
            $itensParaCriar = [];

            foreach ($request->itens as $itemData) {
                $product = $products[$itemData['product_id']];
                $subtotal = $product->sale_price * $itemData['amount'];
                $valorTotalBuy += $subtotal;

                $itensParaCriar[] = [
                    'product_id' => $product->id,
                    'amount' => $itemData['amount'],
                    'unit_price' => $product->sale_price,
                    'subtotal' => $subtotal,
                ];

                $product->increment('stock', $itemData['amount']);
            }

            $buy = Buy::create(['total_value' => $valorTotalBuy]);
            $buy->itens()->createMany($itensParaCriar);

            DB::commit();
            return response()->json($buy->load('itens.product'), 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao processar a compra', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(Buy $buy)
    {
        return $buy->load('itens.product');
    }



    public function update(Request $request, Buy $buy)
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

            foreach ($buy->itens as $itemOriginal) {
                Product::find($itemOriginal->product_id)->decrement('stock', $itemOriginal->amount);
            }

            $productIds = collect($request->itens)->pluck('product_id');
            $products = Product::findMany($productIds)->keyBy('id');

            $novoValorTotal = 0;
            $novosItensParaCriar = [];

            foreach ($request->itens as $itemNovoData) {
                $product = $products[$itemNovoData['product_id']];
                $subtotal = $product->sale_price * $itemNovoData['amount'];
                $novoValorTotal += $subtotal;

                $novosItensParaCriar[] = [
                    'product_id' => $product->id,
                    'amount' => $itemNovoData['amount'],
                    'unit_price' => $product->sale_price,
                    'subtotal' => $subtotal,
                ];

                $product->increment('stock', $itemNovoData['amount']);
            }

            $buy->itens()->delete(); 
            $buy->itens()->createMany($novosItensParaCriar); 
            $buy->update(['total_value' => $novoValorTotal]);

            DB::commit();
            return response()->json($buy->load('itens.product'));
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao atualizar a compra', 'error' => $e->getMessage()], 500);
        }
    }


    public function destroy(Buy $buy)
    {
        DB::beginTransaction();
        try {
            foreach ($buy->itens as $item) {
                Product::find($item->product_id)->decrement('stock', $item->amount);
            }
            $buy->delete();
            DB::commit();
            return response()->json(null, 204);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Erro ao cancelar a compra', 'error' => $e->getMessage()], 500);
        }
    }
}
