import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Detailorder({ ls, kodeorder }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm({});
    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/detailorderuser/" + id);
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
            <Head title="Detail Order" />
            <AdminLayout>
                <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">
                                    Detail order #{kodeorder}
                                </h2>
                            </div>

                            <div>
                                <table
                                    className="table table-zebra"
                                    id="myTable"
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Kode</th>
                                            <th>Tanggal</th>
                                            <th>Produk</th>
                                            <th>Harga</th>
                                            <th>Qty</th>
                                            <th>Total Harga</th>
                                            <th>Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ls.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.kode_order}</td>
                                                <td>{item.tanggal}</td>
                                                <td>{item.produk}</td>
                                                <td>
                                                    {Number(
                                                        item.harga,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td>{item.qty}</td>
                                                <td>
                                                    {Number(
                                                        item.total_harga,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="btn btn-error btn-sm"
                                                            onClick={() =>
                                                                hapus(item.id)
                                                            }
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <h3 className="font-bold mt-5">
                                    {/* Total Harga :{" "}
                                    {total.toLocaleString("id-ID")} */}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
            <ToastContainer />
        </>
    );
}
