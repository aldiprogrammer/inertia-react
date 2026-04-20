import Keranjangapp from "@/Components/Keranjangapp";
import { Head, Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Pesanananda({ kodeorder, meja, orderuser }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);
    const [tanggal, setTanggal] = useState("");
    const [order, setOrder] = useState(orderuser);

    const handleTgl = async (val) => {
        setTanggal(val);
        try {
            const response = await axios.get("/pesanananda/" + val);
            console.log(response.data);
            setOrder(response.data);
        } catch (error) {}
    };

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
        <>
            <Head title="Pesanan" />
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
                            <h3 className="font-bold">Pesanan anda</h3>
                            <div onClick={() => window.history.back()}>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                type="date"
                                className="input input-bordered rounded-[220px] w-full text-gray-400"
                                onChange={(e) => handleTgl(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 🔥 SCROLL AREA */}
                    <div
                        ref={scrollRef}
                        className="p-4 space-y-4 h-[calc(100%-130px)] overflow-y-auto"
                    >
                        <div>
                            {order.map((item, index) => (
                                <Link
                                    href={"/detailpesanan/" + item.kode_order}
                                >
                                    <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-3 transition hover:shadow-md mt-3">
                                        <img
                                            src="img/sukses.svg"
                                            className="h-20 w-20 rounded-2xl object-cover"
                                        />

                                        <div className="flex-1">
                                            <h3 className="line-clamp-1 text-gray-400 font-semibold">
                                                <i className="fas fa-calendar-day"></i>{" "}
                                                {item.tanggal}
                                            </h3>
                                            <p className="mt-1 text-sm text-primary font-bold">
                                                <span className="badge badge-success text-white">
                                                    Selesai
                                                </span>{" "}
                                            </p>

                                            <div className="mt-3 flex items-center gap-2"></div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3">
                                            <h3 className="line-clamp-1 text-gray-400 font-semibold">
                                                Total
                                            </h3>
                                            <p className="text-right text-sm font-bold">
                                                Rp{" "}
                                                {Number(
                                                    item.total_harga,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-40">
                            {order == false ? (
                                <div className="mt-20">
                                    <div className="flex justify-center">
                                        <img
                                            width="64"
                                            height="64"
                                            src="https://img.icons8.com/arcade/64/shop-local.png"
                                            alt="shop-local"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center text-center text-gray-400">
                                        Mohon maaf, Untuk saat ini pesanan anda
                                        belum tersedia
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
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
        </>
    );
}
