<?php

namespace App\Http\Controllers\admin;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Pesan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Pesancontroller extends Controller
{
    function index()
    {
        $pesan = Pesan::all();
        return Inertia::render('Admin/Pesan', compact('pesan'));
    }

    function send(Request $request)
    {
        $msg = Pesan::create([
            'user' => $request->user,
            'message' => $request->message
        ]);
        broadcast(new MessageSent($msg))->toOthers();
        return back();
    }
}
