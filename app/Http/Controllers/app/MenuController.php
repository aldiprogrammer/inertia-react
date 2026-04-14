<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\KodeOrder;
use App\Models\Order;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    function index($menu)
    {
        $cekorder = Order::count();
        if ($cekorder == 0) {
            $kode = KodeOrder::first();
            $kodeorder = $kode->kode;
        } else {
            $order = Order::orderBy('id', 'desc')->first();
            $angka = $order->kode + 1;
            $kodeorder = str_pad($angka, 5, "0", STR_PAD_LEFT);
        }
        if ($menu == 'All') {
            $produk = Produk::get();
            $menu = 'All Menu';
        } else {
            $produk = Produk::where('kategori', $menu)->get();
        }

        $kategori = Kategori::all();
        return Inertia::render('App/Menu', compact('kategori', 'produk', 'menu', 'kodeorder'));
    }
}
