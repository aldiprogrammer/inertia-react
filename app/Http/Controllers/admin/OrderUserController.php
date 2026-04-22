<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Orderuser;
use Illuminate\Http\Request;

class OrderUserController extends Controller
{
    function index()
    {
        $order = Orderuser::where('status', 0)->get();
        return response()->json($order);
    }
}
