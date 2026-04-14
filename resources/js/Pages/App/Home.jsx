import React from "react";

export default function Home({ kategori, produk }) {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            {/* SIMULASI DEVICE MOBILE DI TENGAH */}
            <div className="w-[375px] h-[812px] bg-white rounded-[0px] shadow-2xl overflow-hidden border">
                <div className="p-4 space-y-4 h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            className="w-10 h-10 rounded-full"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-full rounded-full"
                        />
                    </div>

                    <div className="bg-green-200 rounded-xl p-3">
                        <div className="my-3">
                            <div className="font-bold">Hello Aldi</div>
                            <div>Selamat datang di aplikasi E-order</div>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-4 gap-3">
                        {kategori.map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-xl p-3 flex flex-col items-center text-xs shadow"
                            >
                                {/* <div className="w-10 h-10 bg-green-200 rounded-full mb-2"></div> */}
                                {item.kategori}
                            </div>
                        ))}
                    </div>

                    {/* Payment */}
                    <div className="bg-gray-100 rounded-xl p-3 flex justify-between items-center">
                        <div>
                            <p className="text-xs text-gray-500">Payment</p>
                            <p className="font-semibold text-sm">Add a Card</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <span>Ovo 0</span>
                            <span>Gift</span>
                        </div>
                    </div>

                    {/* Food Section */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <h2 className="font-semibold">Food For You</h2>
                            <span className="text-sm text-gray-400">
                                See All
                            </span>
                        </div>

                        <div className="">
                            {produk.map((item, index) => (
                                <div
                                    key={index}
                                    className="min-w-[160px] bg-white rounded-xl shadow p-2"
                                >
                                    <img
                                        src={`/storage/${item.gambar}`}
                                        className="rounded-lg mb-2"
                                    />
                                    <p className="text-sm font-semibold">
                                        Bubble Milk Tea
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        4.5 • 1k reviews
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        $5.00
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Navbar (DI DALAM DEVICE) */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around">
                    <button className="btn btn-ghost btn-sm">🏠</button>
                    <button className="btn btn-ghost btn-sm">🛒</button>
                    <button className="btn btn-success rounded-full px-6">
                        Home
                    </button>
                    <button className="btn btn-ghost btn-sm">💬</button>
                    <button className="btn btn-ghost btn-sm">👤</button>
                </div>
            </div>
        </div>
    );
}
