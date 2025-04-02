<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SimpleUserController;
use App\Http\Controllers\ComplexUserController;
use App\Http\Controllers\VisitorController;

// ✅ Routes accessibles UNIQUEMENT aux administrateurs
Route::middleware(['check.role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/users', [AdminController::class, 'manageUsers']);
});

// ✅ Routes pour les utilisateurs "complexes" et "administrateurs"
Route::middleware(['check.role:complexe|admin'])->group(function () {
    Route::get('/complexe/dashboard', [ComplexUserController::class, 'dashboard']);
});

// ✅ Routes pour les utilisateurs "simples", "complexes" et "administrateurs"
Route::middleware(['check.role:simple|complexe|admin'])->group(function () {
    Route::get('/simple/dashboard', [SimpleUserController::class, 'dashboard']);
});

// ✅ Routes accessibles à TOUS (y compris les visiteurs non connectés)
Route::get('/', [VisitorController::class, 'welcome']);
Route::get('/contact', [VisitorController::class, 'contact']);

Route::get('/no-access', function () {
    return view('no-access');
});