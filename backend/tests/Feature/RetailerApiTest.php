<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RetailerApiTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_retailer_catalog_is_available_with_service_token(): void
    {
        $this->withHeader('Authorization', 'Bearer clickmaart-admin-demo-token')
            ->getJson('/api/v1/retailer/catalog')
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'data' => [
                    'records' => [
                        '*' => [
                            'id',
                            'name',
                            'category',
                            'storeName',
                            'wholesalePrice',
                            'sellingPrice',
                            'margin',
                            'stock',
                            'status',
                            'updatedAt',
                        ],
                    ],
                ],
            ]);
    }
}
