import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

export default function Meja({ meja, kode }) {
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
        kode: kode,
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

    const downloadQR = (id) => {
        const canvas = document.getElementById("qr-" + id);
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = "meja-" + id + ".png";
            link.href = pngUrl;
            link.click();
        }
    };

    const cetakQR = () => {
        const canvases = document.querySelectorAll('[id^="qr-"]');
        const qrData = [];
        canvases.forEach((canvas, i) => {
            qrData.push({ dataUrl: canvas.toDataURL("image/png"), label: meja[i]?.meja || "" });
        });
        const win = window.open("", "_blank");
        win.document.write(`
            <html>
            <head>
                <title>Export QR Meja</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { padding: 20px; font-family: Arial, sans-serif; }
                    #pdf-content {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 16px;
                        max-width: 100%;
                    }
                    .card {
                        border: 2px solid #333;
                        border-radius: 8px;
                        padding: 16px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        aspect-ratio: 1 / 1;
                    }
                    .card img { display: block; max-width: 70%; height: auto; }
                    .card .label {
                        margin-top: 10px;
                        font-size: 14px;
                        font-weight: bold;
                        text-align: center;
                        text-transform: uppercase;
                    }
                </style>
            </head>
            <body>
                <div id="pdf-content">
                    ${qrData.map(q => `
                        <div class="card">
                            <img src="${q.dataUrl}" alt="QR Meja" />
                            <div class="label">${q.label}</div>
                        </div>
                    `).join("")}
                </div>
                <script>
                    var opt = {
                        margin:       0.5,
                        filename:     'qrcode-meja.pdf',
                        image:        { type: 'jpeg', quality: 0.98 },
                        html2canvas:  { scale: 2, useCORS: true },
                        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
                        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                    };
                    var el = document.getElementById('pdf-content');
                    html2pdf().set(opt).from(el).save().then(function() { window.close(); });
                <\/script>
            </body>
            </html>
        `);
        win.document.close();
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
                                    className="btn btn-primary"
                                    onClick={cetakQR}
                                >
                                    <i className="fas fa-print"></i>
                                    Cetak QR
                                </button>
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
                                        <th>QR Code</th>
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
                                                <div className="flex flex-col items-center gap-1">
                                                    <QRCodeCanvas
                                                        id={"qr-" + item.id}
                                                        value={
                                                            window.location.origin +
                                                            "/?table=" +
                                                            item.kode
                                                        }
                                                        size={80}
                                                        level="M"
                                                    />
                                                    <button
                                                        className="btn btn-ghost btn-xs"
                                                        onClick={() =>
                                                            downloadQR(item.id)
                                                        }
                                                    >
                                                        <i className="fas fa-download"></i>
                                                    </button>
                                                </div>
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
