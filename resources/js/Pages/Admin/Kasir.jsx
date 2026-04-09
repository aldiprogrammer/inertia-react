import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect } from "react";

export default function Kasir({ produk, kategori }) {
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };
    useEffect(() => {
        console.log(produk);
    }, []);
    return (
        <AdminLayout>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="">
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        className="input input-bordered input-success w-full"
                                        placeholder="Cari produk disini"
                                    />
                                </div>

                                <div>
                                    <select className="input input-bordered input-success w-full">
                                        <option value="">
                                            -- Pilih Ketegori --
                                        </option>
                                        <option value="All">All</option>
                                        {kategori.map((item, index) => (
                                            <option value={item.kategori}>
                                                {item.kategori}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2"></div>
                            <div className="mt-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                                    {produk.map((product) => (
                                        <div
                                            key={product.id}
                                            className="card overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            <figure className="relative h-56 overflow-hidden">
                                                <img
                                                    src={`/storage/${product.gambar}`}
                                                    alt={product.nama}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                />

                                                <div className="absolute left-4 top-4 badge badge-success text-white badge-lg">
                                                    {product.kategori}
                                                </div>

                                                {/* {product.stock === 0 && (
                                                    <div className="absolute right-4 top-4 badge badge-error badge-lg">
                                                        Habis
                                                    </div>
                                                )} */}
                                            </figure>

                                            <div className="card-body p-5">
                                                <h2 className="card-title line-clamp-2 text-lg font-bold">
                                                    {product.nama}
                                                </h2>

                                                <div className="mt-1 flex items-center justify-between">
                                                    <span className="text-2xl font-extrabold text-success">
                                                        {formatRupiah(
                                                            product.harga,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-base-content/60">
                                                    Disk: {product.diskon}{" "}
                                                </div>

                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        className="btn btn-success text-white flex-1 rounded-2xl"
                                                        disabled={
                                                            product.status ==
                                                            "0"
                                                        }
                                                    >
                                                        {product.status ==
                                                        "1" ? (
                                                            <> + Keranjang</>
                                                        ) : (
                                                            "- Tidak tersedia"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 card bg-base-100 shadow-md border border-base-300">
                    <div className="card-body">Keranjanga Order</div>
                </div>
            </div>
        </AdminLayout>
    );
}
