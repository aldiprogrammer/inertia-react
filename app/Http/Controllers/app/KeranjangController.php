<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\ListOrder;
use App\Models\Order;
use App\Models\Orderuser;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class KeranjangController extends Controller

{

    function index($kodeorder)
    {
        $listorder = ListOrder::with('listproduk')->where('kode_order', $kodeorder)->get();
        $total = ListOrder::where('kode_order', $kodeorder)->sum('total_harga');
        return response()->json(['listorder' => $listorder, 'total' => $total]);
    }
    function store(Request $request)
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

    function addorder(Request $request)
    {
        $data = new Orderuser();
        $data->tanggal = date('Y-m-d');
        $data->kode_order = $request->kode_order;
        $data->id_user = $request->id_user;
        $data->jenis_pesanan = $request->jenis_pesanan;
        $data->meja = $request->meja ?? 0;
        $data->catatan = $request->catatan ?? 0;
        $data->status = 0;
        $data->total_harga = $request->total_harga;
        $data->save();
        $request->session()->forget('kode_order');

        $response = Http::withHeaders([
            'Authorization' => 'Basic os_v2_app_k45mxugvonasbj23z5xzyfpirsnylueoqake445s3gyfljw27qfw7mtjsz4rdp2gexluwqffkzfpdtres2op77mz4mvtscvdyt3ixjy',
            'Content-Type' => 'application/json',
        ])->post('https://onesignal.com/api/v1/notifications', [
            'app_id' => '573acbd0-d573-4120-a75b-cf6f9c15e88c',
            'included_segments' => ['All'],
            'contents' => [
                'en' => 'Hello kasir, ada pesanan baru untuk anda',
                'id' => 'Hello kasir, ada pesanan baru untuk anda'
            ],
            'headings' => [
                'en' => 'Pesanan Baru',
                'id' => 'Pesanan Baru'
            ],
        ]);

        // dd($response->json());

        return redirect()->route('sukses')->with('success', 'Order behasil dikirim');
    }
}
