<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\KodeOrder;
use App\Models\ListOrder;
use App\Models\Meja;
use App\Models\Order;
use App\Models\Orderuser;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasirController extends Controller
{
    function index(Request $request, $kode = null)
    {


        $search = $request->search;
        $produk = Produk::where('nama', 'like', '%' . $request->search . '%')->orWhere('kategori', 'like', "%{$search}%")->get();
        $kategori = Kategori::all();
        if (!$request->session()->has('kode_order')) {
            $request->session()->put('kode_order', 'ORD-' . rand(100000, 999999));
        }
        if ($kode == null) {
            $kodeorder = $request->session()->get('kode_order');
        } else {
            $kodeorder = $kode;
        }

        $listorder = ListOrder::with('listproduk')->where('kode_order', $kodeorder)->get();
        $total = ListOrder::where('kode_order', $kodeorder)->sum('total_harga');
        $meja = Meja::all();
        $orderuser = Orderuser::where('kode_order', $kodeorder)->first();
        return Inertia::render('Admin/Kasir', compact('produk', 'kategori', 'kodeorder', 'listorder', 'total', 'meja', 'orderuser'));
    }
}
