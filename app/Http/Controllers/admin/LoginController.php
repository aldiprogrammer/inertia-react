<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    function index()
    {
        return Inertia::render('Admin/Login');
    }

    function auth(Request $request)
    {
        if (Auth::guard('admin')->attempt([
            'email' => $request->email,
            'password' => $request->password,
        ])) {
            $request->session()->regenerate();
            session([
                'id' => Auth::guard('admin')->user()->id,
                'email' => Auth::guard('admin')->user()->email,
                'username' => Auth::guard('admin')->user()->username,
                'role' => Auth::guard('admin')->user()->role
            ]);
            return redirect('/dashboard');
        }

        return back()->withErrors([
            'email' => 'Login gagal, masukan email & password dengan benar',
        ]);
    }

    function logout(Request $request)
    {

        Auth::guard('admin')->logout();

        // Hapus session
        $request->session()->forget(['id', 'role', 'username', 'email']);
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
