<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ListOrder extends Model
{
    //
    public function listproduk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
