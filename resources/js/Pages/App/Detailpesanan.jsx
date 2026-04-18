import Keranjangapp from "@/Components/Keranjangapp";
import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

export default function Detailpesanan({
    listorder,
    kodeorder,
    meja,
    tanggal,
    order,
}) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current.scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const el = scrollRef.current;
        el.addEventListener("scroll", handleScroll);

        return () => el.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
            {/* DEVICE */}
            <div className="w-full h-screen bg-white overflow-hidden relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">
                {/* 🔥 HEADER STICKY */}
                <div
                    className={`sticky top-0 z-50 p-4 transition-all duration-300 ${
                        scrolled
                            ? "bg-white shadow-md border-b"
                            : "bg-white/80 backdrop-blur"
                    }`}
                >
                    <div className="flex justify-between">
                        <h3 className="font-bold">Detail pesanan</h3>
                        <div onClick={() => window.history.back()}>
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                </div>

                {/* 🔥 SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="p-4 space-y-4 h-[calc(100%-130px)] overflow-y-auto"
                >
                    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-green-400 text-white px-4 py-3 flex justify-between">
                            <div className="text-sm font-semibold">
                                <i className="fas fa-calendar-day"></i>{" "}
                                {tanggal}
                            </div>

                            <div className="text-sm font-semibold">
                                {kodeorder}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="card-body">
                            {listorder.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4  p-1 transition hover:shadow-md"
                                >
                                    <img
                                        src={`/storage/${item.listproduk.gambar}`}
                                        alt={item.produk}
                                        className="h-12 w-12 rounded-2xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <h3 className="line-clamp-1 text-base font-semibold">
                                            {item.produk}
                                        </h3>
                                        <p className="mt-1 text-sm text-primary font-bold">
                                            Rp{" "}
                                            {Number(item.harga).toLocaleString(
                                                "id-ID",
                                            )}{" "}
                                            x {item.qty}
                                        </p>

                                        <div className="mt-3 flex  gap-2"></div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <p className="text-right text-sm font-bold">
                                            Rp{" "}
                                            {Number(
                                                item.total_harga,
                                            ).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-between mt-3 text-sm text-gray-400">
                                <div>Jenis Pesanan :</div>
                                <div>{order.jenis_pesanan}</div>
                            </div>

                            <div className="flex justify-between text-sm text-gray-400">
                                <div>Nomor Meja :</div>
                                <div>{order.meja}</div>
                            </div>

                            <div className="flex justify-between text-sm text-gray-400">
                                <div>Status Pesanan :</div>
                                <div>
                                    <span className="badge bg-green-400 text-white">
                                        Selesai
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between text-lg font-bold text-gray-500">
                                <div>Total Harga :</div>
                                <div>
                                    Rp{" "}
                                    {Number(order.total_harga).toLocaleString(
                                        "id-ID",
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🔥 BOTTOM NAV */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around">
                    <Link href="/app">
                        <button className="btn btn-ghost btn-sm text-[25px]  text-green-500">
                            <i className="fas fa-home"></i>
                        </button>
                    </Link>
                    <Link href="/menu/All">
                        <button className="btn btn-ghost btn-sm text-[25px]  text-green-500">
                            <i className="fas fa-bowl-rice"></i>
                        </button>
                    </Link>
                    <Keranjangapp kodeorder={kodeorder} meja={meja} />
                    <Link href="/pesanananda">
                        <button className="btn btn-ghost btn-sm text-[25px]  text-green-500">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                    </Link>
                    <Link href="/profil">
                        <button className="btn btn-ghost btn-sm text-[25px] text-green-500">
                            <i className="fas fa-user"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
