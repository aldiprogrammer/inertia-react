<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Meja;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index(Request $request)
    {
        $kategori = Kategori::all();
        $produk = Produk::inRandomOrder()->limit(6)->get();
        $meja = Meja::all();
        $kodeorder = $request->session()->get('kode_order');
        return Inertia::render('App/Home', compact('kategori', 'produk', 'meja', 'kodeorder'));
    }
}
