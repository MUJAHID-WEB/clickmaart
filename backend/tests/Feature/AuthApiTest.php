<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_admin_can_log_in_and_fetch_profile(): void
    {
        $loginResponse = $this->postJson('/api/v1/auth/login', [
            'identifier' => 'admin@clickmaart.com',
            'password' => 'Admin@123',
            'role' => 'admin',
        ]);

        $loginResponse
            ->assertOk()
            ->assertJsonPath('data.user.role', 'admin');

        $token = $loginResponse->json('data.token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/auth/me')
            ->assertOk()
            ->assertJsonPath('data.user.email', 'admin@clickmaart.com');
    }
}
