import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";

export default function Member({ member, kode }) {
    const [id, setId] = useState(0);
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
        tgl_daftar: "",
        kode: kode,
        nama: "",
        tgl_lahir: "",
        nohp: "",
        alamat: "",
    });

    const modalRef = useRef(null);
    const editModalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    };
    const editopenModal = (
        id,
        tgl_daftar,
        kode,
        nama,
        tgl_lahir,
        nohp,
        alamat,
    ) => {
        editModalRef.current.showModal();
        setData("tgl_daftar", tgl_daftar);
        setData("kode", kode);
        setData("nama", nama);
        setData("tgl_lahir", tgl_lahir);
        setData("nohp", nohp);
        setData("alamat", alamat);
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
        post("/addmember", {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const update = (e) => {
        e.preventDefault();
        patch("/editmember/" + id, {
            onSuccess: () => {
                reset();
                editCloseModal();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapusmember/" + id);
        }
    };

    const status = (id) => {
        if (confirm("Yakin ingin update status ini?")) {
            patch("/statusmember/" + id);
        }
    };
    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Member</h2>
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
                                                        Tanggal Daftar
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="kode"
                                                    value={data.tgl_daftar}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_daftar",
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
                                                    value={data.nama}
                                                    className="input input-bordered input-success w-full"
                                                    required
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
                                                        Tanggal Lahir
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_lahir"
                                                    value={data.tgl_lahir}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_lahir",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        No Whatsapp
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nohp"
                                                    value={data.nohp}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nohp",
                                                            e.target.value,
                                                        )
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
                                                    name="alamat"
                                                    className="input input-bordered input-success"
                                                    id="
                                                "
                                                    onChange={(e) =>
                                                        setData(
                                                            "alamat",
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={data.alamat}
                                                ></textarea>
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
                                                        Tanggal Daftar
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="kode"
                                                    value={data.tgl_daftar}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_daftar",
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
                                                    value={data.nama}
                                                    className="input input-bordered input-success w-full"
                                                    required
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
                                                        Tanggal Lahir
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_lahir"
                                                    value={data.tgl_lahir}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_lahir",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        No Whatsapp
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nohp"
                                                    value={data.nohp}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "nohp",
                                                            e.target.value,
                                                        )
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
                                                    name="alamat"
                                                    className="input input-bordered input-success"
                                                    id="
                                                "
                                                    onChange={(e) =>
                                                        setData(
                                                            "alamat",
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={data.alamat}
                                                ></textarea>
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
                                        <th>Tgl Daftar</th>
                                        <th>Nama</th>
                                        <th>Tgl Lahir</th>
                                        <th>No Wa</th>
                                        <th>Alamat</th>
                                        <th>Status</th>

                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {member.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.tanggal_daftar}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.tgl_lahir}</td>
                                            <td>{item.nohp}</td>
                                            <td>{item.alamat}</td>
                                            <td>
                                                {item.status == 1 ? (
                                                    <div class="badge badge-primary">
                                                        Aktif
                                                    </div>
                                                ) : (
                                                    <div class="badge badge-error text-white">
                                                        Tidak aktif
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
                                                                item.tanggal_daftar,
                                                                item.kode,
                                                                item.nama,
                                                                item.tgl_lahir,
                                                                item.nohp,
                                                                item.alamat,
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
        </AdminLayout>
    );
}
