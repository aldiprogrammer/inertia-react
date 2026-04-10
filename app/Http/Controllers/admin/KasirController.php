<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\KodeOrder;
use App\Models\ListOrder;
use App\Models\Order;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    function index(Request $request)
    {
        $search = $request->search;
        $produk = Produk::where('nama', 'like', '%' . $request->search . '%')->orWhere('kategori', 'like', "%{$search}%")->get();
        $kategori = Kategori::all();
        $cekorder = Order::count();
        if ($cekorder == 0) {
            $kode = KodeOrder::first();
            $kodeorder = $kode->kode;
        } else {
            $order = Order::orderBy('id', 'desc')->first();
            $angka = $order->kode + 1;
            $kodeorder = str_pad($angka, 5, "0", STR_PAD_LEFT);
        }
        $listorder = ListOrder::with('listproduk')->where('kode_order', $kodeorder)->get();
        $total = ListOrder::where('kode_order', $kodeorder)->sum('total_harga');
        return Inertia::render('Admin/Kasir', compact('produk', 'kategori', 'kodeorder', 'listorder', 'total'));
    }
}
