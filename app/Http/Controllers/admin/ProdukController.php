<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    function index()
    {
        $produk = Produk::all();
        $kategori = Kategori::all();
        $kode = 'PRD-' . rand(0, 100000);

        return Inertia::render('Admin/Produk', compact('produk', 'kategori', 'kode'));
    }

    function store(Request $request)
    {
        $pr = new Produk();
        $path = null;
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('produk', 'public');
        }

        $pr->kode = $request->kode;
        $pr->nama = $request->nama;
        $pr->kategori = $request->kategori;
        $pr->harga = $request->harga;
        $pr->diskon = $request->diskon;
        $pr->status = 1;
        $pr->gambar = $path;
        $pr->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        // dd($request->kode);
        // die();
        $request->validate([
            'kode' => 'required',
            'nama' => 'required',
            'kategori' => 'required',
            'harga' => 'required',
            'diskon' => 'required',
        ]);

        $pr = Produk::findOrFail($id);

        $pr->kode = $request->kode;
        $pr->nama = $request->nama;
        $pr->kategori = $request->kategori;
        $pr->harga = $request->harga;
        $pr->diskon = $request->diskon;
        $pr->status = 1;

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('produk', 'public');
            $pr->gambar = $path;
        }
        $pr->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $pr = Produk::find($id);
        $pr->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    function updatestatus($id)
    {
        $pr = Produk::find($id);
        if ($pr->status == 1) {
            $pr->status = 0;
            $pr->update();
        } else {
            $pr->status = 1;
            $pr->update();
        }

        return redirect()->back()->with('success', 'Status berhasil diupdate');
    }
}
