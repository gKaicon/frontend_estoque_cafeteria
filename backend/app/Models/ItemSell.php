<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemSell extends Model
{
    protected $table = 'item_sells';
    protected $fillable = ['sell_id', 'product_id', 'amount', 'unit_price', 'subtotal'];
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    public function sell(): BelongsTo
    {
        return $this->belongsTo(Sell::class);
    }
}
