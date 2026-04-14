import { Link, router, usePage } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Menu({ kategori, produk, menu, kodeorder }) {
    const { flash } = usePage().props;
    const [wishlist, setWishlist] = useState([]);
    const [scrolled, setScrolled] = useState(false);
    const scrollRef = useRef(null);


    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();

    };

    const closeModal = () => {
        modalRef.current.close();
    }


    const toggleLove = (id) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const addkeranjang = (id) => {
        router.post('/addkeranjanguser', {
            idproduk: id,
            kodeorder: kodeorder,
        },)
    }

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
        el.addEventListener("scroll", handleScroll);

        return () => el.removeEventListener("scroll", handleScroll);

    }, [flash]);

    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
            {/* DEVICE */}
            <div className="w-full h-screen bg-white overflow-hidden relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">

                {/* 🔥 HEADER STICKY */}
                <div
                    className={`sticky top-0 z-50 p-4 transition-all duration-300 ${scrolled
                        ? "bg-white shadow-md border-b"
                        : "bg-white/80 backdrop-blur"
                        }`}
                >
                    <div className="flex justify-between">
                        <h3 className="font-bold">{menu}</h3>
                        <i className="fas fa-angle-right"></i>
                    </div>

                </div>

                {/* 🔥 SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="p-4 space-y-4 h-[calc(100%-130px)] overflow-y-auto"
                >
                    {/* MENU */}
                    <div className="grid grid-cols-4 gap-3">

                        <Link
                            href={"/menu/All"}
                        >
                            {menu == 'All Menu' ? <><div className=" bg-green-400 text-white rounded-xl p-3 flex flex-col items-center text-xs shadow text-success font-medium">
                                All
                            </div></> : <><div className=" bg-gray-100 rounded-xl p-3 flex flex-col items-center text-xs shadow text-success font-medium">
                                All
                            </div></>}
                        </Link>
                        {kategori.map((item, index) => (
                            <Link
                                href={"/menu/" + item.kategori}
                                key={index}
                            >
                                {menu == item.kategori ? <><div className=" bg-green-400 text-white rounded-xl p-3 flex flex-col items-center text-xs shadow text-success font-medium">
                                    {item.kategori}
                                </div></> : <><div className=" bg-gray-100 rounded-xl p-3 flex flex-col items-center text-xs shadow text-success font-medium">
                                    {item.kategori}
                                </div></>}

                            </Link>
                        ))}
                    </div>

                    {/* FOOD */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <h2 className="font-semibold">Food For You</h2>
                            <span className="text-sm text-gray-400">
                                See All
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                                        <button
                                            onClick={() =>
                                                toggleLove(product.id)
                                            }
                                            className="absolute right-2 top-2 bg-white/80 backdrop-blur rounded-full p-1 shadow"
                                        >
                                            <span
                                                className={`text-lg transition duration-200 ${wishlist.includes(product.id)
                                                    ? "text-red-500 scale-125"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                ❤️
                                            </span>
                                        </button>
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
                                                    "id-ID"
                                                )}
                                            </span>

                                            <button className="bg-green-300 text-white p-2 rounded-full shadow" onClick={() => addkeranjang(product.id)}>
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

                        {produk == false ?
                            <div className="mt-20">
                                <div className="flex justify-center">
                                    <img width="64" height="64" src="https://img.icons8.com/arcade/64/shop-local.png" alt="shop-local" />
                                </div>
                                <div className="flex justify-center items-center text-center text-gray-400">
                                    Mohon maaf, Untuk saat ini menu yang anda cari belum tersedia
                                </div>
                            </div>

                            : <></>}
                    </div>
                </div>

                {/* 🔥 BOTTOM NAV */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around">
                    <button className="btn btn-ghost btn-sm">🏠</button>
                    <button className="btn btn-ghost btn-sm">🛒</button>
                    <button className="btn bg-green-400 text-white rounded-full px-6" onClick={openModal}>
                        <i className="fas fa-bag-shopping"></i>Order
                    </button>
                    <button className="btn btn-ghost btn-sm">💬</button>
                    <button className="btn btn-ghost btn-sm">👤</button>
                </div>
            </div>

            <dialog ref={modalRef} className="modal modal-bottom ">
                <div className="modal-box">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="text-lg font-bold">
                        Tambah data
                    </h3>

                    <form >
                        <div className="mt-4 flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Tambah data
                            </button>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="btn btn-error"
                            >
                                Keluar
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
            <ToastContainer />
        </div>
    );
}