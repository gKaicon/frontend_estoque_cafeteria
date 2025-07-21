<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('item_buys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buy_id')->constrained('buys')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products');
            $table->integer('amount');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_buys');
    }
};
