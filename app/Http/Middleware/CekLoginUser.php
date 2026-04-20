<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CekLoginUser
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // cek sudah login atau belum
        if (!Auth::check()) {
            return redirect('/');
        }

        // cek apakah login dari google
        if (!Auth::user()->google_id) {
            return redirect('/')->with('error', 'Akses hanya untuk login Google');
        }

        return $next($request);
    }
}
