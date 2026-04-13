<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Inventaris;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarisController extends Controller
{
    function index()
    {
        $inventaris = Inventaris::all();
        return Inertia::render('Admin/Inventaris', compact('inventaris'));
    }

    function store(Request $request)
    {
        $inv = new Inventaris();
        $inv->nama_barang = $request->nama_barang;
        $inv->jenis = $request->jenis;
        $inv->kode = $request->kode;
        $inv->jumlah = $request->jumlah;
        $inv->lokasi = $request->lokasi;
        $inv->kondisi = $request->kondisi;
        $inv->tanggal = $request->tanggal;

        $inv->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $inv = Inventaris::find($id);
        $inv->nama_barang = $request->nama_barang;
        $inv->jenis = $request->jenis;
        $inv->jumlah = $request->jumlah;
        $inv->lokasi = $request->lokasi;
        $inv->kondisi = $request->kondisi;
        $inv->tanggal = $request->tanggal;
        $inv->kode = $request->kode;

        $inv->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $inv = Inventaris::find($id);
        $inv->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
