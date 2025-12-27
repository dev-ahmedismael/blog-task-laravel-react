<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Middleware\AttachJWTFromCookie;
use Illuminate\Support\Facades\Route;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

// Authentication
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->middleware(AttachJWTFromCookie::class)->group(function () {
    Route::get('/profile-pics/{mediaId}', function ($mediaId) {
        $media = Media::findOrFail($mediaId);

        return response()->file($media->getPath());
    })->name('profile.pic');

    // Authentication
    Route::get('me', [AuthController::class, 'me']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Posts
    Route::get('posts/me', [PostController::class, 'me']);
    Route::apiResource('posts', PostController::class);
    Route::get('posts/{post}/comments', [PostController::class, 'comments']);

    // Comments
    Route::apiResource('comments', CommentController::class);
});
