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
        Schema::create('list_orders', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 18);
            $table->string('kode_order', 11);
            $table->string('produk', 50);
            $table->string('harga', 11);
            $table->string('qty', 11);
            $table->string('total_harga', 11);
            $table->string('status', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_orders');
    }
};
