<?php

use App\Http\Controllers\Api\V1\ContactMessageController;
use App\Http\Controllers\Api\V1\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('portfolio', PortfolioController::class)->name('api.v1.portfolio');

    Route::post('contact', [ContactMessageController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('api.v1.contact.store');
});
