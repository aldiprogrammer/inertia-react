import AdminLayout from '@/Layouts/AdminLayout'
import { useForm } from '@inertiajs/react';
import React, { useRef } from 'react'

export default function Inventaris() {
    const { data, setData, post, patch, delete: destroy, reset, processing, errors } = useForm({
        nama_barang: '',
        kode: '',
        tanggal: '',
        jenis: '',
        jumlah: '',
        kondisi: '',


    });
    const modalRef = useRef(null);
    const editmodalRef = useRef(null);

    const openModal = () => {
        modalRef.current.showModal();
        reset();
    }

    return (
        <AdminLayout>
            <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                    <div class="card-body">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <h2 class="card-title">Data Inventaris</h2>
                            <div class="flex gap-2">
                                <button className="btn btn-success" onClick={openModal}>
                                    <i className="fas fa-plus"></i>
                                    Tambah data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
