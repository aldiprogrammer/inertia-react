import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function User({ user }) {
    const { data, setData, post, delete: destroy, reset } = useForm({});
    const { flash } = usePage().props;
    const hapus = (id) => {
        if (confirm("Yakin ingin menghapus")) {
            destroy("/user/" + id);
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
        <>
            <Head title="User" />
            <AdminLayout>
                <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">Data User</h2>
                            </div>

                            <div>
                                <table
                                    className="table table-zebra"
                                    id="myTable"
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Email</th>
                                            <th>Profil</th>
                                            <th>Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    <img
                                                        className="h-10 rounded-lg"
                                                        src={item.avatar}
                                                        alt=""
                                                    />
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
            <ToastContainer />
        </>
    );
}
