import Keranjangapp from "@/Components/Keranjangapp";
import React, { useEffect, useRef, useState } from "react";

export default function Detailpesanan({ listorder, kodeorder, meja, tanggal }) {
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
                        <i className="fas fa-angle-right"></i>
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
                            <p className="text-sm text-gray-600">
                                Apakah Anda masih menggunakan beras ini? Atau
                                sudah beralih ke yang ini?
                            </p>

                            <p className="mt-2 text-sm">
                                Beras Sintanola hadir dengan kualitas pulen,
                                bersih, dan konsisten setiap kali dimasak.
                            </p>

                            <div className="mt-4">
                                <button className="btn btn-success btn-sm text-white">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🔥 BOTTOM NAV */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around">
                    <button className="btn btn-ghost btn-sm">🏠</button>
                    <button className="btn btn-ghost btn-sm">🛒</button>
                    <Keranjangapp kodeorder={kodeorder} meja={meja} />
                    <button className="btn btn-ghost btn-sm">💬</button>
                    <button className="btn btn-ghost btn-sm">👤</button>
                </div>
            </div>
        </div>
    );
}
