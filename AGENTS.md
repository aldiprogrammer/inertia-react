# APPPOS — Laravel + Inertia + React POS

## Stack
- Laravel 13 + Inertia.js v2 + React 18 + Vite 8
- Tailwind CSS 3 + DaisyUI 4 (loaded via CDN in `resources/views/app.blade.php`)
- MySQL (`dbs_kasir` per `.env`), queue via database, cache + session via database
- Pusher for realtime (Laravel Echo), Google OAuth (Socialite)

## Key commands
| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Vite production build |
| `composer dev` | Runs `php artisan serve` + queue:listen + pail + Vite concurrently |
| `composer test` | `config:clear` then `php artisan test` |
| `composer setup` | Full install: composer, .env, key:generate, migrate, npm install, build |

## Architecture
- **Frontend entry:** `resources/js/app.jsx` — resolves Inertia pages from `./Pages/{name}.jsx`
- **Blade root:** `resources/views/app.blade.php` — loads DaisyUI, Tailwind, jQuery, DataTables, SweetAlert2, FontAwesome, Leaflet, OneSignal via CDN
- **Routes:** `routes/web.php` + `routes/auth.php`. Two guard groups:
  - `CekLoginAdmin` middleware — session-based (`session('email')`), for `/admin/*` and `/dashboard`, `/kategori`, etc.
  - `CekLoginUser` middleware — checks `Auth::check()` **and** `Auth::user()->google_id` (blocks non-Google logins), for `/app/*`
  - Unauthenticated: `/` (app login), `/admin/login` (admin login)
- **JS path aliases** (jsconfig.json): `@/` → `resources/js/`, `ziggy-js` → vendor
- **Inertia shared props** (`HandleInertiaRequests`): `auth.user`, `flash.success`, `session.{username,role}`, `orderuser.order`

## Testing
- **PHPUnit** (not Pest). Config: `phpunit.xml` — SQLite `:memory:` in tests
- Unit: `tests/Unit/`. Feature: `tests/Feature/`
- Run single test: `php artisan test --filter=TestName` or `vendor/bin/phpunit tests/Feature/SomeTest.php`

## Code quality
- **Laravel Pint** (`vendor/bin/pint`) for PHP CS fixer. No config file — uses defaults.
- No JS lint/formatter configured in package.json.

## Notable quirks
- Admin auth is **session-based** (`CekLoginAdmin` reads `session('email')`), not Laravel's default `auth` guard
- `CekLoginUser` **requires** `google_id` on the User model — users without Google login are rejected from `/app/*`
- `composer dev` uses `npx concurrently`; Vite runs alongside Artisan server, queue listener, and `pail` log watcher
- The `RoleMiddleware` exists but is a no-op (empty handle body)
- Tailwind config scans `vendor`, `storage/framework/views`, `resources/views`, and `resources/js/**/*.jsx`
- .env contains live Google OAuth keys — do not commit

## DataTables
- **jQuery DataTables v1.13.6** with **Buttons v2.4.2** loaded via CDN in `app.blade.php`
- Auto-initialized in `AdminLayout.jsx` on any `<table id="myTable">` whenever the route changes (`usePage().url` dependency)
- Buttons: Copy, CSV, Excel, PDF (export all pages), Print — PDF filename derived from `.card-title` text
- Language: Indonesian (`cdn.datatables.net/plug-ins/.../i18n/id.json`)
- Existing pages with `id="myTable"` get DataTables automatically without per-page changes
- Pages WITHOUT tables (Login, Kasir, Testprint, Pesan, Dashboard) are unaffected
