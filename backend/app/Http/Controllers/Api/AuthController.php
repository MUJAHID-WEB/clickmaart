<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends ApiController
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'identifier' => ['required', 'string'],
            'password' => ['required', 'string'],
            'role' => ['nullable', Rule::in(['admin', 'wholesaler', 'retailer', 'customer'])],
        ]);

        $user = User::query()
            ->when($data['role'] ?? null, fn ($query, $role) => $query->where('role', $role))
            ->where(function ($query) use ($data): void {
                $query
                    ->where('email', $data['identifier'])
                    ->orWhere('phone', $data['identifier'])
                    ->orWhere('business_name', $data['identifier']);
            })
            ->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return $this->failure('Invalid credentials.', 401);
        }

        $token = Str::random(60);
        $user->forceFill([
            'api_token' => $token,
            'last_active_label' => 'Just now',
        ])->save();

        return $this->success([
            'token' => $token,
            'user' => $this->authUserPayload($user),
            'approvalStatus' => $user->status,
        ], 'Login successful.');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'role' => ['required', Rule::in(['wholesaler', 'retailer', 'customer'])],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'password' => ['required', 'string', 'min:8'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'business_type' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
        ]);

        $nextId = User::query()->count() + 1000;
        $user = User::query()->create([
            'external_id' => match ($data['role']) {
                'wholesaler' => "wh-{$nextId}",
                'retailer' => "rt-{$nextId}",
                default => "cu-{$nextId}",
            },
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'role' => $data['role'],
            'business_name' => $data['business_name'] ?? $data['name'],
            'business_type' => $data['business_type'] ?? null,
            'address' => $data['address'] ?? null,
            'status' => $data['role'] === 'customer' ? 'approved' : 'pending',
            'password' => $data['password'],
            'otp_code' => '123456',
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        return $this->success([
            'user' => $this->authUserPayload($user),
            'nextStep' => 'verify-otp',
            'otpHint' => 'Use 123456 in the local development environment.',
        ], 'Registration successful.', 201);
    }

    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'identifier' => ['required', 'string'],
            'otp' => ['required', 'string', 'size:6'],
        ]);

        $user = User::query()
            ->where('email', $data['identifier'])
            ->orWhere('phone', $data['identifier'])
            ->first();

        if (! $user || $user->otp_code !== $data['otp']) {
            return $this->failure('Invalid OTP.', 422);
        }

        $user->forceFill([
            'email_verified_at' => now(),
            'otp_code' => null,
            'otp_expires_at' => null,
        ])->save();

        return $this->success([
            'user' => $this->authUserPayload($user),
            'approvalStatus' => $user->status,
        ], 'OTP verified.');
    }

    public function resendOtp(Request $request)
    {
        $data = $request->validate([
            'identifier' => ['required', 'string'],
        ]);

        $user = User::query()
            ->where('email', $data['identifier'])
            ->orWhere('phone', $data['identifier'])
            ->first();

        if (! $user) {
            return $this->failure('Account not found.', 404);
        }

        $user->forceFill([
            'otp_code' => '123456',
            'otp_expires_at' => now()->addMinutes(10),
        ])->save();

        return $this->success([
            'identifier' => $data['identifier'],
            'otpHint' => 'Use 123456 in the local development environment.',
        ], 'OTP reissued.');
    }

    public function forgotPassword(Request $request)
    {
        $data = $request->validate([
            'identifier' => ['required', 'string'],
        ]);

        $user = User::query()
            ->where('email', $data['identifier'])
            ->orWhere('phone', $data['identifier'])
            ->first();

        if (! $user) {
            return $this->failure('Account not found.', 404);
        }

        return $this->success([
            'identifier' => $data['identifier'],
            'resetWindow' => '15 minutes',
        ], 'Password reset instructions generated.');
    }

    public function me(Request $request)
    {
        return $this->success([
            'user' => $this->authUserPayload($request->user()),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->forceFill(['api_token' => null])->save();

        return $this->success([], 'Logged out.');
    }

    private function authUserPayload(User $user): array
    {
        return [
            'id' => $user->external_id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->role,
            'businessName' => $user->business_name,
            'status' => $user->status,
            'isApproved' => $user->isApproved(),
        ];
    }
}
