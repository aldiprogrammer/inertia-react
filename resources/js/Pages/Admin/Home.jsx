import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Home({ member, ordertoday, order, produk, dataorder }) {
    const [time, setTime] = useState(new Date());
    const { session } = usePage().props;

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <main class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div class="card bg-red-200 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">
                                Total Member {session.role}
                            </p>
                            <h2 class="text-3xl font-bold">{member}</h2>
                            <span class="text-success text-sm">
                                <Link href="/member">
                                    Lihat data{" "}
                                    <i className="fas fa-angle-right"></i>
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div class="card bg-blue-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">
                                Pesanan Hari Ini
                            </p>
                            <h2 class="text-3xl font-bold">{ordertoday}</h2>
                            <span class="text-success text-sm">
                                <Link href="/penjualanhariini">
                                    Lihat data{" "}
                                    <i className="fas fa-angle-right"></i>
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Total Pesanan</p>
                            <h2 class="text-3xl font-bold">{order}</h2>
                            <span class="text-success text-sm">
                                <Link href="/penjualan">
                                    Lihat data{" "}
                                    <i className="fas fa-angle-right"></i>
                                </Link>
                            </span>
                        </div>
                    </div>

                    <div class="card bg-orange-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Produk</p>
                            <h2 class="text-3xl font-bold">{produk}</h2>
                            <span class="text-success text-sm">
                                <Link href="/produk">
                                    Lihat data{" "}
                                    <i className="fas fa-angle-right"></i>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">
                                    <i className="fas fa-bag-shopping"></i>Order
                                    Hari Ini
                                </h2>

                                {/* <div class="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Cari user..."
                                        class="input input-bordered w-full md:w-64"
                                    />
                                    <button class="btn btn-success">
                                        Tambah
                                    </button>
                                </div> */}
                            </div>

                            <div class="overflow-x-auto">
                                {dataorder == false ? (
                                    <>
                                        <div className="text-center my-10 text-gray-500">
                                            Data order hari ini masih kosong
                                            lore
                                        </div>
                                    </>
                                ) : (
                                    <table class="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Kode</th>
                                                <th>Tanggal</th>
                                                <th>Meja</th>
                                                <th>Total</th>
                                                <th>Metode P</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataorder.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.kode}</td>
                                                    <td>{item.tanggal}</td>
                                                    <td>
                                                        {/* <span class="badge badge-success">
                                                        Admin
                                                    </span>
                                                     */}
                                                        {item.meja}
                                                    </td>
                                                    <td>
                                                        {Number(
                                                            item.total_harga,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span class="badge badge-success text-white">
                                                            {
                                                                item.metode_pembayaran
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl border-0">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title mb-2 text-white/80">
                                <i className="fa fa-clock"></i> Waktu Sekarang
                            </h2>

                            {/* JAM */}
                            <div className="text-4xl md:text-5xl font-bold tracking-widest drop-shadow-lg">
                                {time.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </div>

                            {/* TANGGAL */}
                            <div className="text-sm mt-2 text-white/80">
                                {time.toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Gunakan AdminLayout
Home.layout = (page) => <AdminLayout>{page}</AdminLayout>;
