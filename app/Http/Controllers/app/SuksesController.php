<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuksesController extends Controller
{
    function index(Request $request)
    {
        $kodeorder =  $request->session()->get('kode_order');
        return Inertia::render('App/Sukses', compact('kodeorder'));
    }
}
