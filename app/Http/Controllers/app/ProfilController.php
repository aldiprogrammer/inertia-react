<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Meja;
use App\Models\profil;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilController extends Controller
{
    function index(Request $request)
    {
        $meja = Meja::all();
        $kodeorder = $request->session()->get('kode_order');
        return Inertia::render('App/Profil', compact('kodeorder', 'meja'));
    }

    function store(Request $request)
    {
        $pp = new profil();
        $pp->id_pengguna = 1;
        $pp->tgl_lahir = $request->tgl_lahir;
        $pp->nowa = $request->wa;
        $pp->alamat = $request->alamat;
        $pp->save();
        return redirect()->back()->with('success', 'Data berhasil diupdate');
    }
}
