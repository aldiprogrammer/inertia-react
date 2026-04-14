<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    function index()
    {
        $kategori = Kategori::all();
        $produk = Produk::all();
        return Inertia::render('App/Home', compact('kategori', 'produk'));
    }
}
