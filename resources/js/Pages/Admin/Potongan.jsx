import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Potongan({ potongan }) {
    const { flash } = usePage().props;
    const [id, setId] = useState(0);
    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        tgl_mulai: "",
        tgl_selesai: "",
        min_order: "",
        diskon: "",
    });

    const modalRef = useRef(null);
    const editModalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    };

    const editopenModal = (id, tgl_mulai, tgl_selesai, min_order, diskon) => {
        editModalRef.current.showModal();
        setData("tgl_mulai", tgl_mulai);
        setData("tgl_selesai", tgl_selesai);
        setData("min_order", min_order);
        setData("diskon", diskon);
        setId(id);
    };

    const closeModal = () => {
        modalRef.current.close();
    };

    const editcloseModal = () => {
        editModalRef.current.close();
    };

    const save = (e) => {
        e.preventDefault();
        post("/addpotongan", {
            onSuccess: () => {
                reset();
                closeModal();
            },
        });
    };

    const update = (e) => {
        e.preventDefault();
        patch("/editpotongan/" + id, {
            onSuccess: () => {
                reset();
                editcloseModal();
            },
        });
    };

    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/hapuspotongan/" + id);
        }
    };
    const status = (id) => {
        if (confirm("Yakin ingin update status ini?")) {
            patch("/statuspotongan/" + id);
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
                            <h2 class="card-title">Data Potongan Member</h2>
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
                                                        Tanggal Mulai
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_mulai"
                                                    value={data.tgl_mulai}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_mulai",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Tanggal Selesai
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_selesai"
                                                    value={data.tgl_selesai}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_selesai",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Min Order
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="min_order"
                                                    value={data.min_order}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "min_order",
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
                                                <small>
                                                    Masukan angak tanpa tanda %
                                                </small>
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
                                            onClick={editcloseModal}
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
                                                        Tanggal Mulai
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_mulai"
                                                    value={data.tgl_mulai}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_mulai",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Tanggal Selesai
                                                    </span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_mulai"
                                                    value={data.tgl_selesai}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "tgl_selesai",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">
                                                        Min Order
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="min_order"
                                                    value={data.min_order}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) =>
                                                        setData(
                                                            "min_order",
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
                                                <small>
                                                    Masukan angak tanpa tanda %
                                                </small>
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
                                                    onClick={editcloseModal}
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
                                        <th>Tgl Mulai</th>
                                        <th>Tgl Selesai</th>
                                        <th>Min Order</th>
                                        <th>Dikson</th>
                                        <th>Status</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {potongan.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.tgl_mulai}</td>
                                            <td>{item.tgl_selesai}</td>
                                            <td>
                                                {item.min_order.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </td>
                                            <td>{item.diskon}%</td>
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
                                                                item.tgl_mulai,
                                                                item.tgl_selesai,
                                                                item.min_order,
                                                                item.diskon,
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
