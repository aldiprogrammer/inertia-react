<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    function index()
    {
        $kategori = Kategori::all();
        $kode = 'KTR-' . rand(0, 100000);
        return Inertia::render('Admin/Kategori', compact('kategori', 'kode'));
    }

    function store(Request $request)
    {
        $kt = new Kategori();
        $kt->kode = $request->kode;
        $kt->kategori = $request->kategori;
        $kt->save();
        return redirect()->back();
    }

    function delete($id)
    {
        $kt = Kategori::find($id);
        $kt->delete();
        return redirect()->back();
    }

    function update(Request $request, $id)
    {
        $kt = Kategori::find($id);
        $kt->kode = $request->kode;
        $kt->kategori = $request->kategori;
        $kt->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }
}
