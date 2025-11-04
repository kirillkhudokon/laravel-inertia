<?php

use App\Http\Controllers\General;
use Illuminate\Support\Facades\Route;

Route::get('/', [ General::class, 'home' ]);
Route::get('/other', [ General::class, 'other' ]);
