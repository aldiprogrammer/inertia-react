<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\ListOrder;
use App\Models\Meja;
use App\Models\Orderuser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PesananandaController extends Controller
{
    function index(Request $request)
    {
        $user = Auth::user();
        $orderuser = Orderuser::where('id_user', $user->id)->get();
        $kodeorder = $request->session()->get('kode_order');
        $meja  = Meja::all();
        return Inertia::render('App/Pesanananda', compact('orderuser', 'kodeorder', 'meja'));
    }

    function detail(Request $request, $kode)
    {
        $order = Orderuser::where('kode_order', $kode)->first();
        $listorder = ListOrder::with('listproduk')->where('kode_order', $kode)->get();
        $kodeorder = $request->session()->get('kode_order');
        $meja  = Meja::all();
        $tanggal = $order->tanggal;
        return Inertia::render('App/Detailpesanan', compact('listorder', 'kodeorder', 'meja', 'tanggal', 'order'));
    }
}
