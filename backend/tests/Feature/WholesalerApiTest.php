<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WholesalerApiTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_wholesaler_dashboard_is_available_with_service_token(): void
    {
        $this->withHeader('Authorization', 'Bearer clickmaart-admin-demo-token')
            ->getJson('/api/v1/wholesaler/dashboard')
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'summary' => [
                        'pendingProducts',
                        'approvedProducts',
                        'pendingOrders',
                        'withdrawablePayouts',
                    ],
                    'salesWindows',
                    'topProducts',
                    'recentActivities',
                ],
            ]);
    }
}
