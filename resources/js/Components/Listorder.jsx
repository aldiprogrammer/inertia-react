import { router } from '@inertiajs/react'
import React from 'react'

export default function Listorder({ list }) {
    const hapus = (id) => {
        if (confirm('Yakin ingin menghapus ?')) {
            router.delete('/hapuslistorder/' + id, {
                onSuccess: () => {
                    alert('data berhasil di hapus');
                }
            })
        }
    }

    const tambahqty = (id) => {
        router.put('/tambahqty/' + id, {
            onSuccess: (res) => {
                console.log(res);

            }
        })
    }

    const kurangqty = (id) => {
        router.put('/kurangqty/' + id, {
            onSuccess: (res) => {
                console.log(res);

            }
        })
    }
    return (
        <div>
            {list.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-3 transition hover:shadow-md"
                >
                    <img
                        src={`/storage/${item.listproduk.gambar}`}
                        alt={item.produk}
                        className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                        <h3 className="line-clamp-1 text-base font-semibold">
                            {item.produk}
                        </h3>
                        <p className="mt-1 text-sm text-primary font-bold">
                            Rp {item.harga.toLocaleString('id-ID')}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                            <button className="btn btn-circle btn-sm btn-outline" disabled={item.qty == 1} onClick={() => kurangqty(item.id)}>
                                -
                            </button>

                            <span className="min-w-[32px] text-center text-sm font-semibold">
                                {item.qty}
                            </span>

                            <button className="btn btn-circle btn-sm btn-success" onClick={() => tambahqty(item.id)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <p className="text-right text-sm font-bold">
                            Rp{' '}
                            {(item.total_harga).toLocaleString(
                                'id-ID'
                            )}
                        </p>

                        <button className="btn btn-circle btn-sm btn-error btn-outline" onClick={() => hapus(item.id)}>
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
