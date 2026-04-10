<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    function index()
    {
        $member = Member::all();
        $kode = "KDM-" . rand(0, 100000);
        return Inertia::render('Admin/Member', compact('member', 'kode'));
    }

    function store(Request $request)
    {
        $mb = new Member();
        $mb->tanggal_daftar = $request->tgl_daftar;
        $mb->kode = $request->kode;
        $mb->tgl_lahir = $request->tgl_lahir;
        $mb->nama = $request->nama;
        $mb->nohp = $request->nohp;
        $mb->alamat = $request->alamat;
        $mb->status = 1;
        $mb->save();
        return redirect()->back()->with('success', 'Data berhasil disimpan');
    }

    function update(Request $request, $id)
    {
        $mb = Member::find($id);
        $mb->tanggal_daftar = $request->tgl_daftar;
        $mb->kode = $request->kode;
        $mb->tgl_lahir = $request->tgl_lahir;
        $mb->nama = $request->nama;
        $mb->nohp = $request->nohp;
        $mb->alamat = $request->alamat;
        $mb->status = 1;
        $mb->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {

        $mb = Member::find($id);
        $mb->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    function status($id)
    {
        $mb = Member::find($id);
        if ($mb->status == 1) {
            $mb->status = 0;
        } else {
            $mb->status = 1;
        }
        $mb->update();
        return redirect()->back()->with('success', 'Status berhasil diupdate');
    }
}
