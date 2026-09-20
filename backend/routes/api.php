<?php

use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\ContentApiController;
use App\Http\Controllers\Api\HomepageApiController;
use App\Http\Controllers\Api\InquiryApiController;
use App\Http\Controllers\Api\PackageApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Packages
    Route::get('/packages', [PackageApiController::class, 'index']);
    Route::get('/packages/{slug}', [PackageApiController::class, 'show']);

    // Homepage Content & Sections
    Route::get('/homepage', [HomepageApiController::class, 'index']);

    // Content & Taxonomy
    Route::get('/destinations', [ContentApiController::class, 'destinations']);
    Route::get('/reviews', [ContentApiController::class, 'reviews']);
    Route::get('/team', [ContentApiController::class, 'team']);
    Route::get('/galleries', [ContentApiController::class, 'galleries']);
    Route::get('/guides', [ContentApiController::class, 'guides']);

    // Transactions / Submissions
    Route::post('/bookings', [BookingApiController::class, 'store']);
    Route::post('/inquiries', [InquiryApiController::class, 'store']);
});
