<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\LieuController;
use App\Http\Controllers\UserController;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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

Route::post('login', [AuthController::class, 'login']);

Route::get('blogs', [ArticleController::class, 'index']);
Route::get('blog/{slug}', [ArticleController::class, 'getArticle']);
Route::get('home', [LieuController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [UserController::class, 'user']);
    
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource("categories", CategorieController::class)->parameters(['categories' => 'categorie']);
    Route::apiResource("lieux", LieuController::class)->parameters(['lieux' => 'lieu']);
    Route::post('lieux/{lieu}', [LieuController::class, 'update'])->name('lieux.update');
    Route::apiResource("articles", ArticleController::class);
    Route::apiResource("users", UserController::class);
});