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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 18);
            $table->string('id_kasir', 30);
            $table->string('kode', 15);
            $table->string('kode_member', 30);
            $table->string('meja', 30);
            $table->string('total_harga', 30);
            $table->string('uang', 30);
            $table->string('kembalian', 30);
            $table->integer('diskon');
            $table->string('metode_pembayaran', 30);
            $table->string('jenis_pesanan', 30);
            $table->string('status', 11);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
