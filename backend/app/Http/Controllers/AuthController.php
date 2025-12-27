<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $userData = $request->validated();

        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($request->password),
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $user->addMedia($image)->toMediaCollection('profile_pics');
        }

        $token = Auth::login($user);

        return $this->respondWithToken($token);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return new UserResource(Auth::user());
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out'])->withoutCookie('access_token');
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token)
    {
        $cookie = cookie(
            'access_token',
            $token,
            60 * 24 * 7,
            '/',
            null,
            app()->environment('production'),
            true,
            false,
            'Strict'
        );

        return response()->json([
            'message' => 'Logged in successfully',
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
        ])->withCookie($cookie);
    }
}
