import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useRef, useState } from 'react'

export default function Pegawai({ pegawai }) {
    const [id, setId] = useState(0);
    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        tgl_masuk: '',
        nama: '',
        alamat: '',
        nohp: '',
        jenis_kelamin: ''
    });
    const modalRef = useRef(null)
    const editModalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
    }

    const editopenModal = (id, tgl_masuk, nama, jk, wa, alamat) => {
        editModalRef.current.showModal();
        setData('tgl_masuk', tgl_masuk);
        setData('nama', nama);
        setData('jenis_kelamin', jk)
        setData('nohp', wa);
        setData('alamat', alamat);
        setId(id)
    }

    const closeModal = () => {
        modalRef.current.close();
    }

    const editCloseModal = () => {
        editModalRef.current.close();
    }

    const save = (e) => {
        e.preventDefault();
        post('/addpegawai', {
            onSuccess: () => {
                reset()
                closeModal();
            }
        })
    }

    const update = (e) => {
        e.preventDefault();
        patch('/editpegawai/' + id, {
            onSuccess: () => {
                reset();
                editCloseModal();
            }
        })
    }

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus')) {
            destroy('/hapuspegawai/' + id);
        }
    }


    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Pegawai</h2>
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
                                                    <span className="label-text">Tanggal masuk</span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_masuk"
                                                    value={data.tgl_masuk}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('tgl_masuk', e.target.value)}

                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Nama</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    value={data.nama}
                                                    onChange={(e) => setData('nama', e.target.value)}

                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Jenis Kelamin</span>
                                                </div>
                                                <select name="jenis_kelamin" id="" className='input input-bordered input-success w-full' required onChange={(e) => setData('jenis_kelamin', e.target.value)}>
                                                    <option value="">-- Pilih Jenis Kelamin --</option>
                                                    <option>Laki-laki</option>
                                                    <option>Perempuan</option>
                                                </select>
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">No Wa</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    name="nohp" value={data.nohp}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('nohp', e.target.value)}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Alamat</span>
                                                </div>
                                                <textarea name="alamat" id="" className='input input-bordered input-success' required onChange={(e) => setData('alamat', e.target.value)}>{data.alamat}</textarea>
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

                                        <h3 className="text-lg font-bold">Edit data</h3>

                                        <form onSubmit={update}>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Tanggal masuk</span>
                                                </div>
                                                <input
                                                    type="date"
                                                    name="tgl_masuk"
                                                    value={data.tgl_masuk}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('tgl_masuk', e.target.value)}

                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Nama</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    value={data.nama}
                                                    onChange={(e) => setData('nama', e.target.value)}

                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Jenis Kelamin</span>
                                                </div>
                                                <select name="jenis_kelamin" id="" className='input input-bordered input-success w-full' required onChange={(e) => setData('jenis_kelamin', e.target.value)}>
                                                    <option value={data.jenis_kelamin}>{data.jenis_kelamin}</option>
                                                    <option>Laki-laki</option>
                                                    <option>Perempuan</option>
                                                </select>
                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">No Wa</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="nohp" value={data.nohp}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('nohp', e.target.value)}
                                                />
                                            </label>

                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Alamat</span>
                                                </div>
                                                <textarea name="alamat" id="" className='input input-bordered input-success' required onChange={(e) => setData('alamat', e.target.value)} value={data.alamat}></textarea>
                                            </label>

                                            <div className="mt-4 flex gap-2">
                                                <button type="submit" disabled={processing} className="btn btn-success" >
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
                                        <th>Tgl Masuk</th>
                                        <th>Nama</th>
                                        <th>Jk</th>
                                        <th>No Wa</th>
                                        <th>Alamat</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pegawai.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.tgl_masuk}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.jenis_kelamin}</td>
                                            <td>{item.nohp}</td>
                                            <td>{item.alamat}</td>
                                            <td>
                                                <div className='flex gap-2'>
                                                    <button className="btn btn-error btn-sm" onClick={() => hapus(item.id)}>
                                                        Hapus
                                                    </button>
                                                    <button className='btn btn-success btn-sm' onClick={() => editopenModal(item.id, item.tgl_masuk, item.nama, item.jenis_kelamin, item.nohp, item.alamat)}>Edit</button>
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
    )
}
