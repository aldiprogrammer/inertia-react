import React, { useEffect, useRef, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import axios from "axios";

export default function AdminLayout({ children }) {
    const { session } = usePage().props;
    const url = usePage().url;
    const [orderuser, setOrderuser] = useState([]);

    const modalRef = useRef(null);

    useEffect(() => {
        if (typeof window.jQuery === "undefined") return;

        const timer = setTimeout(() => {
            const el = document.getElementById("myTable");
            if (!el) return;

            const $ = window.jQuery;
            if ($.fn.DataTable.isDataTable(el)) {
                $(el).DataTable().destroy();
            }

            const title =
                document
                    .querySelector(".card-title")
                    ?.textContent?.trim() || "laporan";
            const filename = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            $(el).DataTable({
                dom: '<"flex flex-wrap gap-2 items-center mb-2"Bf>rt<"flex flex-wrap justify-between items-center mt-2"lip>',
                buttons: [
                    {
                        extend: "copy",
                        text: '<i class="fas fa-copy"></i> Copy',
                    },
                    {
                        extend: "csv",
                        text: '<i class="fas fa-file-csv"></i> CSV',
                    },
                    {
                        extend: "excel",
                        text: '<i class="fas fa-file-excel"></i> Excel',
                    },
                    {
                        extend: "pdf",
                        text: '<i class="fas fa-file-pdf"></i> PDF',
                        filename: filename,
                    },
                    {
                        extend: "print",
                        text: '<i class="fas fa-print"></i> Print',
                    },
                ],
                pageLength: 25,
                lengthMenu: [
                    [10, 25, 50, -1],
                    [10, 25, 50, "Semua"],
                ],
                language: {
                    url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/id.json",
                },
                exportOptions: {
                    modifier: { page: "all" },
                },
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [url]);

    const openModal = () => {
        modalRef.current.showModal();
        Listorderuser();
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const Listorderuser = async () => {
        try {
            const response = await axios.get("/orderuser");
            setOrderuser(response.data);
            return response.data;
        } catch (error) {
            return [];
        }
    };

    const prevOrderIds = useRef(new Set());

    useEffect(() => {
        Listorderuser().then((orders) => {
            if (orders) {
                prevOrderIds.current = new Set(
                    orders.map((o) => o.id),
                );
            }
        });

        const poll = setInterval(async () => {
            const orders = await Listorderuser();
            if (!orders || orders.length === 0) return;

            const currentIds = new Set(orders.map((o) => o.id));
            const newOrders = orders.filter(
                (o) => !prevOrderIds.current.has(o.id),
            );

            if (newOrders.length > 0) {
                if (typeof window.AudioContext !== "undefined" || typeof window.webkitAudioContext !== "undefined") {
                    try {
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        [523, 659].forEach((freq, i) => {
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.frequency.value = freq;
                            osc.type = "sine";
                            const t = ctx.currentTime + i * 0.15;
                            gain.gain.setValueAtTime(0.3, t);
                            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                            osc.start(t);
                            osc.stop(t + 0.4);
                        });
                        setTimeout(() => {
                            if (typeof window.SpeechSynthesis !== "undefined") {
                                const ucapan = new SpeechSynthesisUtterance("Ada pesanan");
                                ucapan.lang = "id-ID";
                                ucapan.rate = 1;
                                window.speechSynthesis.cancel();
                                window.speechSynthesis.speak(ucapan);
                            }
                        }, 500);
                    } catch (e) {}
                }
                if (typeof window.Swal !== "undefined") {
                    newOrders.forEach((order) => {
                        window.Swal.fire({
                            icon: "info",
                            title: "Pesanan Baru!",
                            html: `
                                <b>Kode:</b> ${order.kode_order}<br>
                                <b>Meja:</b> ${order.meja}<br>
                                <b>Total:</b> Rp ${Number(order.total_harga).toLocaleString("id-ID")}
                            `,
                            timer: 8000,
                            showConfirmButton: true,
                            confirmButtonText: "Proses ke Kasir",
                            showCancelButton: true,
                            cancelButtonText: "Tutup",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/kasir/" + order.kode_order;
                            }
                        });
                    });
                }
            }

            prevOrderIds.current = currentIds;
        }, 5000);

        return () => clearInterval(poll);
    }, []);

    return (
        <>
            <Head title="Admin" />
            <div className="drawer lg:drawer-open">
                <input id="sidebar" type="checkbox" className="drawer-toggle" />

                {/* Content */}
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-100 border-b border-base-300 px-4 shadow-sm">
                        <div className="flex-none lg:hidden">
                            <label
                                htmlFor="sidebar"
                                className="btn btn-square btn-ghost"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="inline-block h-5 w-5 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-primaryGreen">
                                {/* Green Left */}
                            </h1>
                        </div>

                        <div className="flex gap-3 items-center">
                            {/* Notifikasi */}
                            <button
                                className="btn btn-ghost btn-circle"
                                onClick={openModal}
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    {orderuser.length > 0 && (
                                        <span className="badge badge-sm badge-error indicator-item">
                                            {orderuser.length}
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Dropdown user */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex="0"
                                    role="button"
                                    className="btn btn-ghost flex items-center gap-2"
                                >
                                    <div className="avatar placeholder">
                                        <div className="bg-primaryGreen text-white rounded-full w-10">
                                            <i className="fas fa-user"></i>
                                        </div>
                                    </div>
                                    <span className="hidden md:block font-medium">
                                        {session.username}
                                    </span>
                                </div>

                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                >
                                    {/* <li>
                                    <a>Profile</a>
                                </li>
                                <li>
                                    <a>Pengaturan</a>
                                </li> */}
                                    <li>
                                        <Link
                                            href="/admin/logout"
                                            className="text-error"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="p-6">{children}</main>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="sidebar" className="drawer-overlay"></label>

                    <aside className="w-72 min-h-full bg-base-100 border-r border-base-300">
                        <div classaNme="p-6 border-b border-base-300 mt-3">
                            <br />
                            <h2 className="text-2xl font-bold text-primaryGreen ml-5">
                                APP Admin
                            </h2>
                            {/* <p className="text-sm text-gray-500 mt-1">DaisyUI v5 Panel</p> */}
                        </div>

                        <ul className="menu p-4 text-base-content w-full gap-1">
                            <li>
                                <Link href="/dashboard" className="rounded-xl">
                                    <i className="fas fa-dashboard"></i>{" "}
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/kasir" className="rounded-xl">
                                    <i className="fas fa-cash-register"></i>
                                    Kasir
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dataorderuser"
                                    className="rounded-xl"
                                >
                                    <i className="fas fa-bag-shopping"></i>Order
                                    User
                                </Link>
                            </li>
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        <i className="fas fa-calendar-days"></i>{" "}
                                        Penjualan
                                    </summary>
                                    <ul>
                                        <li>
                                            <Link href="/penjualanhariini">
                                                Penjualan Hari Ini
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/penjualan">
                                                Data Penjualan
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <Link href="/produk" className="rounded-xl">
                                    <i className="fas fa-bowl-food"></i> Produk
                                </Link>
                            </li>
                            <li>
                                <Link href="/kategori" className="rounded-xl">
                                    <i className="fas fa-book"></i> Kategori
                                </Link>
                            </li>
                            <li>
                                <Link href="/meja" className="rounded-xl">
                                    <i className="fas fa-spoon"></i> Meja
                                </Link>
                            </li>
                            <li>
                                <Link href="/pegawai" className="rounded-xl">
                                    <i className="fas fa-user"></i> Pegawai
                                </Link>
                            </li>
                            <li>
                                <Link href="/inventaris" className="rounded-xl">
                                    <i className="fas fa-box-open"></i>{" "}
                                    Inventaris
                                </Link>
                            </li>

                            <li>
                                <Link href="/user" className="rounded-xl">
                                    <i className="fas fa-users"></i> User
                                </Link>
                            </li>
                            <li>
                                <details>
                                    <summary className="rounded-xl">
                                        {" "}
                                        <i className="fas fa-user-circle"></i>
                                        Member
                                    </summary>
                                    <ul>
                                        <li>
                                            <Link href="/member">
                                                Data Member
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/potongan">
                                                Potongan Member
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <Link href="/pengguna" className="rounded-xl">
                                    <i className="fas fa-user"></i> Admin
                                </Link>
                            </li>
                            {/* <li>
                            <Link href="/admin/settings" className="rounded-xl">
                                <i className="fas fa-gear"></i> Pengaturan
                            </Link>
                        </li> */}
                        </ul>
                    </aside>
                </div>

                <dialog ref={modalRef} className="modal ">
                    <div className="modal-box">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-bold">Order User</h3>

                        <div>
                            {orderuser.map((item, index) => (
                                <Link href={"/kasir/" + item.kode_order}>
                                    <div>
                                        <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-3 transition hover:shadow-md mt-3">
                                            <img
                                                src="/img/logo.png"
                                                className="h-20 w-20 rounded-2xl object-cover"
                                            />

                                            <div className="flex-1">
                                                <h3 className="line-clamp-1 text-gray-400 font-semibold">
                                                    <i className="fas fa-calendar-day"></i>{" "}
                                                    {item.tanggal}
                                                </h3>
                                                <p className="mt-1 text-sm text-primary font-bold">
                                                    <span className="badge badge-success text-white">
                                                        {item.kode_order}
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
                                                <div>
                                                    <span className="badge badge-error text-white">
                                                        {item.jenis_pesanan}
                                                    </span>{" "}
                                                    <span className="badge badge-error text-white">
                                                        {item.meja}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Catatan : {item.catatan}
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {orderuser == false ? (
                                <>
                                    <div className="py-10">
                                        <p className="text-center text-gray-400">
                                            <span className="text-lg text-gray-400 font-bold">
                                                Ops
                                            </span>
                                            <br />
                                            Order user untuk saat ini belum
                                            tersedia
                                        </p>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mt-4 flex gap-2"></div>
                    </div>
                </dialog>
            </div>
        </>
    );
}
