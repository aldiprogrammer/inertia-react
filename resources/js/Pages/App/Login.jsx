import { Link } from "@inertiajs/react";
import React from "react";

export default function Login() {
    return (
        <div className="bg-gray-200 md:flex md:items-center md:justify-center md:min-h-screen">
            {/* DEVICE */}
            <div className="w-full h-screen bg-white overflow-hidden relative md:max-w-[375px] md:mx-auto md:shadow-2xl md:border md:rounded-sm">
                {/* <div className="sticky top-0 z-50 p-4 transition-all duration-300 ">
                    <div className="flex justify-between">
                        <h3 className="font-bold">Login</h3>
                        <div onClick={() => window.history.back()}>
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                </div> */}
                <div>
                    <div className="mt-20">
                        <img src="img/drawlogin.svg" alt="" />
                        {/* <div className="text-center text-gray-500">
                            Pesanan anda berhasil dikirim, silahjan melakukan
                            pembayaran di kasir agar pesanan anda di proses
                        </div> */}
                        <div className="flex justify-center"></div>
                    </div>

                    <div className="px-4 mt-5">
                        <a
                            href="/auth/google"
                            className="btn bg-gray-300 w-full rounded-[20px]"
                        >
                            <i class="fa-brands fa-google"></i> Login with
                            account google
                        </a>

                        <button className="btn bg-blue-500 w-full rounded-[20px] mt-3 text-white">
                            <i class="fa-brands fa-facebook"></i> Login with
                            account facebook
                        </button>
                    </div>
                    <div className="text-center mt-2 text-gray-400">
                        Silahkan login dengan akun anda
                    </div>
                </div>
            </div>
        </div>
    );
}
