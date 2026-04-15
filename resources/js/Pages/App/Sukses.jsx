import Keranjangapp from "@/Components/Keranjangapp";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Sukses({ kodeorder }) {
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
                        <h3 className="font-bold">Order Sukses</h3>
                        <i className="fas fa-angle-right"></i>
                    </div>
                </div>

                {/* 🔥 SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="p-4 space-y-4 h-[calc(100%-130px)] overflow-y-auto"
                ></div>

                {/* 🔥 BOTTOM NAV */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around">
                    <button className="btn btn-ghost btn-sm">🏠</button>
                    <button className="btn btn-ghost btn-sm">🛒</button>
                    <Keranjangapp kodeorder={kodeorder} meja="0" />
                    <button className="btn btn-ghost btn-sm">💬</button>
                    <button className="btn btn-ghost btn-sm">👤</button>
                </div>
            </div>
        </div>
    );
}
