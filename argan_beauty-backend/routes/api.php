<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

require __DIR__.'/auth.php';

// Product related endpoints
Route::apiResource('produits', App\Http\Controllers\ProduitController::class);
Route::apiResource('categories', App\Http\Controllers\CategoryController::class);

// Cart related endpoints
Route::apiResource('carts', App\Http\Controllers\CartController::class);
Route::apiResource('cart-items', App\Http\Controllers\CartItemController::class);

// User related endpoints
Route::apiResource('users', App\Http\Controllers\UserController::class);
Route::apiResource('profile', App\Http\Controllers\ProfileController::class)->only(['show', 'update']);

// Admin related endpoints
Route::apiResource('admins', App\Http\Controllers\AdminController::class);

// Producer related endpoints
Route::apiResource('producteurs', App\Http\Controllers\ProducteurController::class);

// Custom endpoints for specific operations
// Products by category
Route::get('categories/{id}/produits', [App\Http\Controllers\CategoryController::class, 'produits']);

// User cart management
Route::get('users/{id}/cart', [App\Http\Controllers\CartController::class, 'getUserCart']);

// Producteur products
Route::get('producteurs/{id}/produits', [App\Http\Controllers\ProducteurController::class, 'produits']);

// Search endpoints
Route::get('search/produits', [App\Http\Controllers\ProduitController::class, 'search']);
Route::get('search/categories', [App\Http\Controllers\CategoryController::class, 'search']);
