import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    return (
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
                            Dashboard
                        </h1>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* Notifikasi */}
                        <button className="btn btn-ghost btn-circle">
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
                                <span className="badge badge-sm badge-success indicator-item">
                                    3
                                </span>
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
                                        <span>A</span>
                                    </div>
                                </div>
                                <span className="hidden md:block font-medium">
                                    Admin
                                </span>
                            </div>

                            <ul
                                tabIndex="0"
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a>Profile</a>
                                </li>
                                <li>
                                    <a>Pengaturan</a>
                                </li>
                                <li>
                                    <a className="text-error">Logout</a>
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
                    <div className="p-6 border-b border-base-300">
                        <h2 className="text-2xl font-bold text-primaryGreen">
                            My Admin
                        </h2>
                        {/* <p className="text-sm text-gray-500 mt-1">DaisyUI v5 Panel</p> */}
                    </div>

                    <ul className="menu p-4 text-base-content w-full gap-1">
                        <li>
                            <Link href="/admin" className="rounded-xl">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/kasir" className="rounded-xl">
                                Kasir
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary className="rounded-xl">
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
                                Produk
                            </Link>
                        </li>
                        <li>
                            <Link href="/kategori" className="rounded-xl">
                                Kategori
                            </Link>
                        </li>
                        <li>
                            <Link href="/meja" className="rounded-xl">
                                Meja
                            </Link>
                        </li>
                        <li>
                            <Link href="/pegawai" className="rounded-xl">
                                Pegawai
                            </Link>
                        </li>
                        <li>
                            <Link href="/inventaris" className="rounded-xl">
                                Inventaris
                            </Link>
                        </li>
                        <li>
                            <details>
                                <summary className="rounded-xl">Member</summary>
                                <ul>
                                    <li>
                                        <Link href="/member">Data Member</Link>
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
                                Pengguna
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className="rounded-xl">
                                Pengaturan
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}
