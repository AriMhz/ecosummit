# EcoSummit Admin Panel & API — Deployment Guide for Nest Nepal / Cloud Babal Host (cPanel)

This guide provides step-by-step instructions to deploy the **Laravel Filament Admin Panel** and **React Frontend** to your shared hosting account on **Nest Nepal / Babal Host** with `admin.yourdomain.com`.

---

## 1. Architecture Overview on cPanel

| Component | Target URL | cPanel Location | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Website** | `https://yourdomain.com` | `public_html/` | Fast React SPA |
| **Admin Panel** | `https://admin.yourdomain.com` | `subdomains/admin/` or `laravel/public/` | Filament v3 CMS |
| **REST API** | `https://admin.yourdomain.com/api/v1` | Handled by Laravel routes | Data sync & forms |

---

## 2. Step 1: Create MySQL Database in cPanel

1. Log into your **cPanel** (Nest Nepal / Babal Host).
2. Open **"MySQL® Database Wizard"**:
   - **Step 1: Create A Database**: e.g., `youruser_ecosummit`
   - **Step 2: Create Database User**: e.g., `youruser_admin` + strong password.
   - **Step 3: Add User to Database**: Check **"ALL PRIVILEGES"** and click **"Make Changes"**.
3. Note your Database Name, User, and Password.

---

## 3. Step 2: Set Up the Subdomain (`admin.yourdomain.com`)

1. In cPanel, navigate to **"Domains"** or **"Subdomains"**.
2. Create subdomain:
   - **Subdomain**: `admin`
   - **Domain**: `yourdomain.com`
   - **Document Root**: Set it to `laravel/public` (Important: points to Laravel's `public` directory, not the root!).

---

## 4. Step 3: Upload Backend to cPanel

1. On your local machine, zip the `backend` folder (excluding `node_modules` and `.git`).
2. In cPanel **File Manager**, upload the zip file to the root directory (outside `public_html`, e.g., `/home/youruser/laravel`).
3. Extract the archive.
4. Ensure the `.env` file exists inside `/home/youruser/laravel/`.

---

## 5. Step 4: Configure `.env` on cPanel

Open `.env` in cPanel File Manager Code Editor and update:

```ini
APP_NAME=EcoSummit
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY
APP_DEBUG=false
APP_URL=https://admin.yourdomain.com

FILAMENT_DOMAIN=admin.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=youruser_ecosummit
DB_USERNAME=youruser_admin
DB_PASSWORD=YourStrongPasswordHere

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

# Enable CORS for your main website domain
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,admin.yourdomain.com
```

---

## 6. Step 5: Run Migrations & Seeders

You can run this either via **cPanel Terminal** or **phpMyAdmin**:

### Option A: Via cPanel Terminal (Recommended)
Open **Terminal** in cPanel and run:
```bash
cd /home/youruser/laravel
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan filament:optimize
```

### Option B: If Terminal is not enabled on your plan
You can export the local SQLite / MySQL database or use phpMyAdmin:
- Log in to `phpMyAdmin` from cPanel.
- Select your database `youruser_ecosummit`.
- Click **"Import"** and upload the SQL dump.

---

## 7. Step 6: Storage Link for Uploaded Images

In shared hosting where SSH symlinks might be restricted, Laravel supports linking via:
1. In cPanel Terminal: `php artisan storage:link`
2. OR create a temporary route in `routes/web.php`:
```php
Route::get('/link-storage', function () {
    Artisan::call('storage:link');
    return 'Storage linked successfully!';
});
```
Visit `https://admin.yourdomain.com/link-storage` once, then remove the route.

---

## 8. Step 7: Connect React Frontend to Production API

1. In your local React codebase, edit `.env.production`:
```ini
VITE_API_BASE_URL=https://admin.yourdomain.com/api/v1
```
2. Build the production bundle:
```bash
npm run build
```
3. Upload the contents of the `dist/` directory directly into your cPanel `public_html/`.
4. Ensure `public_html/.htaccess` contains SPA rewrites:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 9. Admin Credentials

- **Admin Login URL**: `https://admin.yourdomain.com/admin` (or `https://yourdomain.com/admin`)
- **Default Email**: `admin@ecosummitnepal.com`
- **Default Password**: `EcoSummit@2026!`

*(You can update your email and password immediately after logging in by clicking your user profile avatar in the bottom-left / top-right of the admin panel).*
