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
        $inv = Inventaris::all();
        return Inertia::render('Admin/Inventaris', ['inventaris' => $inv]);
    }

    function store(Request $request)
    {
        $inv = new Inventaris();
        $inv->nama_barang = $request->nama_barang;
        $inv->jenis = $request->jenis;
        $inv->jumlah = $request->jumlah;
        $inv->lokasi = $request->lokasi;
        $inv->kondisi = $request->kondisi;
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
        $inv->update();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function delete($id)
    {
        $inv = Inventaris::find($id);
        $inv->delete();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }
}
