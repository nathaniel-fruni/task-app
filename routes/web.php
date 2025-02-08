<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home');

Route::get('/tasks', function () {
    return Inertia::render('Tasks');
});
