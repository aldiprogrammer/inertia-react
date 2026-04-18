<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Meja;
use App\Models\profil;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Profiler\Profile;

class ProfilController extends Controller
{
    function index(Request $request)
    {
        $meja = Meja::all();
        $kodeorder = $request->session()->get('kode_order');
        $user = Auth::user();
        $profil = Profil::where('id_user', $user->id)->first();
        return Inertia::render('App/Profil', compact('profil', 'kodeorder', 'meja'));
    }

    function store(Request $request)
    {
        $cek = Profil::where('id_user', $request->id_user)->first();
        if ($cek == true) {
            $pp = Profil::find($cek->id);
            $pp->id_user = $request->id_user;
            $pp->tgl_lahir = $request->tgl_lahir;
            $pp->nowa = $request->wa;
            $pp->alamat = $request->alamat;
            $pp->update();
        } else {
            $pp = new profil();
            $pp->id_user = $request->id_user;
            $pp->tgl_lahir = $request->tgl_lahir;
            $pp->nowa = $request->wa;
            $pp->alamat = $request->alamat;
            $pp->save();
        }

        return redirect()->back()->with('success', 'Data berhasil diupdate');
    }
}
