import Keranjangapp from "@/Components/Keranjangapp";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profil({ profil, kodeorder, meja, total }) {
    const { flash, auth, errors } = usePage().props;

    const [scrolled, setScrolled] = useState(false);

    const { data, setData, reset, post, processing } = useForm({
        tgl_lahir: profil?.tgl_lahir ?? "",
        nama: profil?.nama ?? "",
        wa: profil?.nohp ?? "",
        alamat: profil?.alamat ?? "",
        id_user: auth.user?.id,
        kodemember: profil?.kode ?? "",
    });

    const handleScroll = (e) => {
        setScrolled(e.target.scrollTop > 20);
    };

    const save = (e) => {
        e.preventDefault();
        post("/profil", {
            onSuccess: () => {
                // reset();
            },
        });
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-center",
                autoClose: 1000,
                theme: "light",
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Profil" />

            <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
                {/* DEVICE */}
                <div className="w-full h-screen bg-white flex flex-col md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm overflow-hidden">
                    {/* NAVBAR MODE (MUNCUL SAAT SCROLL) */}
                    {scrolled && (
                        <div
                            className={`sticky top-0 z-50 p-4 transition-all duration-300 ${
                                scrolled
                                    ? "bg-white shadow-md border-b"
                                    : "bg-white/80 backdrop-blur"
                            }`}
                        >
                            <div className="flex justify-between">
                                <h3 className="font-bold">Profil</h3>
                                <div onClick={() => window.history.back()}>
                                    <i className="fas fa-angle-right"></i>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* HEADER MODE (SEBELUM SCROLL) */}
                    {!scrolled && (
                        <div className="relative">
                            <div className="h-40 bg-green-400 rounded-b-[40px] relative overflow-visible">
                                {/* pattern */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.svgrepo.com/show/353403/food.svg')] bg-repeat"></div>

                                <div
                                    className="absolute inset-0 opacity-10 bg-repeat rounded-b-[40px]"
                                    style={{
                                        backgroundImage:
                                            "url('https://media.istockphoto.com/vectors/food-seamless-background-vector-id515373062?k=20&m=515373062&s=612x612&w=0&h=OKgPNjR_b4cjyaPBTxA8UsfkBGC_W9OuBv_2m-GbkHw=')",
                                    }}
                                ></div>

                                {/* TOP BAR */}
                                <div className="absolute top-0 left-0 w-full p-4 flex justify-between text-white">
                                    <h3 className="font-semibold">Profil</h3>
                                    <button
                                        onClick={() => window.history.back()}
                                    >
                                        <i className="fas fa-angle-right"></i>
                                    </button>
                                </div>

                                {/* AVATAR */}
                                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                                        <img
                                            src={auth.user?.avatar}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SCROLL AREA */}
                    <div
                        onScroll={handleScroll}
                        className={`flex-1 space-y-4 overflow-y-auto pb-24 ${
                            scrolled ? "pt-16" : "pt-0"
                        }`}
                    >
                        {/* USER INFO */}
                        <div className="mt-16 text-center">
                            <h2 className="font-bold text-lg">
                                {auth.user?.name}
                            </h2>
                            {/* <p className="text-gray-400 text-sm">MM-35446464</p> */}
                        </div>

                        {/* CARD */}
                        <div className="mx-4 mt-4 bg-white rounded-xl shadow p-4 flex justify-between text-center">
                            <div>
                                <p className="text-gray-400 text-xs">
                                    Kode Member
                                </p>
                                {data.kodemember == "" ? (
                                    <>
                                        <p className="font-bold">
                                            Belum tersedia
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-bold">
                                            {data.kodemember}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs">
                                    Total Transaksi
                                </p>
                                <p className="font-bold">
                                    Rp. {total.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        {/* INFO */}
                        {data.kodemember == "" ? (
                            <div className="mx-4 mt-4 bg-red-200 rounded-xl shadow p-4 text-gray-700">
                                Isi data diri anda untuk mendaftar sebagai
                                member
                            </div>
                        ) : (
                            ""
                        )}

                        {/* FORM */}
                        <div className="px-4">
                            <form onSubmit={save}>
                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">Nama</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.nama}
                                        className="input input-bordered input-success w-full"
                                        required
                                        onChange={(e) =>
                                            setData("nama", e.target.value)
                                        }
                                    />
                                </label>
                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Nomor Whatsapp
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        value={data.wa}
                                        className="input input-bordered input-success w-full"
                                        required
                                        onChange={(e) =>
                                            setData("wa", e.target.value)
                                        }
                                    />
                                    {errors.wa && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.wa}
                                        </p>
                                    )}
                                </label>

                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Tanggal Lahir
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        value={data.tgl_lahir}
                                        className="input input-bordered input-success w-full"
                                        required
                                        onChange={(e) =>
                                            setData("tgl_lahir", e.target.value)
                                        }
                                    />
                                </label>

                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Alamat
                                        </span>
                                    </div>

                                    <textarea
                                        className="textarea textarea-success w-full h-24"
                                        value={data.alamat}
                                        required
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />
                                </label>

                                <button
                                    className="btn bg-green-300 w-full rounded-[20px] mt-4"
                                    disabled={processing}
                                >
                                    {data.kodemember == "" ? (
                                        <> Daftar Member</>
                                    ) : (
                                        <>Update data</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* BOTTOM NAV */}
                    <div className="w-full bg-white border-t p-2 flex justify-around">
                        <Link href="/app">
                            <button className="btn btn-ghost btn-sm text-[25px] text-green-500">
                                <i className="fas fa-home"></i>
                            </button>
                        </Link>

                        <Link href="/menu/All">
                            <button className="btn btn-ghost btn-sm text-[25px] text-green-500">
                                <i className="fas fa-bowl-rice"></i>
                            </button>
                        </Link>

                        <Keranjangapp kodeorder={kodeorder} meja={meja} />

                        <Link href="/pesanananda">
                            <button className="btn btn-ghost btn-sm text-[25px] text-green-500">
                                <i className="fa-solid fa-cart-shopping"></i>
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
