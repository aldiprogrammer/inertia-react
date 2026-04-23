<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Meja;
use App\Models\Member;
use App\Models\Orderuser;
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
        $profil = Member::where('id_user', $user->id)->first();
        $total = Orderuser::where('id_user', $user->id)->sum('total_harga');
        return Inertia::render('App/Profil', compact('profil', 'kodeorder', 'meja', 'total'));
    }

    function store(Request $request)
    {
        $cek = Member::where('id_user', $request->id_user)->first();
        if ($cek == true) {
            $request->validate(
                [
                    'wa' => ['required', 'digits_between:10,14'], // min 10, max 14 digit
                ],
                [
                    'wa' => 'Nomor WhatsApp harus terdiri dari 10 sampai 14 digit'
                ]
            );
            $pp = Member::find($cek->id);
            $pp->tgl_lahir = $request->tgl_lahir;
            $pp->nohp = $request->wa;
            $pp->alamat = $request->alamat;
            $pp->alamat = $request->alamat;
            $pp->update();
            return redirect()->back()->with('success', 'Data berhasil diupdate');
        } else {

            $request->validate([
                'wa' => ['required', 'digits_between:10,14'], // min 10, max 14 digit
            ], [
                'wa' => 'Nomor WhatsApp harus terdiri dari 10 sampai 14 digit'
            ]);


            $pp = new Member();
            $pp->tanggal_daftar = date('Y-m-d');
            $pp->nama = $request->nama;
            $pp->kode = 'MM-' . rand(0, 100000);
            $pp->id_user = $request->id_user;
            $pp->tgl_lahir = $request->tgl_lahir;
            $pp->nohp = $request->wa;
            $pp->alamat = $request->alamat;
            $pp->status = 1;

            $pp->save();
            return redirect()->back()->with('success', 'Member berhasil dibuat');
        }
    }
}
