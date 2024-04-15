<?php

use App\Http\Controllers\UserController;
use App\Models\RequestRegisterModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('requests', function () {
        $request = RequestRegisterModel::all();
        return response()->json($request);
    });
    Route::put('update', [UserController::class, 'update']);
});