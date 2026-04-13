import AdminLayout from '@/Layouts/AdminLayout'
import React, { useState } from 'react'

export default function Testprint() {
    const [loading, setLoading] = useState(false);

    const handlePrint = async () => {
        try {
            setLoading(true);

            if (!navigator.bluetooth) {
                throw new Error("Browser tidak support Bluetooth");
            }

            // 1. PILIH DEVICE
            const device = await navigator.bluetooth.requestDevice({
                filters: [
                    { services: ["000018f0-0000-1000-8000-00805f9b34fb"] }
                ],
                optionalServices: ["000018f0-0000-1000-8000-00805f9b34fb"]
            });

            device.addEventListener("gattserverdisconnected", () => {
                console.log("❌ Device disconnected");
            });

            // 2. CONNECT
            const server = await device.gatt.connect();

            // 3. SERVICE
            const service = await server.getPrimaryService(
                "000018f0-0000-1000-8000-00805f9b34fb"
            );

            // 4. CHARACTERISTIC (SESUI nRF KAMU)
            const characteristic = await service.getCharacteristic(
                "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f"
            );

            // 5. ESC/POS DATA
            const encoder = new TextEncoder();

            const init = new Uint8Array([0x1b, 0x40]);

            const text = encoder.encode(
                "=== TOKO SAYA ===\n" +
                "Jl. Contoh No.123\n" +
                "--------------------------\n" +
                "Nasi Goreng   1 15000\n" +
                "Es Teh        1  5000\n" +
                "--------------------------\n" +
                "TOTAL         20000\n\n" +
                "Terima Kasih\n"
            );

            const feed = new Uint8Array([0x0a, 0x0a, 0x0a]);

            const data = new Uint8Array(init.length + text.length + feed.length);
            data.set(init, 0);
            data.set(text, init.length);
            data.set(feed, init.length + text.length);

            // 6. KIRIM CHUNK
            await sendChunks(characteristic, data);

            alert("✅ Print berhasil");

        } catch (err) {
            console.error(err);
            alert("❌ " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // fungsi chunk
    const sendChunks = async (characteristic, data, size = 100) => {
        for (let i = 0; i < data.length; i += size) {
            const chunk = data.slice(i, i + size);

            // coba tanpa response dulu
            if (characteristic.writeValueWithoutResponse) {
                await characteristic.writeValueWithoutResponse(chunk);
            } else {
                await characteristic.writeValue(chunk);
            }

            // delay kecil biar stabil
            await new Promise((res) => setTimeout(res, 50));
        }
    };
    return (
        <AdminLayout>
            <button className='btn btn-primary' onClick={() => handlePrint()}>Test print</button>
        </AdminLayout>
    )
}
