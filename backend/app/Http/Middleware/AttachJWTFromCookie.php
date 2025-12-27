<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AttachJWTFromCookie
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('access_token');

        if (!$token) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        $request->headers->set('Authorization', 'Bearer ' . $token);

        return $next($request);
    }
}
