import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Inventaris({ inventaris, kode }) {
    const [id, setId] = useState(0);
    const { flash } = usePage().props;
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        reset,
        processing,
        errors,
    } = useForm({
        nama_barang: "",
        kode: kode,
        tanggal: "",
        jenis: "",
        jumlah: "",
        kondisi: "",
        lokasi: "",
    });
    const modalRef = useRef(null);
    const editmodalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
        reset();
    };
    const openeditModal = (
        id,
        kode,
        tanggal,
        nama_barang,
        jumlah,
        lokasi,
        kondisi,
        jenis,
    ) => {
        editmodalRef.current.showModal();
        setData("kode", kode);
        setData("nama_barang", nama_barang);
        setData("tanggal", tanggal);
        setData("jumlah", jumlah);
        setData("lokasi", lokasi);
        setData("kondisi", kondisi);
        setData("jenis", jenis);
        setId(id);
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const editCloseModal = () => {
        editmodalRef.current.close();
    };

    const save = (e) => {
        e.preventDefault();
        post("/addinventaris", {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const update = (e) => {
        e.preventDefault();
        patch("/editinventaris/" + id, {
            onSuccess: () => {
                reset();
                editCloseModal();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapusinventaris/" + id);
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
                            <h2 class="card-title">Data Inventaris</h2>
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
                                                        Tanggal
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tanggal"
                                                    value={data.tanggal}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tanggal",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
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
                                                {errors.kode && (
                                                    <div>{errors.kode}</div>
                                                )}
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Nama Barang
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kategori"
                                                    value={data.nama_barang}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama_barang",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jumlah Barang
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="jml_barang"
                                                    value={data.jumlah}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "jumlah",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jenis Barang
                                                    </span>
                                                </div>
                                                <select
                                                    className="input input-bordered input-success"
                                                    required
                                                    name="jeneis"
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        -- Pilih Jenis Barang --
                                                    </option>
                                                    <option>Fernitur</option>
                                                    <option>
                                                        Peralatan Dapur
                                                    </option>
                                                    <option>Dll</option>
                                                </select>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Lokasi
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lokasi"
                                                    value={data.lokasi}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "lokasi",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kondisi Barang
                                                    </span>
                                                </div>
                                                <select
                                                    className="input input-bordered input-success"
                                                    required
                                                    name="kondisi"
                                                    onChange={(e) =>
                                                        setData(
                                                            "kondisi",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        -- Pilih Kondisi Barang
                                                        --
                                                    </option>
                                                    <option>Baik</option>
                                                    <option>Rusak</option>
                                                    <option>Dll</option>
                                                </select>
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
                                <dialog ref={editmodalRef} className="modal">
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
                                                        Tanggal
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tanggal"
                                                    value={data.tanggal}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tanggal",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
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
                                                {errors.kode && (
                                                    <div>{errors.kode}</div>
                                                )}
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Nama Barang
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kategori"
                                                    value={data.nama_barang}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama_barang",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jumlah Barang
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="jml_barang"
                                                    value={data.jumlah}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "jumlah",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Jenis Barang
                                                    </span>
                                                </div>
                                                <select
                                                    className="input input-bordered input-success"
                                                    required
                                                    name="jeneis"
                                                    onChange={(e) =>
                                                        setData(
                                                            "jenis",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value={data.jenis}>
                                                        {data.jenis}
                                                    </option>
                                                    <option>Fernitur</option>
                                                    <option>
                                                        Peralatan Dapur
                                                    </option>
                                                    <option>Dll</option>
                                                </select>
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Lokasi
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lokasi"
                                                    value={data.lokasi}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "lokasi",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Kondisi Barang
                                                    </span>
                                                </div>
                                                <select
                                                    className="input input-bordered input-success"
                                                    required
                                                    name="kondisi"
                                                    onChange={(e) =>
                                                        setData(
                                                            "kondisi",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={data.kondisi}
                                                    >
                                                        {data.kondisi}
                                                    </option>
                                                    <option>Baik</option>
                                                    <option>Rusak</option>
                                                    <option>Dll</option>
                                                </select>
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
                                        <th>Tanggal</th>
                                        <th>Nama Barang</th>
                                        <th>Jumlah</th>
                                        <th>Jenis</th>
                                        <th>Lokasi</th>
                                        <th>Kondisi</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventaris.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.tanggal}</td>
                                            <td>{item.nama_barang}</td>
                                            <td>{item.jumlah}</td>
                                            <td>{item.jenis}</td>
                                            <td>{item.lokasi}</td>
                                            <td>{item.kondisi}</td>

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
                                                            openeditModal(
                                                                item.id,
                                                                item.kode,
                                                                item.tanggal,
                                                                item.nama_barang,
                                                                item.jumlah,
                                                                item.lokasi,
                                                                item.kondisi,
                                                                item.jenis,
                                                            )
                                                        }
                                                    >
                                                        Edit
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
