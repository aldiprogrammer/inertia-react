import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Produk({ produk, kategori }) {
    const { flash } = usePage().props;
    const [id, setId] = useState(0);
    const { errors } = usePage().props;
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        error,
        reset,
    } = useForm({
        kode: "",
        nama: "",
        diskon: "",
        harga: "",
        kategori: "",
        status: 1,
        foto: "",
    });

    const modalRef = useRef(null);
    const editModalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
        reset();
    };

    const editopenModal = (id, kode, nama, kategori, harga, diskon, gambar) => {
        editModalRef.current.showModal();

        setData("kode", kode);
        setData("nama", nama);
        setData("kategori", kategori);
        setData("harga", harga);
        setData("diskon", diskon);
        setData("foto", gambar);
        setId(id);
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const editCloseModal = () => {
        editModalRef.current.close();
    };

    const save = (e) => {
        e.preventDefault();
        forceFormData: (true,
            post("/addproduk", {
                onSuccess: () => {
                    reset();
                    closeModal();
                },
            }));
    };

    const update = (e) => {
        e.preventDefault();
        post("/editproduk/" + id, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                editCloseModal();
            },
        });
    };

    const status = (id) => {
        if (confirm("Yakin ingin update status ini ?")) {
            patch("/updatestatus/" + id);
        }
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapusproduk/" + id);
        }
    };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        }
    }, [flash]);

    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Produk</h2>
                            <div class="flex gap-2">
                                <button
                                    className="btn btn-success"
                                    onClick={openModal}
                                >
                                    <i className="fas fa-plus"></i>
                                    Tambah data
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
                                            Tambah data
                                        </h3>

                                        <form onSubmit={save}>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kode
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={data.kode}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kode",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Nama
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    value={data.nama}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kategori
                                                    </span>
                                                </div>
                                                <select
                                                    name="jenis_kelamin"
                                                    id=""
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kategori",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        -- Pilih Kategori --
                                                    </option>
                                                    {kategori.map(
                                                        (item, index) => (
                                                            <option>
                                                                {item.kategori}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Harga
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="nohp"
                                                    value={data.harga}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "harga",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Diskon
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="diskon"
                                                    value={data.diskon}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "diskon",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Foto
                                                    </span>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="foto"
                                                    accept="image/*"
                                                    className="file-input file-input-bordered file-input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "foto",
                                                            e.target.files[0],
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
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

                                {/* Dialog Edi */}
                                <dialog ref={editModalRef} className="modal">
                                    <div className="modal-box">
                                        <button
                                            type="button"
                                            onClick={editCloseModal}
                                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                        >
                                            ✕
                                        </button>

                                        <h3 className="text-lg font-bold">
                                            Edit data
                                        </h3>

                                        <form onSubmit={update}>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kode
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={data.kode}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kode",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Nama
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    value={data.nama}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.nama && (
                                                    <div className="text-error">
                                                        {errors.nama}
                                                    </div>
                                                )}
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kategori
                                                    </span>
                                                </div>
                                                <select
                                                    name="jenis_kelamin"
                                                    id=""
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "kategori",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option>
                                                        {data.kategori}
                                                    </option>
                                                    {kategori.map(
                                                        (item, index) => (
                                                            <option>
                                                                {item.kategori}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Harga
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="nohp"
                                                    value={data.harga}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "harga",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Diskon
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="diskon"
                                                    value={data.diskon}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "diskon",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Foto
                                                    </span>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="foto"
                                                    accept="image/*"
                                                    className="file-input file-input-bordered file-input-success w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "foto",
                                                            e.target.files[0],
                                                        )
                                                    }
                                                />
                                            </label>

                                            <div className="mt-4 flex gap-2">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="btn btn-success"
                                                >
                                                    Edit data
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={editCloseModal}
                                                    className="btn btn-error"
                                                >
                                                    Keluar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>

                        <div>
                            <table className="table table-zebra" id="myTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode</th>
                                        <th>Nama</th>
                                        <th>Kategori</th>
                                        <th>Harga</th>
                                        <th>Diskon</th>
                                        <th>Foto</th>
                                        <th>Status</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produk.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.kategori}</td>
                                            <td>{item.harga}</td>
                                            <td>{item.diskon}</td>
                                            <td>
                                                <img
                                                    src={`/storage/${item.gambar}`}
                                                    alt={item.nama}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td>
                                                {item.status == 1 ? (
                                                    <div class="badge badge-primary">
                                                        Tersedia
                                                    </div>
                                                ) : (
                                                    <div class="badge badge-error text-white">
                                                        Tidak tersedia
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-error btn-sm"
                                                        onClick={() =>
                                                            hapus(item.id)
                                                        }
                                                    >
                                                        Hapus
                                                    </button>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() =>
                                                            editopenModal(
                                                                item.id,
                                                                item.kode,
                                                                item.nama,
                                                                item.kategori,
                                                                item.harga,
                                                                item.diskon,
                                                                item.gambar,
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() =>
                                                            status(item.id)
                                                        }
                                                    >
                                                        Updata status
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>
    );
}
