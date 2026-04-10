import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useRef, useState } from "react";

export default function Listorder({ list, total }) {
    const [member, setMember] = useState("");
    const [showformcash, setShowformcash] = useState(false);

    const [nama, setNama] = useState("");
    const { data, setData } = useForm({
        kode_member: "",
        nama: "",
        id: "",
        uang: "",
        kembalian: "0",
        metoda_pembayaran: "",
    });
    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus ?")) {
            router.delete("/hapuslistorder/" + id, {
                onSuccess: () => {
                    alert("data berhasil di hapus");
                },
            });
        }
    };

    const tambahqty = (id) => {
        router.put("/tambahqty/" + id, {
            onSuccess: (res) => {
                console.log(res);
            },
        });
    };

    const kurangqty = (id) => {
        router.put("/kurangqty/" + id, {
            onSuccess: (res) => {
                console.log(res);
            },
        });
    };

    const cekMember = (val) => {
        setMember(val);
        setNama("");
        getMember(val);
    };

    const getMember = async (kode) => {
        try {
            const response = await axios.get("/cekmember/" + kode);
            if (response.data.data.nama == null) {
                setNama("");
            } else {
                setNama(response.data.data.nama);
            }
        } catch (error) {}
    };

    const handleUang = (val) => {
        setData("uang", val);
        const uang = Number(val);
        const kembalian = uang - Number(total);
        if (kembalian <= 0) {
            setData("kembalian", 0);
        } else {
            setData("kembalian", kembalian);
        }
    };

    const handlefilteruang = (val) => {
        setData("uang", val);
        const uang = Number(val);
        const kembalian = uang - Number(total);
        if (kembalian <= 0) {
            setData("kembalian", 0);
        } else {
            setData("kembalian", kembalian);
        }
    };

    const handlemetodepembayaran = (val) => {
        setData("metode_pembyaran", val);
        if (val == "Cash") {
            setShowformcash(true);
        } else {
            setShowformcash(false);
        }
    };
    return (
        <div>
            {list.map((item, index) => (
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
                            Rp {Number(item.harga).toLocaleString("id-ID")}
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
                                className="btn btn-circle btn-sm btn-success"
                                onClick={() => tambahqty(item.id)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <p className="text-right text-sm font-bold">
                            Rp{" "}
                            {Number(item.total_harga).toLocaleString("id-ID")}
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

            {total == 0 ? (
                <>
                    <div className="justify-center mt-20">
                        <div className="text-center text-gray-400">Opps!</div>
                        <p className="text-gray-400 text-center">
                            {" "}
                            Keranjang Belanja kosong
                        </p>
                    </div>
                </>
            ) : (
                <>
                    {" "}
                    <div className="space-y-4 border-t border-base-300 p-5">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-base-content/70">
                                Subtotal
                            </span>
                            <span className="font-semibold">
                                Rp {total.toLocaleString("id-ID")}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">
                                Rp {total.toLocaleString("id-ID")}
                            </span>
                        </div>

                        <button
                            className="btn btn-success text-white btn-block rounded-2xl text-base"
                            onClick={openModal}
                        >
                            Pembayaran
                        </button>

                        <dialog ref={modalRef} className="modal">
                            <div className="modal-box">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                >
                                    ✕
                                </button>

                                <h3 className="text-lg font-bold">
                                    Pembayaran
                                </h3>

                                <form>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5 mt-3">
                                        <div class="card bg-green-300 shadow-md border border-base-300">
                                            <div class="card-body">
                                                <p class="text-sm text-black">
                                                    Total
                                                </p>
                                                <h2 class="text-3xl font-bold">
                                                    {total.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </h2>
                                            </div>
                                        </div>

                                        <div class="card bg-red-300 shadow-md border border-base-300">
                                            <div class="card-body">
                                                <p class="text-sm text-black">
                                                    Kembalian
                                                </p>
                                                <h2 class="text-3xl font-bold">
                                                    {data.kembalian.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </h2>
                                            </div>
                                        </div>

                                        <label className="form-control w-full mt-1">
                                            <div className="label">
                                                <span className="label-text">
                                                    No Member
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="kode"
                                                className="input input-bordered input-success w-full"
                                                onChange={(e) =>
                                                    cekMember(e.target.value)
                                                }
                                            />
                                        </label>

                                        <label className="form-control w-full mt-1">
                                            <div className="label">
                                                <span className="label-text">
                                                    Nama Member
                                                </span>
                                            </div>
                                            <input
                                                type="text"
                                                name="kode"
                                                className="input input-bordered input-success w-full"
                                                value={nama}
                                                readOnly
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="">
                                            Sitem Pembayaran
                                        </label>
                                        <div class="flex gap-6 mb-6">
                                            <label class="label cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="pembayaran"
                                                    value="cash"
                                                    class="radio radio-error"
                                                    onClick={() =>
                                                        handlemetodepembayaran(
                                                            "Cash",
                                                        )
                                                    }
                                                />
                                                <span class="label-text font-semibold">
                                                    Cash
                                                </span>
                                            </label>

                                            <label class="label cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="pembayaran"
                                                    value="transfer"
                                                    class="radio radio-success"
                                                    onClick={() =>
                                                        handlemetodepembayaran(
                                                            "Transfer",
                                                        )
                                                    }
                                                />
                                                <span class="label-text font-semibold">
                                                    Transfer
                                                </span>
                                            </label>

                                            <label class="label cursor-pointer gap-2">
                                                <input
                                                    type="radio"
                                                    name="pembayaran"
                                                    value="qris"
                                                    class="radio radio-info"
                                                    onClick={() =>
                                                        handlemetodepembayaran(
                                                            "QRIS",
                                                        )
                                                    }
                                                />
                                                <span class="label-text font-semibold">
                                                    QRIS
                                                </span>
                                            </label>
                                        </div>
                                        {showformcash == true ? (
                                            <div className="grid sm:grid-cols-2 gap-2">
                                                <label className="form-control w-full">
                                                    <input
                                                        type="number"
                                                        className="input input-bordered input-success w-full"
                                                        placeholder="Uang"
                                                        value={data.uang}
                                                        onChange={(e) =>
                                                            handleUang(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </label>
                                                <div className="flex gap-1">
                                                    <a
                                                        className="btn btn-error text-white"
                                                        onClick={() =>
                                                            handlefilteruang(
                                                                20000,
                                                            )
                                                        }
                                                    >
                                                        20 rb
                                                    </a>

                                                    <a
                                                        className="btn btn-error  text-white"
                                                        onClick={() =>
                                                            handlefilteruang(
                                                                50000,
                                                            )
                                                        }
                                                    >
                                                        50 rb
                                                    </a>

                                                    <a
                                                        className="btn btn-error  text-white"
                                                        onClick={() =>
                                                            handlefilteruang(
                                                                100000,
                                                            )
                                                        }
                                                    >
                                                        100 rb
                                                    </a>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mt-10 grid sm:grid-cols-2 gap-2">
                                        <button
                                            type="submit"
                                            // disabled={processing}
                                            className="btn btn-success text-white"
                                        >
                                            Simpan Order
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-error text-white"
                                        >
                                            Cetak Struk
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </dialog>
                    </div>
                </>
            )}
        </div>
    );
}
