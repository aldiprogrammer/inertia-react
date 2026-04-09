import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react'
import React, { useRef, useState } from 'react'

export default function Pengguna({pengguna}) {
    const [id, setId] = useState(0);
    const { data, setData, post, patch, delete: destroy, processing, error, reset } = useForm({
        username: '',
        role: '',
        password : '',
    });

    const modalRef = useRef(null);
    const editModalRef = useRef(null);
    
    const openModal = () => {
        modalRef.current.showModal();
    }
    const editopenModal = (id,username, role, password='') => {
        editModalRef.current.showModal();
        setData('username', username);
        setData('role', role);
        setData('password', password);
        setId(id);
    }

    const closeModal = () => {
        modalRef.current.close();
    }

    const editCloseModal = () => {
        editModalRef.current.close();
    }

    const save = (e) => {
        e.preventDefault();
        post('/addpengguna', {
            onSuccess: () => {
                reset();
                closeModal()
            }
        })
    };

    const update = (e) => {
        e.preventDefault();
        patch('/editpengguna/' + id, {
            onSuccess: () => {
                reset();
                editCloseModal();
            }
        })
    };

    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus')) {
            destroy('/hapuspengguna/' + id);
        }
    };

    const status = (id) => {
        if (confirm('Yakin ingin update status ini?')) {
            patch('/statuspengguna/' + id);
        }
    }
  return (
      <AdminLayout>
          <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Pengguna</h2>
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
                                                    <span className="label-text">Username</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={data.username}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('username', e.target.value)}
                                                />

                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Role</span>
                                                </div>
                                              <select name="role" id="" className='input input-bordered input-success' required onChange={(e) => setData('role', e.target.value)}>
                                                  <option value=""> -- Pilih Role --</option>
                                                  <option value="Kasir">Kasir</option>
                                                  <option value="Kasir">Admin</option>
                                               </select>
                                          </label>
                                          
                                          <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Password</span>
                                                </div>
                                                <input
                                                    type="password"
                                                    name="passwowrd" value={data.password}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('password', e.target.value)}
                                                />
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
                                                    <span className="label-text">Username</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="kode"
                                                    value={data.username}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('username', e.target.value)}
                                                />

                                            </label>
                                            <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">Role</span>
                                                </div>
                                              <select name="role" id="" className='input input-bordered input-success' required onChange={(e) => setData('role', e.target.value)}>
                                                  <option value="{data.role}">{ data.role }</option>
                                                  <option value="Kasir">Kasir</option>
                                                  <option value="Kasir">Admin</option>
                                               </select>
                                          </label>
                                          
                                          <label className="form-control w-full mt-2">
                                                <div className="label">
                                                    <span className="label-text">New Password</span>
                                                </div>
                                                <input
                                                    type="password"
                                                    name="passwowrd" value={data.password}
                                                    className="input input-bordered input-success w-full"
                                                    required
                                                    onChange={(e) => setData('password', e.target.value)}
                                                />
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
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pengguna.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                <div className='flex gap-2'>
                                                    <button className="btn btn-error btn-sm" onClick={() => hapus(item.id)}>
                                                        Hapus
                                                    </button>
                                                    <button className='btn btn-success btn-sm' onClick={() => editopenModal(item.id, item.username, item.role)}>Edit</button>
                                                      
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
