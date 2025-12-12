<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PostController::class, 'index'])->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/my-posts', [PostController::class, 'myPosts'])->name('posts.my');
    
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::get('/api/tags/search', [TagController::class, 'search'])->name('tags.search');
        
    Route::post('/api/images/upload', [ImageController::class, 'upload'])->name('images.upload');
    Route::delete('/api/images/{modelType}/{modelId}', [ImageController::class, 'delete'])->name('images.delete');
});

Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/tags/{tag}', [PostController::class, 'byTag'])->name('posts.by-tag');

Route::fallback(function () {
    return \Inertia\Inertia::render('Errors/NotFound');
});


