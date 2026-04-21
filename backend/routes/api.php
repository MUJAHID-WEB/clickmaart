<?php

use App\Http\Controllers\Api\AdminApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicApiController;
use App\Http\Controllers\Api\RetailerApiController;
use App\Http\Controllers\Api\WholesalerApiController;
use Illuminate\Support\Facades\Route;

Route::get('/meta', [PublicApiController::class, 'meta']);
Route::get('/storefront/snapshot', [PublicApiController::class, 'storefrontSnapshot']);
Route::get('/storefront/catalog', [PublicApiController::class, 'storefrontCatalog']);
Route::get('/storefront/stores', [PublicApiController::class, 'stores']);
Route::post('/storefront/orders', [PublicApiController::class, 'createStorefrontOrder']);
Route::get('/storefront/orders/{order}', [PublicApiController::class, 'storefrontOrder']);

Route::prefix('auth')->group(function (): void {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

    Route::middleware('clickmaart.token')->group(function (): void {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::prefix('admin')
    ->middleware(['clickmaart.token', 'clickmaart.role:admin'])
    ->group(function (): void {
        Route::get('/dashboard', [AdminApiController::class, 'dashboard']);
        Route::get('/profile', [AdminApiController::class, 'profile']);

        Route::get('/wholesalers', [AdminApiController::class, 'wholesalers']);
        Route::patch('/wholesalers/{user}', [AdminApiController::class, 'updateWholesalerStatus']);

        Route::get('/retailers', [AdminApiController::class, 'retailers']);
        Route::patch('/retailers/{user}', [AdminApiController::class, 'updateRetailerStatus']);

        Route::get('/products', [AdminApiController::class, 'products']);
        Route::patch('/products/{product}', [AdminApiController::class, 'updateProductStatus']);

        Route::get('/orders', [AdminApiController::class, 'orders']);
        Route::get('/orders/{order}', [AdminApiController::class, 'orderDetail']);
        Route::patch('/orders/{order}', [AdminApiController::class, 'updateOrderStage']);

        Route::get('/delivery', [AdminApiController::class, 'delivery']);
        Route::get('/commission', [AdminApiController::class, 'commission']);
        Route::patch('/commission/{settlement}', [AdminApiController::class, 'updateCommissionStatus']);

        Route::get('/reports', [AdminApiController::class, 'reports']);
        Route::post('/reports/export', [AdminApiController::class, 'createExport']);

        Route::get('/stores', [AdminApiController::class, 'stores']);
        Route::get('/stores/{store}', [AdminApiController::class, 'storeDetail']);
        Route::patch('/stores/{store}', [AdminApiController::class, 'updateStoreStatus']);
    });

Route::prefix('wholesaler')
    ->middleware(['clickmaart.token', 'clickmaart.role:wholesaler,admin'])
    ->group(function (): void {
        Route::get('/dashboard', [WholesalerApiController::class, 'dashboard']);
        Route::get('/profile', [WholesalerApiController::class, 'profile']);
        Route::patch('/profile', [WholesalerApiController::class, 'updateProfile']);
        Route::get('/products', [WholesalerApiController::class, 'products']);
        Route::patch('/products/{product}', [WholesalerApiController::class, 'updateProduct']);
        Route::get('/orders', [WholesalerApiController::class, 'orders']);
        Route::get('/payouts', [WholesalerApiController::class, 'payouts']);
        Route::get('/reports', [WholesalerApiController::class, 'reports']);
    });

Route::prefix('retailer')
    ->middleware(['clickmaart.token', 'clickmaart.role:retailer,admin'])
    ->group(function (): void {
        Route::get('/dashboard', [RetailerApiController::class, 'dashboard']);
        Route::get('/profile', [RetailerApiController::class, 'profile']);
        Route::patch('/profile', [RetailerApiController::class, 'updateProfile']);
        Route::get('/catalog', [RetailerApiController::class, 'catalog']);
        Route::patch('/catalog/{product}', [RetailerApiController::class, 'updateCatalog']);
        Route::get('/stores', [RetailerApiController::class, 'stores']);
        Route::patch('/stores/{store}', [RetailerApiController::class, 'updateStore']);
        Route::get('/orders', [RetailerApiController::class, 'orders']);
        Route::get('/payouts', [RetailerApiController::class, 'payouts']);
        Route::get('/reports', [RetailerApiController::class, 'reports']);
    });
