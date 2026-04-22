import echo from "@/echo";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Pesan({ pesan }) {
    const [messages, setMessages] = useState(pesan);
    const [text, setText] = useState("");
    const [user, setUser] = useState("User1");

    const sendMessage = (e) => {
        e.preventDefault();

        router.post("/pesan", {
            user: "0001",
            message: text,
        });

        setText("");
    };

    useEffect(() => {
        echo.channel("chat-channel").listen(".message.sent", (e) => {
            setMessages((prev) => [...prev, e.message]);
        });

        return () => {
            echo.leave("chat-channel");
        };
    }, []);

    return (
        <>
            <AdminLayout>
                <div class="grid grid-cols-1 xl:grid-cols-1 gap-">
                    <div class="xl:col-span-2 card bg-base-100 shadow-md border border-base-300">
                        <div class="card-body">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h2 class="card-title">Pesan</h2>
                            </div>

                            {messages.map((m, i) => (
                                <div key={i}>
                                    <b>{m.user}:</b> {m.message}
                                </div>
                            ))}

                            <form onSubmit={sendMessage}>
                                <label className="form-control w-full mt-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Pesan
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="pesan"
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        className="input input-bordered input-success w-full"
                                        required
                                    />
                                </label>

                                <button className="btn btn-primary">
                                    Kirim
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
