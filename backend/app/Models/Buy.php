<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Buy extends Model
{
    use HasFactory;
    protected $fillable = ['total_value', 'purchase_date'];
    public function itens(): HasMany
    {
        return $this->hasMany(ItemBuy::class);
    }
}
