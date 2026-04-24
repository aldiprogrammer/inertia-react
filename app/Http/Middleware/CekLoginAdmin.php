<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CekLoginAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next,  ...$roles): Response
    {
        if (!session()->has('email')) {
            return redirect('/admin/login')->with('error', 'Silakan login dulu');
        }

        // ambil role dari session
        $userRole = session('role');

        // cek role
        if (!empty($roles)) {
            if (!in_array($userRole, $roles)) {
                abort(403);
            }
        }
        return $next($request);
    }
}
