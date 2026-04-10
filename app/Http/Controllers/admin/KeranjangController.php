<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ListOrder;
use App\Models\Member;
use App\Models\Order;
use App\Models\PotonganMember;
use App\Models\Produk;
use Illuminate\Http\Request;

class KeranjangController extends Controller
{
    public function store(Request $request)
    {
        $item = Produk::find($request->idproduk);
        $cekorder = ListOrder::where('id_produk', $request->idproduk)->where('kode_order', $request->kodeorder)->where('tanggal', date('Y-m-d'))->first();
        if ($cekorder == true) {
            $qty = $cekorder->qty + 1;
            $cekorder->qty  = $qty;
            $cekorder->total_harga = $cekorder->harga * $qty;
            $cekorder->update();
        } else {
            $lo =  new ListOrder();
            $lo->tanggal = date('Y-m-d');
            $lo->kode_order = $request->kodeorder;
            $lo->produk = $item->nama;
            $lo->id_produk = $request->idproduk;
            $lo->harga = $item->harga;
            $lo->qty = 1;
            $lo->status = 0;
            $lo->total_harga = $item->harga;
            $lo->save();
        }

        return redirect()->back()->with('success', 'Menu ditambah kekeranjang');
    }

    function delete($id)
    {
        $list = ListOrder::find($id);
        $list->delete();
        return redirect()->back()->with('success', 'Order berhasil dihapus');
    }

    function tambahqty($id)
    {
        $list = ListOrder::find($id);
        $qty = $list->qty + 1;
        $list->qty = $qty;
        $list->total_harga = $list->harga * $qty;
        $list->update();
        return redirect()->back()->with('success', 'Qty berhasil diupdate');
    }

    function kurangqty($id)
    {
        $list = ListOrder::find($id);
        $qty = $list->qty - 1;
        $list->qty = $qty;
        $list->total_harga = $list->harga * $qty;
        $list->update();
        return redirect()->back()->with('success', 'Qty berhasil diupdate');
    }

    function cekmember($kode)
    {

        $member = Member::where('kode', $kode)->first();
        return response()->json(['data' => $member]);
    }

    function cekdiskonmember()
    {
        $tgl = date('Y-m-d');
        $diskon = PotonganMember::where('tgl_mulai', '<=', $tgl)->where('tgl_selesai', '>=', $tgl)->where('status', 1)->first();
        return response()->json($diskon);
    }

    function addorder(Request $request)
    {
        $add = new Order();
        $add->kode = $request->kode;
        $add->tanggal = date('Y-m-d');
        $add->id_kasir = 1;
        $add->meja = '001';
        $add->kode_member = $request->kode_member ?? 0;
        $add->total_harga = $request->total_harga;
        if ($request->metode_pembayaran != 'Cash') {
            if ($request->diskon != 0) {
                $total = $request->total_harga * $request->diskon / 100;
                $tt = $request->total_harga - $total;
                $add->uang = $tt;
                $add->kembalian = 0;
            } else {

                $add->uang = $request->total_harga;
                $add->kembalian = 0;
            }
        } else {
            $add->uang = $request->uang;
            $add->kembalian = $request->kembalian;
        }

        $add->diskon = $request->diskon;
        $add->metode_pembayaran = $request->metode_pembayaran;
        $add->status = 1;
        $add->save();
        return redirect()->back()->with('success', 'Data berhasil ditambah');
    }
}
