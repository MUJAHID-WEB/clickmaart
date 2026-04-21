<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\AutomationRule;
use App\Models\CommissionSettlement;
use App\Models\Order;
use App\Models\Payout;
use App\Models\Product;
use App\Models\ReportExport;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ClickMaartSnapshotService
{
    public function meta(): array
    {
        return [
            'name' => 'ClickMaart API',
            'version' => '1.0.0',
            'framework' => 'Laravel 12',
            'auth' => [
                'tokenType' => 'Bearer',
                'loginPath' => '/api/v1/auth/login',
            ],
            'demoCredentials' => [
                [
                    'role' => 'admin',
                    'identifier' => 'admin@clickmaart.com',
                    'password' => 'Admin@123',
                ],
                [
                    'role' => 'wholesaler',
                    'identifier' => 'mega@supply.com',
                    'password' => 'Password@123',
                ],
                [
                    'role' => 'retailer',
                    'identifier' => 'tech@haven.com',
                    'password' => 'Password@123',
                ],
                [
                    'role' => 'customer',
                    'identifier' => 'rafi.ahmed@clickmaart.com',
                    'password' => 'Password@123',
                ],
            ],
        ];
    }

    public function storefrontSnapshot(?string $surface, ?string $tenantKey): array
    {
        if ($surface === 'admin-store') {
            $store = Store::query()->where('slug', 'admin-store')->firstOrFail();

            return $this->mapStorefrontSnapshot($store, 'admin-store', 'admin-store', true);
        }

        if ($surface === 'retailer-store') {
            $normalizedSlug = $this->normalizeRetailerStoreSlug($tenantKey);
            $store = Store::query()->where('slug', $normalizedSlug)->firstOrFail();

            return $this->mapStorefrontSnapshot($store, 'retailer-store', $normalizedSlug, true);
        }

        return [
            'surface' => 'core',
            'tenantKey' => null,
            'basePath' => '',
            'storeName' => 'ClickMaart Marketplace',
            'surfaceLabel' => 'Core Marketplace',
            'ownerLabel' => 'Platform-owned public commerce surface',
            'tagline' => 'Multi-store discovery with one shared commerce experience',
            'description' => 'The core marketplace keeps shared homepage, catalog, cart, checkout, and order confirmation flows aligned while tenant-aware storefronts grow around it.',
            'supportEmail' => 'support@clickmaart.com',
            'supportPhone' => '+880 1700-000000',
            'domain' => 'www.clickmaart.com',
            'highlights' => [
                'Shared public commerce foundation',
                'Customer registration and checkout alignment',
                'Tenant-aware storefront readiness',
            ],
            'isPreview' => false,
        ];
    }

    public function storefrontCatalog(?string $tenantKey, ?string $surface = null): array
    {
        return $this->publicCatalogQuery($tenantKey, $surface)
            ->orderByDesc('featured')
            ->orderBy('name')
            ->get()
            ->map(fn (Product $product) => $this->mapStorefrontProduct($product))
            ->all();
    }

    public function storesForPublic(): array
    {
        return Store::query()
            ->whereIn('surface', ['admin-store', 'retailer-store'])
            ->orderBy('name')
            ->get()
            ->map(fn (Store $store) => [
                'id' => $store->external_id,
                'name' => $store->name,
                'domain' => $store->domain,
                'surface' => $store->surface,
                'status' => $store->status,
                'tagline' => $store->tagline,
            ])
            ->all();
    }

    public function storefrontOrderDetail(Order $order): array
    {
        return [
            'order' => $this->mapPublicOrder($order),
        ];
    }

    public function createStorefrontOrder(array $data, ?string $tenantKey = null, ?string $surface = null): array
    {
        $catalogProducts = $this->publicCatalogQuery($tenantKey, $surface)
            ->whereIn('external_id', collect($data['items'])->pluck('productId')->all())
            ->get()
            ->keyBy('external_id');

        if ($catalogProducts->count() !== count($data['items'])) {
            throw ValidationException::withMessages([
                'items' => ['One or more cart items are no longer available in the selected storefront.'],
            ]);
        }

        /** @var Product $primaryProduct */
        $primaryProduct = $catalogProducts->first();
        $store = $primaryProduct->store;
        $retailer = $store?->owner;
        $wholesaler = $primaryProduct->wholesaler;

        if (! $store || ! $retailer || ! $wholesaler) {
            throw ValidationException::withMessages([
                'items' => ['The storefront could not resolve a valid store, retailer, or wholesaler owner.'],
            ]);
        }

        $lineItems = collect($data['items'])->map(function (array $item) use ($catalogProducts): array {
            /** @var Product $product */
            $product = $catalogProducts->get($item['productId']);
            $quantity = max((int) $item['quantity'], 1);

            return [
                'productId' => $product->external_id,
                'name' => $product->name,
                'quantity' => $quantity,
                'unitPrice' => (float) $product->selling_price,
                'wholesalePrice' => (float) $product->wholesale_price,
                'image' => ($product->image_urls ?? ['/images/homepage/Product1.jpg'])[0],
            ];
        })->values();

        $grossOrderValue = round((float) $lineItems->sum(fn (array $item) => $item['unitPrice'] * $item['quantity']), 2);
        $wholesaleTotal = round((float) $lineItems->sum(fn (array $item) => ($item['wholesalePrice'] ?? $item['unitPrice']) * $item['quantity']), 2);
        $platformCommission = round($grossOrderValue * 0.10, 2);
        $retailerProfit = max(round($grossOrderValue - $platformCommission - $wholesaleTotal, 2), 0);
        $retailerPayable = round($retailerProfit * 0.90, 2);
        $wholesalerPayable = round($wholesaleTotal, 2);

        $customer = User::query()->firstOrCreate(
            ['email' => $data['email']],
            [
                'external_id' => 'cu-'.(User::query()->role('customer')->count() + 3005),
                'name' => $data['fullName'],
                'phone' => $data['phone'],
                'role' => 'customer',
                'status' => 'approved',
                'password' => Str::random(32),
            ],
        );

        if ($data['phone'] && ! $customer->phone) {
            $customer->forceFill(['phone' => $data['phone']])->save();
        }

        $externalId = (string) (Order::query()->count() + 4001);
        $destination = implode(', ', array_filter([
            $data['address'],
            $data['city'],
            $data['postalCode'],
        ]));

        $order = Order::query()->create([
            'external_id' => $externalId,
            'source' => match ($surface ?: $tenantKey) {
                'admin-store' => 'admin-storefront',
                default => $surface === 'retailer-store' || $tenantKey ? 'retailer-storefront' : 'core-storefront',
            },
            'retailer_id' => $retailer->id,
            'wholesaler_id' => $wholesaler->id,
            'customer_id' => $customer->id,
            'store_id' => $store->id,
            'customer_name' => $data['fullName'],
            'customer_email' => $data['email'],
            'customer_phone' => $data['phone'],
            'shipping_address' => $data['address'],
            'shipping_city' => $data['city'],
            'shipping_postal_code' => $data['postalCode'],
            'payment_method' => 'Cash on Delivery',
            'line_items' => $lineItems->all(),
            'items_count' => (int) $lineItems->sum('quantity'),
            'gross_order_value' => $grossOrderValue,
            'cod_amount' => $grossOrderValue,
            'destination' => $destination,
            'admin_eta_label' => 'Expected within 48 hours',
            'current_stage' => 'pending',
            'admin_status' => 'pending',
            'wholesaler_status' => 'pending',
            'retailer_status' => 'pending',
            'cod_state' => 'Awaiting warehouse confirmation',
            'platform_commission' => $platformCommission,
            'wholesaler_payable' => $wholesalerPayable,
            'retailer_profit' => $retailerProfit,
            'retailer_payable' => $retailerPayable,
            'updated_label' => 'Just now',
        ]);

        $order->stageEvents()->create([
            'stage' => 'pending',
            'label' => 'Order placed',
            'owner' => 'Storefront checkout',
            'event_at' => now()->format('Y-m-d H:i'),
            'note' => 'Customer checkout completed and order was queued for fulfillment.',
        ]);

        CommissionSettlement::query()->create([
            'external_id' => 'cs-'.(CommissionSettlement::query()->count() + 8200),
            'order_id' => $order->id,
            'retailer_id' => $retailer->id,
            'wholesaler_id' => $wholesaler->id,
            'gross_order_value' => $grossOrderValue,
            'platform_commission' => $platformCommission,
            'wholesaler_payable' => $wholesalerPayable,
            'retailer_profit' => $retailerProfit,
            'retailer_payable' => $retailerPayable,
            'cod_state' => 'Awaiting delivery completion',
            'payout_status' => 'pending-approval',
            'released_at_label' => 'Awaiting successful delivery',
            'note' => 'Automatically created from storefront checkout.',
        ]);

        Payout::query()->create([
            'external_id' => 'pay-'.(Payout::query()->count() + 5001),
            'order_id' => $order->id,
            'beneficiary_role' => 'wholesaler',
            'beneficiary_id' => $wholesaler->id,
            'gross_amount' => $grossOrderValue,
            'commission' => $platformCommission,
            'payable' => $wholesalerPayable,
            'payout_status' => 'pending',
            'released_at_label' => 'Awaiting delivery confirmation',
            'note' => 'Created automatically after customer checkout.',
        ]);

        Payout::query()->create([
            'external_id' => 'rp-'.(Payout::query()->count() + 5001),
            'order_id' => $order->id,
            'beneficiary_role' => 'retailer',
            'beneficiary_id' => $retailer->id,
            'gross_amount' => $grossOrderValue,
            'commission' => $platformCommission,
            'profit' => $retailerProfit,
            'payable' => $retailerPayable,
            'payout_status' => 'pending',
            'released_at_label' => 'Awaiting delivery confirmation',
            'note' => 'Created automatically after customer checkout.',
        ]);

        foreach ($lineItems as $item) {
            /** @var Product $product */
            $product = $catalogProducts->get($item['productId']);
            $product->forceFill([
                'stock' => max((int) $product->stock - (int) $item['quantity'], 0),
                'retailer_catalog_status' => max((int) $product->stock - (int) $item['quantity'], 0) <= 12
                    ? 'low-stock'
                    : $product->retailer_catalog_status,
            ])->save();
        }

        $store->forceFill([
            'monthly_orders' => (int) $store->monthly_orders + 1,
            'revenue' => (float) $store->revenue + $grossOrderValue,
        ])->save();

        $retailer->forceFill([
            'monthly_orders' => (int) $retailer->monthly_orders + 1,
            'last_active_label' => 'Just now',
        ])->save();

        $wholesaler->forceFill([
            'orders_count' => (int) $wholesaler->orders_count + 1,
            'last_active_label' => 'Just now',
        ])->save();

        $this->syncStoreInventorySummary($store);

        return [
            'order' => $this->mapPublicOrder($order->fresh()),
        ];
    }

    public function adminDashboard(): array
    {
        return [
            'summary' => [
                'pendingWholesalers' => User::query()->role('wholesaler')->where('status', 'pending')->count(),
                'pendingRetailers' => User::query()->role('retailer')->where('status', 'pending')->count(),
                'pendingProducts' => Product::query()->where('moderation_status', 'pending')->count(),
                'activeOrders' => Order::query()->whereNotNull('admin_status')->count(),
                'liveStores' => Store::query()->where('status', 'live')->count(),
            ],
            'recentActivities' => $this->activities('admin'),
        ];
    }

    public function adminProfile(): array
    {
        $admin = User::query()->role('admin')->firstOrFail();

        return [
            'name' => $admin->name,
            'email' => $admin->email,
            'phone' => $admin->phone,
            'designation' => $admin->designation,
            'address' => $admin->address,
            'company' => $admin->company,
            'tradeLicense' => $admin->trade_license,
            'businessDocument' => $admin->business_document,
            'passwordPolicy' => 'Minimum 8 characters with uppercase, lowercase, number, and special character.',
            'securityNote' => 'Accounts lock after 3 failed attempts and reset links are issued automatically.',
        ];
    }

    public function adminWholesalers(?string $status): array
    {
        $query = User::query()->role('wholesaler');

        if ($status) {
            $query->where('status', $status);
        }

        return $query
            ->orderBy('business_name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->external_id,
                'businessName' => $user->business_name,
                'email' => $user->email,
                'category' => $user->category,
                'products' => $user->products_count,
                'orders' => $user->orders_count,
                'since' => $user->since_label,
                'documentsVerified' => (bool) $user->documents_verified,
                'complianceScore' => $user->compliance_score,
                'status' => $user->status,
                'rejectionReason' => $user->rejection_reason,
            ])
            ->all();
    }

    public function adminRetailers(?string $status): array
    {
        $query = User::query()->role('retailer');

        if ($status) {
            $query->where('status', $status);
        }

        return $query
            ->orderBy('business_name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->external_id,
                'businessName' => $user->business_name,
                'email' => $user->email,
                'businessType' => $user->business_type,
                'monthlyOrders' => $user->monthly_orders,
                'docsVerified' => (bool) $user->documents_verified,
                'lastActive' => $user->last_active_label,
                'status' => $user->status,
                'rejectionReason' => $user->rejection_reason,
            ])
            ->all();
    }

    public function adminProducts(?string $status): array
    {
        $query = Product::query()
            ->with('wholesaler')
            ->whereNull('retailer_catalog_status');

        if ($status) {
            $query->where('moderation_status', $status);
        }

        return $query
            ->orderBy('name')
            ->get()
            ->map(function (Product $product): array {
                $markup = $product->wholesale_price && $product->selling_price
                    ? round(((float) $product->selling_price - (float) $product->wholesale_price) / max((float) $product->wholesale_price, 1) * 100)
                    : 0;

                return [
                    'id' => $product->external_id,
                    'name' => $product->name,
                    'category' => $product->category,
                    'wholesaler' => $product->wholesaler?->business_name ?? $product->wholesaler?->name,
                    'price' => $this->formatUsd((float) ($product->selling_price ?: $product->wholesale_price ?: 0)),
                    'stock' => $product->stock,
                    'markup' => "{$markup}%",
                    'status' => $product->moderation_status,
                    'listed' => (bool) $product->listed,
                    'rejectionReason' => $product->moderation_status === 'rejected' ? $product->admin_note : null,
                ];
            })
            ->all();
    }

    public function adminOrders(?string $status): array
    {
        $query = Order::query()
            ->with(['retailer', 'wholesaler'])
            ->whereNotNull('admin_status');

        if ($status) {
            $query->where('admin_status', $status);
        }

        return $query
            ->orderBy('external_id')
            ->get()
            ->map(fn (Order $order) => [
                'id' => "#{$order->external_id}",
                'retailer' => $order->retailer?->business_name ?? $order->retailer?->name,
                'wholesaler' => $order->wholesaler?->business_name ?? $order->wholesaler?->name,
                'items' => $order->items_count,
                'codAmount' => $this->formatUsd((float) $order->cod_amount),
                'tracking' => $order->outbound_tracking ?: $order->inbound_tracking,
                'eta' => $order->admin_eta_label,
                'status' => $order->admin_status,
                'customer' => $order->customer_name,
            ])
            ->all();
    }

    public function adminOrderDetail(Order $order): array
    {
        $order->loadMissing(['retailer', 'wholesaler', 'stageEvents', 'trackingEvents', 'settlements']);

        return [
            'order' => [
                'id' => $order->external_id,
                'source' => $order->source,
                'retailer' => $order->retailer?->business_name ?? $order->retailer?->name,
                'wholesaler' => $order->wholesaler?->business_name ?? $order->wholesaler?->name,
                'customer' => $order->customer_name,
                'items' => $order->items_count,
                'grossOrderValue' => (float) $order->gross_order_value,
                'platformCommission' => (float) $order->platform_commission,
                'wholesalerPayable' => (float) $order->wholesaler_payable,
                'retailerProfit' => (float) $order->retailer_profit,
                'retailerPayable' => (float) $order->retailer_payable,
                'currentStage' => $order->current_stage,
                'codState' => $order->cod_state,
                'inboundCarrier' => $order->inbound_carrier,
                'inboundTracking' => $order->inbound_tracking,
                'outboundCarrier' => $order->outbound_carrier,
                'outboundTracking' => $order->outbound_tracking,
                'eta' => $order->admin_eta_label,
                'updatedAt' => $order->updated_label,
                'flags' => $this->buildOrderFlags($order),
                'stageHistory' => $order->stageEvents
                    ->map(fn ($event) => [
                        'stage' => $event->stage,
                        'label' => $event->label,
                        'owner' => $event->owner,
                        'timestamp' => $event->event_at,
                        'note' => $event->note,
                    ])
                    ->all(),
                'trackingEvents' => $order->trackingEvents
                    ->map(fn ($event) => [
                        'leg' => $event->leg,
                        'carrier' => $event->carrier,
                        'trackingReference' => $event->tracking_reference,
                        'status' => $event->status,
                        'location' => $event->location,
                        'updatedAt' => $event->updated_label,
                        'note' => $event->note,
                    ])
                    ->all(),
            ],
            'journeys' => $order->trackingEvents
                ->map(fn ($event) => [
                    'id' => "{$order->external_id}-{$event->id}",
                    'orderId' => $order->external_id,
                    'leg' => $event->leg,
                    'carrier' => $event->carrier,
                    'trackingReference' => $event->tracking_reference,
                    'destination' => $event->destination,
                    'status' => $event->status,
                    'lastSync' => $event->last_sync ?: $event->updated_label,
                    'nextCheckpoint' => $event->next_checkpoint ?: 'Monitoring',
                    'note' => $event->note,
                ])
                ->all(),
            'settlements' => $order->settlements
                ->map(fn ($settlement) => $this->mapCommissionSettlement($settlement))
                ->all(),
        ];
    }

    public function adminDelivery(): array
    {
        $journeys = Order::query()
            ->with('trackingEvents')
            ->whereHas('trackingEvents')
            ->get()
            ->flatMap(fn (Order $order) => $order->trackingEvents->map(
                fn ($event) => [
                    'id' => "{$order->external_id}-{$event->id}",
                    'orderId' => $order->external_id,
                    'leg' => $event->leg,
                    'carrier' => $event->carrier,
                    'trackingReference' => $event->tracking_reference,
                    'destination' => $event->destination,
                    'status' => $event->status,
                    'lastSync' => $event->last_sync ?: $event->updated_label,
                    'nextCheckpoint' => $event->next_checkpoint ?: 'Awaiting courier update',
                    'note' => $event->note,
                ]
            ))
            ->values()
            ->all();

        return [
            'journeys' => $journeys,
            'integrations' => [
                [
                    'carrier' => 'FedEx',
                    'scope' => 'Admin-to-customer final-mile sync',
                    'syncedShipments' => 128,
                    'refreshCadence' => '15-minute polling',
                    'successRate' => '98.2%',
                    'status' => 'healthy',
                    'note' => 'Webhook fallback stays armed for missed polling windows.',
                ],
                [
                    'carrier' => 'Steadfast',
                    'scope' => 'Inbound and outbound local courier sync',
                    'syncedShipments' => 204,
                    'refreshCadence' => '15-minute polling',
                    'successRate' => '96.8%',
                    'status' => 'attention',
                    'note' => 'Two labels are waiting on retry after courier-side timeout.',
                ],
            ],
            'automation' => $this->automationByTitles([
                'Carrier exception retry',
                'Order spike alert',
            ]),
        ];
    }

    public function adminCommission(): array
    {
        return [
            'settlements' => CommissionSettlement::query()
                ->with(['order', 'retailer', 'wholesaler'])
                ->orderBy('external_id')
                ->get()
                ->map(fn (CommissionSettlement $settlement) => $this->mapCommissionSettlement($settlement))
                ->all(),
            'automation' => $this->automationByTitles([
                'Payment delay notice',
                'Order spike alert',
            ]),
        ];
    }

    public function adminReports(string $view): array
    {
        return [
            'view' => $view,
            'windows' => [
                [
                    'label' => 'Daily',
                    'revenue' => 168000,
                    'orders' => 94,
                    'commission' => 16800,
                    'growth' => '+7.8%',
                    'note' => 'Strong order spike from electronics and grocery campaigns.',
                ],
                [
                    'label' => 'Weekly',
                    'revenue' => 942000,
                    'orders' => 522,
                    'commission' => 94200,
                    'growth' => '+11.5%',
                    'note' => 'Steady wholesaler fulfillment and improved warehouse turnaround.',
                ],
                [
                    'label' => 'Monthly',
                    'revenue' => 3820000,
                    'orders' => 2114,
                    'commission' => 382000,
                    'growth' => '+18.2%',
                    'note' => 'Public storefront rollout continues to lift repeat purchase volume.',
                ],
                [
                    'label' => 'Yearly',
                    'revenue' => 42800000,
                    'orders' => 24680,
                    'commission' => 4280000,
                    'growth' => '+24.4%',
                    'note' => 'Operational improvements reduced delivery exceptions across both carrier lanes.',
                ],
            ],
            'exports' => ReportExport::query()
                ->orderBy('external_id')
                ->get()
                ->map(fn (ReportExport $export) => [
                    'id' => $export->external_id,
                    'report' => $export->report,
                    'format' => $export->format,
                    'requestedBy' => $export->requested_by_name,
                    'scope' => $export->scope,
                    'status' => $export->status,
                    'generatedAt' => $export->generated_at_label,
                ])
                ->all(),
            'automation' => $this->automationByTitles([
                'Payment delay notice',
                'Low stock escalation',
            ]),
        ];
    }

    public function adminStores(): array
    {
        return [
            'stores' => Store::query()
                ->whereIn('surface', ['admin-store', 'retailer-store'])
                ->orderBy('name')
                ->get()
                ->map(fn (Store $store) => $this->mapAdminStore($store))
                ->all(),
            'automation' => $this->automationByTitles([
                'Low stock escalation',
                'Order spike alert',
            ]),
        ];
    }

    public function adminStoreDetail(Store $store): array
    {
        return [
            'store' => $this->mapAdminStore($store),
            'automation' => $this->automationByTitles(['Low stock escalation']),
        ];
    }

    public function wholesalerDashboard(User $actor): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);
        $products = Product::query()->where('wholesaler_id', $wholesaler->id)->whereNull('retailer_catalog_status')->get();
        $orders = Order::query()->where('wholesaler_id', $wholesaler->id)->whereNotNull('wholesaler_status')->get();
        $payouts = Payout::query()->where('beneficiary_role', 'wholesaler')->where('beneficiary_id', $wholesaler->id)->get();

        return [
            'summary' => [
                'pendingProducts' => $products->where('moderation_status', 'pending')->count(),
                'approvedProducts' => $products->where('moderation_status', 'approved')->count(),
                'pendingOrders' => $orders->where('wholesaler_status', 'pending')->count(),
                'withdrawablePayouts' => (float) $payouts->where('payout_status', 'withdrawable')->sum('payable'),
            ],
            'salesWindows' => [
                ['label' => 'Daily Revenue', 'value' => 1840, 'helper' => 'Last 24 hours'],
                ['label' => 'Weekly Revenue', 'value' => 9820, 'helper' => 'Last 7 days'],
                ['label' => 'Monthly Revenue', 'value' => 42850, 'helper' => 'Last 30 days'],
            ],
            'topProducts' => [
                ['name' => 'Smart Watch Active', 'units' => 500, 'revenue' => 49500],
                ['name' => 'Wireless Earbuds Pro', 'units' => 420, 'revenue' => 25196],
                ['name' => 'Yoga Mat Premium', 'units' => 330, 'revenue' => 9897],
            ],
            'recentActivities' => $this->activities('wholesaler'),
        ];
    }

    public function wholesalerProfile(User $actor): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);

        return $this->mapProfile($wholesaler);
    }

    public function wholesalerProducts(User $actor, ?string $status): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);
        $query = Product::query()
            ->where('wholesaler_id', $wholesaler->id)
            ->whereNull('retailer_catalog_status');

        if ($status) {
            $query->where('moderation_status', $status);
        }

        return $query
            ->orderBy('external_id')
            ->get()
            ->map(fn (Product $product) => $this->mapWholesalerProduct($product))
            ->all();
    }

    public function wholesalerOrders(User $actor, ?string $status): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);
        $query = Order::query()->where('wholesaler_id', $wholesaler->id)->whereNotNull('wholesaler_status');

        if ($status) {
            $query->where('wholesaler_status', $status);
        }

        return $query->orderBy('external_id')->get()->map(fn (Order $order) => [
            'id' => "#{$order->external_id}",
            'retailer' => $order->retailer?->business_name ?? $order->retailer?->name,
            'items' => $order->items_count,
            'codAmount' => (float) $order->cod_amount,
            'destination' => $order->destination,
            'tracking' => $order->inbound_tracking ?: 'Awaiting shipment',
            'updatedAt' => $order->updated_label,
            'status' => $order->wholesaler_status,
            'customerMask' => $order->customer_mask ?: 'Customer contact masked',
        ])->all();
    }

    public function wholesalerPayouts(User $actor, ?string $status): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);
        $query = Payout::query()->where('beneficiary_role', 'wholesaler')->where('beneficiary_id', $wholesaler->id);

        if ($status) {
            $query->where('payout_status', $status);
        }

        return $query->orderBy('external_id')->get()->map(fn (Payout $payout) => [
            'id' => $payout->external_id,
            'orderId' => "#{$payout->order?->external_id}",
            'orderAmount' => (float) $payout->gross_amount,
            'commission' => (float) $payout->commission,
            'payable' => (float) $payout->payable,
            'status' => $payout->payout_status,
            'releasedAt' => $payout->released_at_label,
            'note' => $payout->note,
        ])->all();
    }

    public function wholesalerReports(User $actor): array
    {
        return [
            'salesWindows' => $this->wholesalerDashboard($actor)['salesWindows'],
            'topProducts' => $this->wholesalerDashboard($actor)['topProducts'],
            'recentActivities' => $this->activities('wholesaler'),
        ];
    }

    public function updateWholesalerProfile(
        User $actor,
        array $data,
        ?UploadedFile $profilePhoto = null,
        ?UploadedFile $businessDocument = null,
    ): array {
        return $this->updateUserProfileRecord(
            $this->resolveWholesalerActor($actor),
            $data,
            $profilePhoto,
            $businessDocument,
        );
    }

    public function updateWholesalerProduct(User $actor, Product $product, array $data): array
    {
        $wholesaler = $this->resolveWholesalerActor($actor);

        if ((int) $product->wholesaler_id !== (int) $wholesaler->id) {
            throw ValidationException::withMessages([
                'product' => ['This product does not belong to the authenticated wholesaler.'],
            ]);
        }

        $product->forceFill([
            'selling_price' => $data['price'] ?? $product->selling_price,
            'stock' => $data['stock'] ?? $product->stock,
            'description' => $data['description'] ?? $product->description,
            'details' => $data['details'] ?? $product->details,
            'moderation_status' => ($data['resubmit'] ?? false) ? 'pending' : $product->moderation_status,
            'listing_state' => ($data['resubmit'] ?? false) ? 'not-listed' : $product->listing_state,
            'listed' => ($data['resubmit'] ?? false) ? false : $product->listed,
            'admin_note' => ($data['resubmit'] ?? false)
                ? 'Resubmitted by wholesaler for fresh moderation review.'
                : ($data['admin_note'] ?? $product->admin_note),
            'submitted_at' => ($data['resubmit'] ?? false) ? now()->toDateString() : $product->submitted_at,
        ])->save();

        return $this->mapWholesalerProduct($product->fresh());
    }

    public function retailerDashboard(User $actor): array
    {
        $retailer = $this->resolveRetailerActor($actor);
        $catalog = $this->retailerCatalogCollection($retailer);
        $orders = Order::query()->where('retailer_id', $retailer->id)->whereNotNull('retailer_status')->get();
        $payouts = Payout::query()->where('beneficiary_role', 'retailer')->where('beneficiary_id', $retailer->id)->get();

        return [
            'summary' => [
                'liveProducts' => $catalog->where('retailer_catalog_status', 'live')->count(),
                'lowStockProducts' => $catalog->where('retailer_catalog_status', 'low-stock')->count(),
                'pendingOrders' => $orders->where('retailer_status', 'pending')->count(),
                'withdrawablePayouts' => (float) $payouts->where('payout_status', 'withdrawable')->sum('payable'),
            ],
            'salesWindows' => [
                ['label' => 'Daily Sales', 'value' => 48200, 'helper' => 'Last 24 hours'],
                ['label' => 'Weekly Sales', 'value' => 268400, 'helper' => 'Last 7 days'],
                ['label' => 'Monthly Sales', 'value' => 1024500, 'helper' => 'Last 30 days'],
            ],
            'topProducts' => [
                ['name' => 'Wireless Earbuds Pro', 'units' => 188, 'revenue' => 1616800],
                ['name' => 'Smart Watch Active', 'units' => 96, 'revenue' => 1171200],
                ['name' => 'Organic Coffee Beans', 'units' => 244, 'revenue' => 378200],
            ],
            'recentActivities' => $this->activities('retailer'),
        ];
    }

    public function retailerProfile(User $actor): array
    {
        return $this->mapProfile($this->resolveRetailerActor($actor));
    }

    public function retailerCatalog(User $actor, ?string $status): array
    {
        $catalog = $this->retailerCatalogCollection($this->resolveRetailerActor($actor));

        if ($status) {
            $catalog = $catalog->where('retailer_catalog_status', $status);
        }

        return $catalog->values()->map(fn (Product $product) => $this->mapRetailerCatalogItem($product))->all();
    }

    public function retailerStores(User $actor): array
    {
        $retailer = $this->resolveRetailerActor($actor);

        return Store::query()
            ->where('owner_user_id', $retailer->id)
            ->orderBy('name')
            ->get()
            ->map(fn (Store $store) => $this->mapRetailerStore($store))
            ->all();
    }

    public function retailerOrders(User $actor, ?string $status): array
    {
        $retailer = $this->resolveRetailerActor($actor);
        $query = Order::query()->where('retailer_id', $retailer->id)->whereNotNull('retailer_status');

        if ($status) {
            $query->where('retailer_status', $status);
        }

        return $query->orderBy('external_id')->get()->map(fn (Order $order) => [
            'id' => "#{$order->external_id}",
            'customer' => $order->customer_name,
            'items' => $order->items_count,
            'total' => (float) $order->gross_order_value,
            'courier' => $order->outbound_carrier ?: 'Pending assignment',
            'tracking' => $order->outbound_tracking ?: 'Awaiting dispatch',
            'destination' => $order->destination,
            'updatedAt' => $order->updated_label,
            'status' => $order->retailer_status,
        ])->all();
    }

    public function retailerPayouts(User $actor, ?string $status): array
    {
        $retailer = $this->resolveRetailerActor($actor);
        $query = Payout::query()->where('beneficiary_role', 'retailer')->where('beneficiary_id', $retailer->id);

        if ($status) {
            $query->where('payout_status', $status);
        }

        return $query->orderBy('external_id')->get()->map(fn (Payout $payout) => [
            'id' => $payout->external_id,
            'orderId' => "#{$payout->order?->external_id}",
            'grossSales' => (float) $payout->gross_amount,
            'profit' => (float) $payout->profit,
            'commission' => (float) $payout->commission,
            'payable' => (float) $payout->payable,
            'status' => $payout->payout_status,
            'releasedAt' => $payout->released_at_label,
            'note' => $payout->note,
        ])->all();
    }

    public function retailerReports(User $actor): array
    {
        return [
            'salesWindows' => $this->retailerDashboard($actor)['salesWindows'],
            'topProducts' => $this->retailerDashboard($actor)['topProducts'],
            'recentActivities' => $this->activities('retailer'),
        ];
    }

    public function updateRetailerProfile(
        User $actor,
        array $data,
        ?UploadedFile $profilePhoto = null,
        ?UploadedFile $businessDocument = null,
    ): array {
        return $this->updateUserProfileRecord(
            $this->resolveRetailerActor($actor),
            $data,
            $profilePhoto,
            $businessDocument,
        );
    }

    public function updateRetailerCatalogItem(User $actor, Product $product, array $data): array
    {
        $retailer = $this->resolveRetailerActor($actor);

        if ((int) $product->store?->owner_user_id !== (int) $retailer->id) {
            throw ValidationException::withMessages([
                'product' => ['This catalog item does not belong to the authenticated retailer.'],
            ]);
        }

        $sellingPrice = (float) ($data['selling_price'] ?? $product->selling_price);
        $wholesalePrice = (float) $product->wholesale_price;

        $product->forceFill([
            'selling_price' => $sellingPrice,
            'stock' => $data['stock'] ?? $product->stock,
            'retailer_catalog_status' => $data['status'] ?? $product->retailer_catalog_status,
            'margin' => round($sellingPrice - $wholesalePrice, 2),
            'admin_note' => $data['note'] ?? $product->admin_note,
            'listed' => ($data['status'] ?? $product->retailer_catalog_status) !== 'draft',
            'listing_state' => ($data['status'] ?? $product->retailer_catalog_status) === 'draft'
                ? 'not-listed'
                : 'listed',
        ])->save();

        if ($product->store) {
            $this->syncStoreInventorySummary($product->store->fresh());
        }

        return $this->mapRetailerCatalogItem($product->fresh(['store']));
    }

    public function updateRetailerStore(User $actor, Store $store, array $data): array
    {
        $retailer = $this->resolveRetailerActor($actor);

        if ((int) $store->owner_user_id !== (int) $retailer->id) {
            throw ValidationException::withMessages([
                'store' => ['This store does not belong to the authenticated retailer.'],
            ]);
        }

        $status = $data['status'] ?? $store->status;
        $store->forceFill([
            'name' => $data['name'] ?? $store->name,
            'domain' => $data['domain'] ?? $store->domain,
            'status' => $status === 'active' ? 'live' : $status,
            'note' => $data['note'] ?? $store->note,
            'dns_health' => ! empty($data['domain'])
                ? 'Domain update received, validation in progress'
                : $store->dns_health,
        ])->save();

        return $this->mapRetailerStore($store->fresh());
    }

    public function updateUserStatus(User $user, string $status, ?string $reason = null): array
    {
        $user->forceFill([
            'status' => $status,
            'rejection_reason' => $status === 'rejected' ? $reason : null,
            'approval_note' => $status === 'approved' ? 'Reviewed and approved by admin.' : $reason,
        ])->save();

        return $user->fresh()->only(['external_id', 'status', 'rejection_reason', 'approval_note']);
    }

    public function updateProductStatus(Product $product, string $status, ?string $note = null): array
    {
        $product->forceFill([
            'moderation_status' => $status,
            'listed' => $status === 'approved',
            'listing_state' => $status === 'approved' ? 'listed' : 'not-listed',
            'admin_note' => $note,
        ])->save();

        return [
            'id' => $product->external_id,
            'status' => $product->moderation_status,
            'listed' => (bool) $product->listed,
            'adminNote' => $product->admin_note,
        ];
    }

    public function updateOrderStage(Order $order, string $stage, ?string $note = null): array
    {
        $adminStatus = in_array($stage, ['pending', 'shipped', 'delivered'], true)
            ? $stage
            : $order->admin_status;

        $order->forceFill([
            'current_stage' => $stage,
            'admin_status' => $adminStatus,
            'updated_label' => 'Just now',
            'admin_eta_label' => $stage === 'delivered' ? 'Delivered' : $order->admin_eta_label,
        ])->save();

        if ($note) {
            $order->stageEvents()->create([
                'stage' => $stage,
                'label' => ucfirst(str_replace('-', ' ', $stage)),
                'owner' => 'Admin operations',
                'event_at' => now()->format('Y-m-d H:i'),
                'note' => $note,
            ]);
        }

        return [
            'id' => $order->external_id,
            'currentStage' => $order->current_stage,
            'adminStatus' => $order->admin_status,
            'updatedAt' => $order->updated_label,
        ];
    }

    public function updateCommissionStatus(CommissionSettlement $settlement, string $status, ?string $note = null): array
    {
        $settlement->forceFill([
            'payout_status' => $status,
            'released_at_label' => $status === 'paid' ? now()->format('Y-m-d H:i') : $settlement->released_at_label,
            'note' => $note ?: $settlement->note,
        ])->save();

        return $this->mapCommissionSettlement($settlement->fresh(['order', 'retailer', 'wholesaler']));
    }

    public function createExport(string $report, string $format, string $scope, string $requestedBy): array
    {
        $latestNumber = (int) ReportExport::query()->count() + 9100;

        $export = ReportExport::query()->create([
            'external_id' => 'ex-'.$latestNumber,
            'report' => $report,
            'format' => strtoupper($format),
            'requested_by_name' => $requestedBy,
            'scope' => $scope,
            'status' => 'queued',
            'generated_at_label' => 'Queued just now',
        ]);

        return [
            'id' => $export->external_id,
            'report' => $export->report,
            'format' => $export->format,
            'requestedBy' => $export->requested_by_name,
            'scope' => $export->scope,
            'status' => $export->status,
            'generatedAt' => $export->generated_at_label,
        ];
    }

    public function updateStoreStatus(Store $store, string $status, ?string $note = null): array
    {
        $store->forceFill([
            'status' => $status,
            'note' => $note ?: $store->note,
        ])->save();

        return $this->mapAdminStore($store->fresh());
    }

    private function automationByTitles(array $titles): array
    {
        return AutomationRule::query()
            ->whereIn('title', $titles)
            ->orderBy('title')
            ->get()
            ->map(fn (AutomationRule $rule) => [
                'id' => $rule->external_id,
                'title' => $rule->title,
                'trigger' => $rule->trigger_text,
                'channels' => $rule->channels,
                'audience' => $rule->audience,
                'status' => $rule->status,
                'note' => $rule->note,
            ])
            ->all();
    }

    private function activities(string $scope): array
    {
        return ActivityLog::query()
            ->where('audience_scope', $scope)
            ->orderBy('id')
            ->get()
            ->map(fn (ActivityLog $activity) => [
                'title' => $activity->title,
                'detail' => $activity->detail,
                'time' => $activity->logged_at_label,
            ])
            ->all();
    }

    private function mapAdminStore(Store $store): array
    {
        return [
            'id' => $store->external_id,
            'name' => $store->name,
            'owner' => $store->surface === 'admin-store' ? 'Admin managed' : 'Retailer managed',
            'domain' => $store->domain,
            'products' => $store->products_count,
            'monthlyOrders' => $store->monthly_orders,
            'revenue' => (float) $store->revenue,
            'lowStockAlerts' => $store->low_stock_count,
            'status' => $store->status,
            'dnsHealth' => $store->dns_health,
            'note' => $store->note,
        ];
    }

    private function mapCommissionSettlement(CommissionSettlement $settlement): array
    {
        return [
            'id' => $settlement->external_id,
            'orderId' => $settlement->order?->external_id,
            'retailer' => $settlement->retailer?->business_name ?? $settlement->retailer?->name,
            'wholesaler' => $settlement->wholesaler?->business_name ?? $settlement->wholesaler?->name,
            'grossOrderValue' => (float) $settlement->gross_order_value,
            'platformCommission' => (float) $settlement->platform_commission,
            'wholesalerPayable' => (float) $settlement->wholesaler_payable,
            'retailerProfit' => (float) $settlement->retailer_profit,
            'retailerPayable' => (float) $settlement->retailer_payable,
            'codState' => $settlement->cod_state,
            'payoutStatus' => $settlement->payout_status,
            'releasedAt' => $settlement->released_at_label,
            'note' => $settlement->note,
        ];
    }

    private function mapStorefrontProduct(Product $product): array
    {
        return [
            'id' => $product->external_id,
            'name' => $product->name,
            'price' => (float) $product->selling_price,
            'discount' => (int) $product->discount,
            'images' => $product->image_urls ?: ['/images/homepage/Product1.jpg'],
            'rating' => (float) $product->rating,
            'reviewCount' => (int) $product->review_count,
            'category' => $product->category,
            'description' => $product->description,
            'stock' => $product->stock,
            'specifications' => $product->specifications ?: [],
            'details' => $product->details,
            'storeName' => $product->store?->name,
            'status' => $product->retailer_catalog_status,
            'featured' => (bool) $product->featured,
        ];
    }

    private function mapPublicOrder(Order $order): array
    {
        $status = $order->admin_status ?: $order->retailer_status ?: $order->current_stage ?: 'pending';
        $lineItems = collect($order->line_items ?? [])->map(fn (array $item) => [
            'id' => $item['productId'] ?? $item['id'] ?? null,
            'name' => $item['name'] ?? 'Catalog item',
            'price' => (float) ($item['unitPrice'] ?? $item['price'] ?? 0),
            'quantity' => (int) ($item['quantity'] ?? 1),
            'image' => $item['image'] ?? '/images/homepage/Product1.jpg',
        ])->all();

        return [
            'id' => $order->external_id,
            'date' => optional($order->created_at)->format('Y-m-d') ?? now()->format('Y-m-d'),
            'status' => ucwords(str_replace('-', ' ', $status)),
            'currentStage' => $order->current_stage,
            'items' => $lineItems,
            'total' => (float) $order->gross_order_value,
            'shippingAddress' => implode(', ', array_filter([
                $order->shipping_address,
                $order->shipping_city,
                $order->shipping_postal_code,
            ])),
            'paymentMethod' => $order->payment_method ?: 'Cash on Delivery',
            'customerName' => $order->customer_name,
            'customerEmail' => $order->customer_email,
            'customerPhone' => $order->customer_phone,
            'eta' => $order->admin_eta_label,
        ];
    }

    private function mapStorefrontSnapshot(Store $store, string $surface, string $tenantKey, bool $isPreview): array
    {
        return [
            'surface' => $surface,
            'tenantKey' => $tenantKey,
            'basePath' => '',
            'storeName' => $store->name,
            'surfaceLabel' => $surface === 'admin-store' ? 'Admin Public Store' : 'Retailer Public Store',
            'ownerLabel' => $surface === 'admin-store'
                ? 'Admin-curated public storefront'
                : 'Retailer-managed public storefront',
            'tagline' => $store->tagline,
            'description' => $store->description,
            'supportEmail' => $store->support_email,
            'supportPhone' => $store->support_phone,
            'domain' => $store->domain,
            'highlights' => [
                $store->note,
                'Shared checkout with tenant context',
                'Domain-aware storefront rendering',
            ],
            'isPreview' => $isPreview,
        ];
    }

    private function mapProfile(User $user): array
    {
        return [
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'businessName' => $user->business_name,
            'businessType' => $user->business_type ?: $user->category,
            'address' => $user->address,
            'status' => $user->status,
            'document' => $user->business_document,
            'profilePhoto' => $user->profile_photo_path,
            'tradeLicense' => $user->trade_license,
        ];
    }

    private function mapWholesalerProduct(Product $product): array
    {
        return [
            'id' => $product->external_id,
            'name' => $product->name,
            'category' => $product->category,
            'submittedAt' => optional($product->submitted_at)->format('Y-m-d'),
            'price' => (float) $product->selling_price,
            'stock' => $product->stock,
            'status' => $product->moderation_status,
            'listingState' => $product->listing_state,
            'adminNote' => $product->admin_note,
        ];
    }

    private function mapRetailerCatalogItem(Product $product): array
    {
        return [
            'id' => $product->external_id,
            'name' => $product->name,
            'category' => $product->category,
            'storeName' => $product->store?->name,
            'wholesalePrice' => (float) $product->wholesale_price,
            'sellingPrice' => (float) $product->selling_price,
            'margin' => (float) $product->margin,
            'stock' => $product->stock,
            'status' => $product->retailer_catalog_status,
            'updatedAt' => optional($product->updated_at)->format('Y-m-d'),
            'note' => $product->admin_note,
        ];
    }

    private function mapRetailerStore(Store $store): array
    {
        return [
            'id' => $store->external_id,
            'name' => $store->name,
            'domain' => $store->domain,
            'products' => $store->products_count,
            'monthlyOrders' => $store->monthly_orders,
            'revenue' => (float) $store->revenue,
            'lowStockCount' => $store->low_stock_count,
            'status' => in_array($store->status, ['setup-pending', 'dns-pending'], true) ? 'setup-pending' : 'active',
            'note' => $store->note,
        ];
    }

    private function updateUserProfileRecord(
        User $user,
        array $data,
        ?UploadedFile $profilePhoto = null,
        ?UploadedFile $businessDocument = null,
    ): array {
        $user->forceFill([
            'name' => $data['name'] ?? $user->name,
            'email' => $data['email'] ?? $user->email,
            'phone' => $data['phone'] ?? $user->phone,
            'business_name' => $data['business_name'] ?? $user->business_name,
            'business_type' => $data['business_type'] ?? $user->business_type,
            'address' => $data['address'] ?? $user->address,
            'trade_license' => $data['trade_license'] ?? $user->trade_license,
            'profile_photo_path' => $profilePhoto
                ? $this->persistUpload($profilePhoto, 'profile-photos')
                : $user->profile_photo_path,
            'business_document' => $businessDocument
                ? $this->persistUpload($businessDocument, 'business-documents')
                : $user->business_document,
            'last_active_label' => 'Just now',
        ])->save();

        return $this->mapProfile($user->fresh());
    }

    private function retailerCatalogCollection(User $retailer): Collection
    {
        return Product::query()
            ->with('store')
            ->whereHas('store', function (Builder $builder) use ($retailer): void {
                $builder->where('owner_user_id', $retailer->id);
            })
            ->whereNotNull('retailer_catalog_status')
            ->orderBy('external_id')
            ->get();
    }

    private function publicCatalogQuery(?string $tenantKey = null, ?string $surface = null): Builder
    {
        $query = Product::query()
            ->with(['store', 'wholesaler'])
            ->whereIn('retailer_catalog_status', ['live', 'low-stock']);

        $normalizedSurface = trim(strtolower((string) $surface));
        $normalizedTenantKey = trim(strtolower((string) $tenantKey));

        if ($normalizedSurface === 'admin-store' || $normalizedTenantKey === 'admin-store') {
            $query->whereHas('store', function (Builder $builder): void {
                $builder->where('slug', 'admin-store');
            });

            return $query;
        }

        if ($normalizedTenantKey !== '') {
            $query->whereHas('store', function (Builder $builder) use ($normalizedTenantKey): void {
                $builder->where('slug', $this->normalizeRetailerStoreSlug($normalizedTenantKey));
            });
        }

        return $query;
    }

    private function syncStoreInventorySummary(Store $store): void
    {
        $store->forceFill([
            'products_count' => $store->products()->whereNotNull('retailer_catalog_status')->count(),
            'low_stock_count' => $store->products()->where('stock', '<=', 12)->count(),
        ])->save();
    }

    private function persistUpload(UploadedFile $file, string $directory): string
    {
        return $file->store("clickmaart/{$directory}");
    }

    private function resolveWholesalerActor(User $actor): User
    {
        if ($actor->role === 'wholesaler') {
            return $actor;
        }

        return User::query()->role('wholesaler')->where('status', 'approved')->orderBy('business_name')->firstOrFail();
    }

    private function resolveRetailerActor(User $actor): User
    {
        if ($actor->role === 'retailer') {
            return $actor;
        }

        return User::query()->role('retailer')->where('status', 'approved')->orderBy('business_name')->firstOrFail();
    }

    private function normalizeRetailerStoreSlug(?string $tenantKey): string
    {
        return match (trim(strtolower((string) $tenantKey))) {
            'tech', 'tech-haven' => 'tech-haven',
            'fresh', 'fresh-basket' => 'fresh-basket',
            'fitness', 'urban-fitness' => 'urban-fitness',
            'living', 'urban-living' => 'urban-living',
            default => 'tech-haven',
        };
    }

    private function buildOrderFlags(Order $order): array
    {
        $flags = [];

        if ($order->current_stage === 'out-for-delivery') {
            $flags[] = 'Retailer payout will unlock after successful delivery';
        }

        if ($order->current_stage === 'payment-done') {
            $flags[] = 'Wholesaler withdrawal can be processed immediately';
        }

        if ($order->cod_state) {
            $flags[] = $order->cod_state;
        }

        return array_values(array_unique($flags));
    }

    private function formatUsd(float $value): string
    {
        return '$'.number_format($value, 2);
    }
}
