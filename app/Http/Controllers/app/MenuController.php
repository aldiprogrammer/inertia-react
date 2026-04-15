<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\KodeOrder;
use App\Models\Meja;
use App\Models\Order;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    function index(Request $request, $menu)
    {
        // $cekorder = Order::count();
        // if ($cekorder == 0) {
        //     $kode = KodeOrder::first();
        //     $kodeorder = $kode->kode;
        // } else {
        //     $order = Order::orderBy('id', 'desc')->first();
        //     $angka = $order->kode + 1;
        //     $kodeorder = str_pad($angka, 5, "0", STR_PAD_LEFT);
        // }

        if (!$request->session()->has('kode_order')) {
            $request->session()->put('kode_order', 'ORD-' . rand(100000, 999999));
        }
        if ($menu == 'All') {
            $produk = Produk::get();
            $menu = 'All Menu';
        } else {
            $produk = Produk::where('kategori', $menu)->get();
        }

        $kategori = Kategori::all();
        $meja = Meja::all();
        $kodeorder = $request->session()->get('kode_order');
        return Inertia::render('App/Menu', compact('kategori', 'produk', 'menu', 'kodeorder', 'meja'));
    }
}
