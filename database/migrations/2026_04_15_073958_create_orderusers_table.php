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
        Schema::create('orderusers', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal', 16);
            $table->string('id_user', 11);
            $table->string('kode_order', 30);
            $table->string('total_harga');
            $table->string('jenis_pesanan', 50);
            $table->string('meja', 50);
            $table->string('catatan');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderusers');
    }
};
