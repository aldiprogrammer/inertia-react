<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Meja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MejaController extends Controller
{
    function index()
    {
        $meja = Meja::all();
        return Inertia::render('Admin/Meja', ['meja' => $meja]);
    }

    function store(Request $request)
    {
        $mj = new Meja();
        $mj->kode = $request->kode;
        $mj->meja = $request->meja;
        $mj->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $mj = Meja::find($id);
        $mj->kode = $request->kode;
        $mj->meja = $request->meja;
        $mj->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $mj = Meja::find($id);
        $mj->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
