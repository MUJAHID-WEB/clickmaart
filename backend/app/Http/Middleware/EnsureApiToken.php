<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureApiToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        $serviceToken = env('CLICKMAART_ADMIN_API_TOKEN', 'clickmaart-admin-demo-token');

        if (! $token) {
            return response()->json([
                'success' => false,
                'message' => 'Missing bearer token.',
            ], 401);
        }

        $user = User::query()->where('api_token', $token)->first();

        if (! $user && $token === $serviceToken) {
            $user = User::query()->where('role', 'admin')->first();
        }

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired token.',
            ], 401);
        }

        $request->setUserResolver(static fn () => $user);

        return $next($request);
    }
}
