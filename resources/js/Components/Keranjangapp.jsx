import { router } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Keranjangapp({ kodeorder, meja }) {
    const modalRef = useRef(null);
    const [keranjang, Setkeranjang] = useState([]);
    const [total, setTotal] = useState(0);
    const [showmeja, setShowmeja] = useState(true);
    const [valmeja, setValmeja] = useState(0);
    const [catatan, setCatatan] = useState("");
    const [jenispesanan, setJenispesanan] = useState("Dine In");

    const openModal = () => {
        modalRef.current.showModal();
        getkeranjang();
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const getkeranjang = async () => {
        try {
            const response = await axios.get("/keranjanguser/" + kodeorder);
            // console.log(response);
            Setkeranjang(response.data.listorder);
            setTotal(response.data.total);
        } catch (error) {}
    };
    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus ?")) {
            router.delete("/hapuslistorderuser/" + id, {
                onSuccess: () => {
                    getkeranjang();
                },
            });
        }
    };

    const tambahqty = (id) => {
        router.put(
            "/tambahqtyuser/" + id,
            {},
            {
                onSuccess: () => {
                    console.log("SUCCESS");
                    getkeranjang();
                },
                onError: (errors) => {
                    console.log("ERROR:", errors);
                },
            },
        );
    };

    const kurangqty = (id) => {
        router.put(
            "/kurangqtyuser/" + id,
            {},
            {
                onSuccess: () => {
                    console.log("SUCCESS");
                    getkeranjang();
                },
                onError: (errors) => {
                    console.log("ERROR:", errors);
                },
            },
        );
    };

    const handlejenispesanan = (e) => {
        setJenispesanan(e);
        if (e == "Dine In") {
            setShowmeja(true);
        } else {
            setShowmeja(false);
        }
    };

    const handleorder = () => {
        router.post(
            "/addorderuser",
            {
                kode_order: kodeorder,
                jenis_pesanan: jenispesanan,
                meja: valmeja,
                catatan: catatan,
                total_harga: total,
            },
            {
                onSuccess: () => {
                    Setkeranjang([]);
                    setJenispesanan("Dine In");
                    setValmeja("");
                    setCatatan("");
                    setTotal(0);
                    closeModal();
                },
            },
        );
    };

    useEffect(() => {
        getkeranjang();
    }, []);

    return (
        <>
            <button
                className="btn bg-green-600 text-white rounded-full px-6"
                onClick={openModal}
            >
                <i className="fas fa-bag-shopping"></i>Order
            </button>

            <dialog ref={modalRef} className="modal modal-bottom ">
                <div className="modal-box">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    <h3 className="text-lg text-success">
                        {" "}
                        <i className="fas fa-bag-shopping text-success"></i>{" "}
                        Keranjang Belanja
                    </h3>

                    <div className="mt-3">
                        {keranjang.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-3 transition hover:shadow-md"
                            >
                                <img
                                    src={`/storage/${item.listproduk.gambar}`}
                                    alt={item.produk}
                                    className="h-20 w-20 rounded-2xl object-cover"
                                />

                                <div className="flex-1">
                                    <h3 className="line-clamp-1 text-base font-semibold">
                                        {item.produk}
                                    </h3>
                                    <p className="mt-1 text-sm text-primary font-bold">
                                        Rp{" "}
                                        {Number(item.harga).toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            className="btn btn-circle btn-sm btn-outline"
                                            disabled={item.qty == 1}
                                            onClick={() => kurangqty(item.id)}
                                        >
                                            -
                                        </button>

                                        <span className="min-w-[32px] text-center text-sm font-semibold">
                                            {item.qty}
                                        </span>

                                        <button
                                            className="btn btn-circle btn-sm bg-green-300"
                                            onClick={() => tambahqty(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <p className="text-right text-sm font-bold">
                                        Rp{" "}
                                        {Number(
                                            item.total_harga,
                                        ).toLocaleString("id-ID")}
                                    </p>

                                    <button
                                        className="btn btn-circle btn-sm btn-error btn-outline"
                                        onClick={() => hapus(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}

                        {keranjang == false ||
                        keranjang == null ||
                        keranjang == [] ? (
                            <div className="my-20 ">
                                <div className="flex justify-center">
                                    <img
                                        width="64"
                                        height="64"
                                        src="https://img.icons8.com/arcade/64/shop-local.png"
                                        alt="shop-local"
                                    />
                                </div>
                                <div className="flex justify-center items-center text-center text-gray-400">
                                    Keranjang belanja anda belum tersedia
                                </div>
                            </div>
                        ) : (
                            <>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">
                                            Jenis Pesanan
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <label class="label cursor-pointer gap-2">
                                            <input
                                                type="radio"
                                                name="jenispesanan"
                                                value="cash"
                                                class="radio radio-error"
                                                defaultChecked
                                                onClick={() =>
                                                    handlejenispesanan(
                                                        "Dine In",
                                                    )
                                                }
                                            />
                                            <span class="label-text font-semibold">
                                                Dine In
                                            </span>
                                        </label>

                                        <label class="label cursor-pointer gap-2">
                                            <input
                                                type="radio"
                                                name="jenispesanan"
                                                value="cash"
                                                class="radio radio-success"
                                                onClick={() =>
                                                    handlejenispesanan(
                                                        "Takeway",
                                                    )
                                                }
                                            />
                                            <span class="label-text font-semibold">
                                                Takeway
                                            </span>
                                        </label>
                                    </div>
                                </label>
                                {showmeja == true ? (
                                    <>
                                        {" "}
                                        <label
                                            className="form-control w-full mt-2"
                                            disabled
                                        >
                                            <div className="label">
                                                <span className="label-text">
                                                    No Meja Anda
                                                </span>
                                            </div>
                                            <select
                                                name=""
                                                id=""
                                                className="input input-bordered input-success text-gray-400"
                                                onChange={(e) =>
                                                    setValmeja(e.target.value)
                                                }
                                            >
                                                <option value="0">
                                                    -- Pilih Nomor Meja --
                                                </option>
                                                {meja.map((item, index) => (
                                                    <option key={index}>
                                                        {item.meja}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </>
                                ) : (
                                    <></>
                                )}

                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Catatan
                                        </span>
                                    </div>
                                    <textarea
                                        name=""
                                        className="input input-bordered input-success"
                                        id=""
                                        placeholder="Opsional"
                                        onChange={(e) =>
                                            setCatatan(e.target.value)
                                        }
                                    ></textarea>
                                </label>

                                <div className="flex justify-between mt-3">
                                    <div className="text-gray-500">
                                        Subtotal
                                    </div>
                                    <div className="text-gray-500">
                                        Rp {total.toLocaleString("id-ID")}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div className="font-bold">Total Harga</div>
                                    <h3 className="font-bold">
                                        Rp {total.toLocaleString("id-ID")}
                                    </h3>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-4 flex">
                        {keranjang != false ? (
                            <>
                                <button
                                    type="submit"
                                    className="btn btn-success w-full rounded-xl text-white"
                                    onClick={() => handleorder()}
                                >
                                    <i className="fas fa-bag-shopping"></i>{" "}
                                    Pesan sekarang
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
}
