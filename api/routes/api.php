<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\LieuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource("categories", CategorieController::class)->parameters(['categories' => 'categorie']);
Route::apiResource("lieux", LieuController::class)->parameters(['lieux' => 'lieu']);
Route::apiResource("articles", ArticleController::class);