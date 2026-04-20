import { useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login Admin
                </h2>
                {errors.email == null ? (
                    <>
                        <div className="text-center mb-4 text-gray-400">
                            Masukan Email dan Password anda dengan benar
                        </div>
                    </>
                ) : (
                    ""
                )}

                <div className="text-center mb-4">
                    {errors.email && (
                        <alert className="alert alert-error text-white text-sm">
                            {errors.email}
                        </alert>
                    )}
                </div>
                {/* Form */}
                <form onSubmit={submit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        {processing ? "Loading..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                {/* <div className="my-4 flex items-center">
                    <div className="flex-1 border-t"></div>
                    <span className="px-2 text-gray-400 text-sm">atau</span>
                    <div className="flex-1 border-t"></div>
                </div> */}

                {/* Login Google */}
            </div>
        </div>
    );
}
