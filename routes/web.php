<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\InventarisController;
use App\Http\Controllers\admin\KasirController;
use App\Http\Controllers\admin\KategoriController;
use App\Http\Controllers\admin\KeranjangController;
use App\Http\Controllers\admin\LoginController as AdminLoginController;
use App\Http\Controllers\admin\MejaController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\PegawaiController;
use App\Http\Controllers\admin\PenggunaController;
use App\Http\Controllers\admin\PenjualanController;
use App\Http\Controllers\admin\PotonganMemberController;
use App\Http\Controllers\admin\ProdukController;
use App\Http\Controllers\app\GoogleController;
use App\Http\Controllers\app\HomeController;
use App\Http\Controllers\app\KeranjangController as AppKeranjangController;
use App\Http\Controllers\app\LoginController;
use App\Http\Controllers\app\MenuController;
use App\Http\Controllers\app\PesananandaController;
use App\Http\Controllers\app\ProfilController;
use App\Http\Controllers\app\SuksesController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CekLoginAdmin;
use App\Http\Middleware\CekLoginUser;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use PhpParser\Node\Expr\FuncCall;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/About', [AboutController::class, 'index'])->middleware(['auth', 'verified'])->name('about');

// Route::get('/admin', function () {
//     return Inertia::render('Admin/Home');
// })->middleware(['auth', 'verified'])->name('admin');

Route::get('/admin/login', [AdminLoginController::class, 'index'])->name('loginadmin');
Route::post('/admin/login', [AdminLoginController::class, 'auth'])->name('atuhadmin');
Route::get('/admin/logout', [AdminLoginController::class, 'logout'])->name('logoutadmin');

Route::middleware([CekLoginAdmin::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/kategori', [KategoriController::class, 'index'])->name('kategori');
    Route::post('/addkategori', [KategoriController::class, 'store'])->name('kategori.store');
    Route::delete('/kategori/{id}', [KategoriController::class, 'delete'])->name('kategori.delete');
    Route::patch('/editkategori/{id}', [KategoriController::class, 'update'])->name('kategori.update');

    Route::get('/pegawai', [PegawaiController::class, 'index'])->name('pegawai');
    Route::post('/addpegawai', [PegawaiController::class, 'store'])->name('pegawai.store');
    Route::delete('/hapuspegawai/{id}', [PegawaiController::class, 'delete'])->name('pegawai.delete');
    Route::patch('/editpegawai/{id}', [PegawaiController::class, 'update'])->name('pegawai.update');

    Route::get('/meja', [MejaController::class, 'index'])->name('meja');
    Route::post('/addmeja', [MejaController::class, 'store'])->name('meja.store');
    Route::delete('/hapusmeja/{id}', [MejaController::class, 'delete'])->name('meja.delete');
    Route::patch('/editmeja/{id}', [MejaController::class, 'update'])->name('meja.update');

    Route::get('/produk', [ProdukController::class, 'index'])->name('produk');
    Route::post('/addproduk', [ProdukController::class, 'store'])->name('produk.store');
    Route::delete('/hapusproduk/{id}', [ProdukController::class, 'delete'])->name('produk.delete');
    Route::post('/editproduk/{id}', [ProdukController::class, 'update'])->name('produk.update');
    Route::patch('/updatestatus/{id}', [ProdukController::class, 'updatestatus'])->name('produk.status');

    Route::get('/inventaris', [InventarisController::class, 'index'])->name('inventaris');
    Route::post('/addinventaris', [InventarisController::class, 'store'])->name('inventaris.store');
    Route::patch('/editinventaris/{id}', [InventarisController::class, 'update'])->name('inventaris.update');
    Route::delete('/hapusinventaris/{id}', [InventarisController::class, 'delete'])->name('inventaris.delete');

    Route::get('/member', [MemberController::class, 'index'])->name('member');
    Route::post('/addmember', [MemberController::class, 'store'])->name('member.store');
    Route::patch('/editmember/{id}', [MemberController::class, 'update'])->name('member.update');
    Route::delete('/hapusmember/{id}', [MemberController::class, 'delete'])->name('member.delete');
    Route::patch('/statusmember/{id}', [MemberController::class, 'status'])->name('member.status');

    Route::get('/pengguna', [PenggunaController::class, 'index'])->name('pengguna');
    Route::post('/addpengguna', [PenggunaController::class, 'store'])->name('pengguna.store');
    Route::patch('/editpengguna/{id}', [PenggunaController::class, 'update'])->name('pengguna.update');
    Route::delete('/hapuspengguna/{id}', [PenggunaController::class, 'delete'])->name('pengguna.delete');
    Route::patch('/statuspengguna/{id}', [PenggunaController::class, 'status'])->name('pengguna.status');

    Route::get('/kasir', [KasirController::class, 'index'])->name('kasir');
    Route::post('/addkeranjang', [KeranjangController::class, 'store'])->name('keranjang.store');
    Route::delete('/hapuslistorder/{id}', [KeranjangController::class, 'delete'])->name('keranjang.delete');
    Route::put('/tambahqty/{id}', [KeranjangController::class, 'tambahqty'])->name('keranjang.tambahqty');
    Route::put('/kurangqty/{id}', [KeranjangController::class, 'kurangqty'])->name('keranjang.kurangqty');
    Route::get('/cekmember/{kode}', [KeranjangController::class, 'cekmember'])->name('keranjang.cekmember');
    Route::get('/cekdiskonmember', [KeranjangController::class, 'cekdiskonmember'])->name('keranjang.cekdiskon');
    Route::post('/addorder', [KeranjangController::class, 'addorder'])->name('keranjang.addorder');

    Route::get('/potongan', [PotonganMemberController::class, 'index'])->name('potongan');
    Route::post('/addpotongan', [PotonganMemberController::class, 'store'])->name('potongan.store');
    Route::patch('/editpotongan/{id}', [PotonganMemberController::class, 'update'])->name('potongan.update');
    Route::delete('/hapuspotongan/{id}', [PotonganMemberController::class, 'delete'])->name('potongan.delete');
    Route::patch('/statuspotongan/{id}', [PotonganMemberController::class, 'status'])->name('potongan.status');

    Route::get('/penjualan', [PenjualanController::class, 'index'])->name('penjualan');
    Route::delete('/hapuspenjualan', [PenjualanController::class, 'delete'])->name('penjualan.delete');
    Route::get('/detailpenjualan/{kode}', [PenjualanController::class, 'detail'])->name('penjualan.detail');
    Route::delete('/hapusdetailorder/{id}', [PenjualanController::class, 'hapusdetail'])->name('penjualan.deletedetail');
    Route::delete('/hapusorder/{kode}', [PenjualanController::class, 'hapusorder'])->name('penjualan.deletorder');
    Route::get('/penjualanhariini', [PenjualanController::class, 'penjualanhariini'])->name('penjualanhariini');
    Route::get('/testprint', [PenjualanController::class, 'testprint'])->name('testprint');
});



Route::middleware([CekLoginUser::class])->group(function () {
    Route::get('/app', [HomeController::class, 'index'])->name('app');
    Route::get('/menu/{menu}', [MenuController::class, 'index'])->name('menu');
    Route::post('/addkeranjanguser', [AppKeranjangController::class, 'store'])->name('addkeranjanguser');
    Route::get('/keranjanguser/{kodeorder}', [AppKeranjangController::class, 'index'])->name('datakeranjanguser');
    Route::delete('/hapuslistorderuser/{id}', [AppKeranjangController::class, 'delete'])->name('hapuslistorderuser');
    Route::put('/tambahqtyuser/{id}', [AppKeranjangController::class, 'tambahqty'])->name('tambahqtyuser');
    Route::put('/kurangqtyuser/{id}', [AppKeranjangController::class, 'kurangqty'])->name('kurangqtyuser');

    Route::post('/addorderuser', [AppKeranjangController::class, 'addorder'])->name('addroderuser');
    Route::get('/sukses', [SuksesController::class, 'index'])->name('sukses');
    Route::get('/pesanananda', [PesananandaController::class, 'index'])->name('pesanananda');
    Route::get('/pesanananda/{tgl}', [PesananandaController::class, 'show'])->name('pesanananda.tgl');
    Route::get('/detailpesanan/{kode}', [PesananandaController::class, 'detail'])->name('detailpesanan');
    Route::get('/profil', [ProfilController::class, 'index'])->name('profilapp');
    Route::post('/profil', [ProfilController::class, 'store'])->name('addprofilapp');
});

Route::get('/', [LoginController::class, 'index'])->name('loginapp');
Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google');
Route::get('/auth/callback', [GoogleController::class, 'callback']);















require __DIR__ . '/auth.php';
