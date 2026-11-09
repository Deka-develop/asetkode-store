@echo off
title Deploy AsetKode Storefront ke GitHub Pages
cd /d "%~dp0"
echo ============================================================================
echo   DEPLOY OTOMATIS ASETKODE PRO STOREFRONT KE GITHUB PAGES
echo ============================================================================
echo.
echo Pastikan Anda sudah membuat repository kosong di GitHub
echo (Contoh: https://github.com/username-anda/asetkode-store.git)
echo.
set /p REPO_URL="Masukkan URL Repository GitHub Anda (lalu tekan Enter): "

if "%REPO_URL%"=="" (
  echo [!] URL Repository tidak boleh kosong.
  pause
  exit /b
)

echo.
echo [1/4] Menginisialisasi Git di folder github-storefront...
git init
git branch -M main

echo [2/4] Menambahkan seluruh file storefront (index.html, styles.css, app.js)...
git add index.html styles.css app.js PANDUAN-KOLABORASI-GITHUB-BLOGGER.md
git commit -m "Deploy AsetKode Pro Headless Storefront (Synced with Blogger Cloud API)"

echo [3/4] Menghubungkan ke repository %REPO_URL%...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo [4/4] Mengunggah (Push) ke GitHub...
git push -u origin main --force

echo.
echo ============================================================================
echo   BERHASIL DI-UPLOAD KE GITHUB!
echo   Langkah Terakhir:
echo   1. Buka repository Anda di GitHub -> klik menu "Settings" -> "Pages"
echo   2. Pada bagian "Branch", pilih "main" dan "/ (root)" lalu klik "Save"
echo   3. Dalam 1 menit, web jualan Anda akan live di:
echo      https://username-anda.github.io/nama-repo/
echo ============================================================================
pause

