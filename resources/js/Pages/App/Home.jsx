import Keranjangapp from "@/Components/Keranjangapp";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Home({ kategori, produk, kodeorder, meja }) {
    const { flash } = usePage().props;
    const { auth } = usePage().props;
    const [wishlist, setWishlist] = useState([]);
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);

    const toggleLove = (id) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const addkeranjang = (id) => {
        router.post("/addkeranjanguser", {
            idproduk: id,
            kodeorder: kodeorder,
        });
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
        const handleScroll = () => {
            if (scrollRef.current.scrollTop > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (el) el.removeEventListener("scroll", handleScroll);
        };
    }, [flash]);

    return (
        <>
            <Head title="App" />
            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
                <div className="w-full h-screen bg-white overflow-hidden relative md:max-w-[375px]  md:mx-auto md:shadow-2xl md:border md:rounded-sm">
                    {/* HEADER */}
                    <div
                        className={`sticky top-0 z-50 p-4 transition ${scrolled ? "bg-white shadow-md border-b" : "bg-white/80 backdrop-blur"}`}
                    >
                        <div className="flex justify-between gap-3">
                            <div className="flex">
                                <img
                                    src="img/logo.png"
                                    className="w-10 h-10 rounded-full"
                                />

                                <h3 className="text-lg mt-3 font-bold text-green-800">
                                    Green Left
                                </h3>
                            </div>
                            <Link href="/profil">
                                <img
                                    src={auth.user?.avatar}
                                    className="w-10 h-10 rounded-full"
                                />
                            </Link>
                            {/* <div className="text-[25px] text-green-800 mt-3">
                            <i className="fas fa-search"></i>
                        </div> */}
                            {/* <img
                            src="https://i.pravatar.cc/40"
                            className="w-10 h-10 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-full rounded-full"
                        /> */}
                        </div>
                    </div>

                    {/* SCROLL */}
                    <div
                        ref={scrollRef}
                        className="p-4 space-y-4 h-[calc(100%-70px)] overflow-y-auto"
                    >
                        {/* BANNER */}
                        <div className="bg-green-200 rounded-xl p-3">
                            <div className="font-bold">
                                Hello {auth.user?.name}
                            </div>
                            <div>Selamat datang di aplikasi kita</div>
                        </div>

                        <img src="img/bannerapp.png" className="rounded-lg" />

                        {/* MENU */}
                        <div className="grid grid-cols-4 gap-3">
                            {kategori.map((item, index) => (
                                <Link
                                    href={`/menu/${item.kategori}`}
                                    key={index}
                                >
                                    <div className="bg-gray-100 rounded-xl p-3 text-center text-xs shadow text-success font-medium">
                                        {item.kategori}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* PAYMENT */}
                        {/* <div className="bg-gray-100 rounded-xl p-3 flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Payment</p>
                            <p className="font-semibold text-sm">Add a Card</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <span>Ovo 0</span>
                            <span>Gift</span>
                        </div>
                    </div> */}

                        {/* FOOD */}
                        <div className="">
                            <div className="flex justify-between mb-2">
                                <h2 className="font-semibold">Food For You</h2>
                                <Link href="/menu/All">
                                    <span className="text-sm text-gray-400">
                                        See All
                                    </span>
                                </Link>
                            </div>

                            <div className="mb-20">
                                <div className="grid grid-cols-2 gap-4 ">
                                    {produk.map((product) => (
                                        <div
                                            key={product.id}
                                            className="card overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm"
                                        >
                                            {/* IMAGE */}
                                            <figure className="relative h-36 overflow-hidden">
                                                <img
                                                    src={`/storage/${product.gambar}`}
                                                    alt={product.nama}
                                                    className="h-full w-full object-cover"
                                                />

                                                {/* Badge */}
                                                <div className="absolute left-2 top-2 badge badge-success badge-sm text-white">
                                                    {product.kategori}
                                                </div>

                                                {/* ❤️ LOVE */}
                                                {/* <button
                                                onClick={() =>
                                                    toggleLove(product.id)
                                                }
                                                className="absolute right-2 top-2 bg-white/80 backdrop-blur rounded-full p-1 shadow"
                                            >
                                                <span
                                                    className={`text-lg transition duration-200 ${wishlist.includes(
                                                        product.id,
                                                    )
                                                        ? "text-red-500 scale-125"
                                                        : "text-gray-400"
                                                        }`}
                                                >
                                                    ❤️
                                                </span>
                                            </button> */}
                                            </figure>

                                            {/* BODY */}
                                            <div className="p-2 space-y-1">
                                                <h3 className="text-xs font-semibold line-clamp-2">
                                                    {product.nama}
                                                </h3>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold text-success">
                                                        Rp{" "}
                                                        {product.harga.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </span>

                                                    <button
                                                        className="bg-green-300 text-white p-2 rounded-full shadow"
                                                        onClick={() =>
                                                            addkeranjang(
                                                                product.id,
                                                            )
                                                        }
                                                    >
                                                        🛒
                                                    </button>
                                                </div>

                                                <div className="text-[10px] text-gray-400">
                                                    Diskon {product.diskon}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/menu/All">
                                    <div className="text-center text-gray-400 my-5">
                                        Lihat semuanya{" "}
                                        <i className="fa fa-angle-right"></i>
                                    </div>
                                </Link>
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

                <ToastContainer />
            </div>
        </>
    );
}
