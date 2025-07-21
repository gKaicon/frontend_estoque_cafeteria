<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sell extends Model
{
    protected $fillable = ['total_value', 'sale_date'];
    public function itens(): HasMany
    {
        return $this->hasMany(ItemSell::class);
    }
}
