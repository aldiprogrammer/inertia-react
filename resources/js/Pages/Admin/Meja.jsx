import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Meja({ meja }) {
    const { flash } = usePage().props;
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
        meja: "",
    });
    const [id, setId] = useState(0);

    const modalRef = useRef(null);
    const editModalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
        reset();
    };

    const editopenModal = (id, kode, meja) => {
        editModalRef.current.showModal();
        setData("kode", kode);
        setData("meja", meja);
        setData("id", id);
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
        post("/addmeja", {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const edit = (e) => {
        e.preventDefault();
        patch("/editmeja/" + id, {
            onSuccess: () => {
                reset();
                editCloseModal();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapusmeja/" + id);
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
                            <h2 class="card-title">Data Meja</h2>
                            <div class="flex gap-2">
                                <button
                                    className="btn btn-success"
                                    onClick={openModal}
                                >
                                    <i className="fas fa-plus"></i>
                                    Tambah data
                                </button>

                                <dialog ref={modalRef} className="modal ">
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
                                                        Meja
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="meja"
                                                    value={data.meja}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "meja",
                                                            e.target.value,
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

                                        <form onSubmit={edit}>
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
                                                        Meja
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="meja"
                                                    value={data.meja}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "meja",
                                                            e.target.value,
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
                                        <th>Meja</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meja.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.meja}</td>
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
                                                                item.meja,
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
