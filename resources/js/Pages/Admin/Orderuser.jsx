import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Orderuser({ order }) {
    const { data, setData, post, delete: destroy, reset } = useForm({});
    const { flash } = usePage().props;
    const hapus = (kode) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/dataorderuser/" + kode);
        }
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Order User" />
            <AdminLayout>
                <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">Data Order User</h2>
                            </div>

                            <div>
                                <table
                                    className="table table-zebra"
                                    id="myTable"
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal</th>
                                            <th>User</th>
                                            <th>Kode Order</th>
                                            <th>Jenis Pesanan</th>
                                            <th>Meja</th>
                                            <th>Total Harga</th>
                                            <th>Catatan</th>
                                            <th>Status</th>
                                            <th>Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.tanggal}</td>
                                                <td>{item.id_user}</td>
                                                <td>{item.kode_order}</td>
                                                <td>{item.jenis_pesanan}</td>
                                                <td>{item.meja}</td>
                                                <td>
                                                    {Number(
                                                        item.total_harga,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td>{item.catatan}</td>
                                                <td>
                                                    {item.status == 1 ? (
                                                        <span className="badge badge-success text-white">
                                                            Selesai
                                                        </span>
                                                    ) : (
                                                        <span className="badge badge-warning">
                                                            Menunggu
                                                        </span>
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="btn btn-error btn-sm"
                                                            onClick={() =>
                                                                hapus(
                                                                    item.kode_order,
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </button>
                                                        <Link
                                                            href={
                                                                "/detailorderuser/" +
                                                                item.kode_order
                                                            }
                                                            className="btn btn-success  btn-sm"
                                                        >
                                                            Detail
                                                        </Link>
                                                        <Link
                                                            className="btn btn-primary btn-sm"
                                                            href={
                                                                "/kasir/" +
                                                                item.kode_order
                                                            }
                                                        >
                                                            Cetak struk
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
            <ToastContainer />
        </>
    );
}
