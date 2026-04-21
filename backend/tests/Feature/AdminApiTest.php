<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_admin_dashboard_is_protected_and_available_with_token(): void
    {
        $this->getJson('/api/v1/admin/dashboard')->assertUnauthorized();

        $loginResponse = $this->postJson('/api/v1/auth/login', [
            'identifier' => 'admin@clickmaart.com',
            'password' => 'Admin@123',
            'role' => 'admin',
        ]);

        $token = $loginResponse->json('data.token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/v1/admin/dashboard')
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'summary' => [
                        'pendingWholesalers',
                        'pendingRetailers',
                        'pendingProducts',
                        'activeOrders',
                        'liveStores',
                    ],
                    'recentActivities',
                ],
            ]);
    }

    public function test_admin_dashboard_is_available_with_service_token(): void
    {
        $this->withHeader('Authorization', 'Bearer clickmaart-admin-demo-token')
            ->getJson('/api/v1/admin/dashboard')
            ->assertOk()
            ->assertJsonPath('data.summary.liveStores', 4);
    }
}
