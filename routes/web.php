<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home');

Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::put('/tasks/{id}', [TaskController::class, 'update'])->name('tasks.update');
Route::patch('/tasks/{id}', [TaskController::class, 'updateCompletion'])->name('tasks.updateCompletion');
Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy');
