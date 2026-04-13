import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Penjualanhariini({ penjualan }) {
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        error,
    } = useForm({});

    const hapus = (kode) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapusorder/" + kode);
        }
    };
    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Penjualan Hari Ini</h2>
                        </div>

                        <div>
                            <table className="table table-zebra" id="myTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode</th>
                                        <th>Tanggal</th>
                                        <th>Meja</th>
                                        <th>Member</th>
                                        <th>Total</th>
                                        <th>Disc</th>
                                        <th>Metoda P</th>
                                        <th>Uang</th>
                                        <th>Kembalian</th>
                                        <th>Jenis P</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {penjualan.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.tanggal}</td>
                                            <td>{item.meja}</td>
                                            <td>{item.kode_memebr}</td>
                                            <td>
                                                {Number(
                                                    item.total_harga,
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td>{item.diskon}</td>
                                            <td>{item.metode_pembayaran}</td>
                                            <td>
                                                {Number(
                                                    item.uang,
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td>
                                                {Number(
                                                    item.kembalian,
                                                ).toLocaleString("id-ID")}
                                            </td>
                                            <td>{item.jenis_pesanan}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-error btn-sm"
                                                        onClick={() =>
                                                            hapus(item.kode)
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                    <Link
                                                        href={
                                                            "/detailpenjualan/" +
                                                            item.kode
                                                        }
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        Detail
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
