<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
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

    function delete($id)
    {
        $pp = Order::find($id);
        $pp->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    function testprint()
    {
        return Inertia::render('Admin/Testprint');
    }
}
