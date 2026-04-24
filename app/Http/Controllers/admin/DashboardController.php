<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\Order;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index()
    {
        $member = Member::count();
        $ordertoday = Order::where('tanggal', date('Y-m-d'))->count();
        $order = Order::count();
        $produk = Produk::count();
        $dataorder = Order::where('tanggal', date('Y-m-d'))->limit(5)->orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Home', compact('member', 'ordertoday', 'order', 'produk', 'dataorder'));
    }
}
