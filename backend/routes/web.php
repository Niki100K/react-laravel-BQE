<?php

use App\Http\Controllers\QrCodeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [QrCodeController::class, 'generateQRCode']);
