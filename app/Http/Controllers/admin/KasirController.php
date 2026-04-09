<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    function index()
    {
        $produk = Produk::all();
        $kategori = Kategori::all();
        return Inertia::render('Admin/Kasir', compact('produk', 'kategori'));
    }
}
