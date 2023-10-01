<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\DB;

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

Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks/create', [TaskController::class, 'create']);
Route::patch('/tasks/delete/{id}', [TaskController::class, 'destroy']);
Route::patch('/tasks/update/{id}', [TaskController::class, 'update']);
Route::patch('/tasks/like/{id}', [TaskController::class, 'like']);