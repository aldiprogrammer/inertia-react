import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function Home({ member, ordertoday, order, produk, dataorder }) {
    return (
        <div>
            <main class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <div class="card bg-red-200 shadow-md border border-base-300">
                        <div class="card-body">
                            <p class="text-sm text-gray-500">Total Member</p>
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
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td>
                                                    <span class="badge badge-success text-white">
                                                        {item.metode_pembayaran}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Aktivitas Terbaru</h2>

                            <ul class="timeline timeline-vertical">
                                <li>
                                    <div class="timeline-start text-sm">
                                        08:00
                                    </div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-success badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">
                                        User baru mendaftar
                                    </div>
                                </li>

                                <li>
                                    <div class="timeline-start text-sm">
                                        09:30
                                    </div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-success badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">
                                        Pesanan berhasil diproses
                                    </div>
                                </li>

                                <li>
                                    <div class="timeline-start text-sm">
                                        11:15
                                    </div>
                                    <div class="timeline-middle">
                                        <div class="badge badge-warning badge-sm"></div>
                                    </div>
                                    <div class="timeline-end timeline-box">
                                        Stok produk hampir habis
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Gunakan AdminLayout
Home.layout = (page) => <AdminLayout>{page}</AdminLayout>;
