<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\PotonganMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotonganMemberController extends Controller
{
    function index()
    {
        $potongan = PotonganMember::all();
        return Inertia::render('Admin/Potongan', compact('potongan'));
    }

    function store(Request $request)
    {
        $pt = new PotonganMember();
        $pt->tgl_mulai = $request->tgl_mulai;
        $pt->tgl_selesai = $request->tgl_selesai;
        $pt->min_order = $request->min_order;
        $pt->diskon = $request->diskon;
        $pt->status = 1;
        $pt->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }

    function update(Request $request, $id)
    {
        $pt = PotonganMember::find($id);
        $pt->tgl_mulai = $request->tgl_mulai;
        $pt->tgl_selesai = $request->tgl_selesai;
        $pt->min_order = $request->min_order;
        $pt->diskon = $request->diskon;
        $pt->update();
        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    function delete($id)
    {
        $pt = PotonganMember::find($id);
        $pt->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

    function status($id)
    {
        $pt = PotonganMember::find($id);
        if ($pt->status == 1) {
            $pt->status = 0;
        } else {
            $pt->status = 1;
        }
        $pt->update();

        return redirect()->back()->with('success', 'Status berhasil diubah');
    }
}
