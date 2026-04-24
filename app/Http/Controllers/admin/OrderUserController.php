<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ListOrder;
use App\Models\Orderuser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderUserController extends Controller
{
    function index()
    {
        $order = Orderuser::where('status', 0)->get();
        return response()->json($order);
    }

    function data()
    {
        $order = Orderuser::orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Orderuser', compact('order'));
    }

    function hapus($kode)
    {
        $order = Orderuser::where('kode_order', $kode)->first();
        $order->delete();

        $ls = ListOrder::where('kode_order', $kode)->delete();
        return redirect()->back()->with('success', 'Data berhasil di hapus');
    }

    function detail($kode)
    {
        $ls = ListOrder::where('kode_order', $kode)->get();
        $kodeorder = $kode;
        return Inertia::render('Admin/Detailorder', compact('ls', 'kodeorder'));
    }

    function hapusdetail($id)
    {
        $lo = ListOrder::find($id);
        $lo->delete();
        return redirect()->back()->with('success', 'Data berhasil di hapus');
    }
}
