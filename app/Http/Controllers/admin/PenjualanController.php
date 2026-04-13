<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ListOrder;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenjualanController extends Controller
{
    function index()
    {

        $penjualan = Order::all();
        return Inertia::render('Admin/Penjualan', compact('penjualan'));
    }

    function penjualanhariini()
    {
        $penjualan = Order::where('tanggal', date('Y-m-d'))->get();
        return Inertia::render('Admin/Penjualanhariini', compact('penjualan'));
    }


    function testprint()
    {
        return Inertia::render('Admin/Testprint');
    }

    function detail($kode)
    {
        $detail = ListOrder::where('kode_order', $kode)->get();
        $total = ListOrder::where('kode_order', $kode)->sum('total_harga');
        $kodeorder = $kode;
        return Inertia::render('Admin/Detailpenjualan', compact('detail', 'total', 'kodeorder'));
    }

    function hapusdetail($id)
    {
        $lo = ListOrder::find($id);
        $lo->delete();
        return redirect()->back()->with('success', 'Data berhasil di hapus');
    }

    function hapusorder($kode)
    {
        $order = Order::where('kode', $kode)->first();
        $order->delete();

        $ls = ListOrder::where('kode_order', $kode)->delete();
        return redirect()->back()->with('success', 'Data berhasil di hapus');
    }
}
