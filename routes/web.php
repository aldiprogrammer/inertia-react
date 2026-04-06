<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\admin\KategoriController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/About', [AboutController::class, 'index'])->middleware(['auth', 'verified'])->name('about');

Route::get('/admin', function () {
    return Inertia::render('Admin/Home');
})->middleware(['auth', 'verified'])->name('admin');

Route::get('/kategori', [KategoriController::class, 'index'])->middleware(['auth', 'verified'])->name('kategori');
Route::post('/addkategori', [KategoriController::class, 'store'])->middleware(['auth', 'verified'])->name('kategor.store');
Route::post('/kategori/{id}', [KategoriController::class, 'delete'])->middleware(['auth', 'verified'])->name('kategori.delete');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';