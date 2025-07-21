<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemBuy extends Model
{
    use HasFactory;

    protected $table = 'item_buys';
    protected $fillable = ['buy_id', 'product_id', 'amount', 'unit_price', 'subtotal'];
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    public function buy(): BelongsTo
    {
        return $this->belongsTo(Buy::class);
    }
}
