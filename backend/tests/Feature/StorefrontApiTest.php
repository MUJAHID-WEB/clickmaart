<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StorefrontApiTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_storefront_snapshot_returns_retailer_preview_context(): void
    {
        $this->getJson('/api/v1/storefront/snapshot?surface=retailer-store&tenantKey=tech-haven')
            ->assertOk()
            ->assertJsonPath('data.snapshot.storeName', 'Tech Haven')
            ->assertJsonPath('data.snapshot.surface', 'retailer-store');
    }
}
