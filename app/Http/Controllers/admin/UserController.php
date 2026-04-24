<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    function index()
    {
        $user = User::all();
        return Inertia::render('Admin/User', compact('user'));
    }

    function hapus($id)
    {
        $us = User::find($id);
        $us->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
