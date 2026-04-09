<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    function index()
    {
        $pegawai = Pegawai::all();
        return Inertia::render('Admin/Pegawai', compact('pegawai'));
    }

    function store(Request $request)
    {
        $pg = new Pegawai();
        $pg->tgl_masuk = $request->tgl_masuk;
        $pg->nama = $request->nama;
        $pg->nohp = $request->nohp;
        $pg->alamat = $request->alamat;
        $pg->jenis_kelamin = $request->jenis_kelamin;
        $pg->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $pg = Pegawai::find($id);
        $pg->tgl_masuk = $request->tgl_masuk;
        $pg->nama = $request->nama;
        $pg->nohp = $request->nohp;
        $pg->alamat = $request->alamat;
        $pg->jenis_kelamin = $request->jenis_kelamin;
        $pg->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $pg = Pegawai::find($id);
        $pg->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
