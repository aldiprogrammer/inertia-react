import AdminLayout from '@/Layouts/AdminLayout'
import { Form, useForm } from '@inertiajs/react';
import React, { useRef } from 'react'


export default function Kategori({ kategori }) {
    const modalRef = useRef(null);
    const openModal = () => {
        modalRef.current.showModal();
    };

    const closeModal = () => {
        modalRef.current.close();
    };



    const { data, setData, post, errors, processing, reset } = useForm({
        kode: '',
        kategori: '',
    })

    function save(e) {
        e.preventDefault()
        post('/addkategori', {
            onSuccess: () => {
                closeModal();
                reset()
            }
        })

    }

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus')) {
            post('/kategori/' + id);
        }
    }




    return (
        <div>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Kategori</h2>
                            <div class="flex gap-2">
                                <button className="btn btn-success" onClick={openModal}>
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

                                        <h3 className="text-lg font-bold">Tambah data</h3>

                                        <form onSubmit={save}>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Kode</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={data.kode}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('kode', e.target.value)}
                                                />
                                                {errors.kode && <div>{errors.kode}</div>}
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Kategori</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kategori" value={data.kategori}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('kategori', e.target.value)}
                                                />
                                                {errors.kategori && <div>{errors.kategori}</div>}
                                            </label>

                                            <div className="mt-4 flex gap-2">
                                                <button type="submit" disabled={processing} className="btn btn-success">
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
                            </div>
                        </div>

                        <div>
                            <table className="table table-zebra" id="myTable">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode</th>
                                        <th>Kategori</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kategori.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.kode}</td>
                                            <td>{item.kategori}</td>
                                            <td>
                                                <button className="btn btn-error btn-sm" onClick={() => hapus(item.id)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Kategori.layout = page => <AdminLayout>{page}</AdminLayout>