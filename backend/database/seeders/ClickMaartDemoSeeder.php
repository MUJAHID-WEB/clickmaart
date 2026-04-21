<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\AutomationRule;
use App\Models\CommissionSettlement;
use App\Models\Order;
use App\Models\Payout;
use App\Models\Product;
use App\Models\ReportExport;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ClickMaartDemoSeeder extends Seeder
{
    public function run(): void
    {
        $users = [];

        foreach ($this->users() as $attributes) {
            $user = User::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );

            $users[$user->external_id] = $user;
        }

        $stores = [];

        foreach ($this->stores($users) as $attributes) {
            $store = Store::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );

            $stores[$store->external_id] = $store;
        }

        foreach ($this->products($users, $stores) as $attributes) {
            Product::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );
        }

        $orders = [];

        foreach ($this->orders($users, $stores) as $attributes) {
            $order = Order::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );

            $orders[$order->external_id] = $order;
        }

        foreach ($this->orderStageEvents() as $attributes) {
            $order = $orders[$attributes['order_id']] ?? null;

            if (! $order) {
                continue;
            }

            $order->stageEvents()->updateOrCreate(
                [
                    'stage' => $attributes['stage'],
                    'event_at' => $attributes['event_at'],
                ],
                Arr::except($attributes, ['order_id']),
            );
        }

        foreach ($this->trackingEvents() as $attributes) {
            $order = $orders[$attributes['order_id']] ?? null;

            if (! $order) {
                continue;
            }

            $order->trackingEvents()->updateOrCreate(
                [
                    'tracking_reference' => $attributes['tracking_reference'],
                    'leg' => $attributes['leg'],
                ],
                Arr::except($attributes, ['order_id']),
            );
        }

        foreach ($this->payouts($orders, $users) as $attributes) {
            Payout::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );
        }

        foreach ($this->commissionSettlements($orders, $users) as $attributes) {
            CommissionSettlement::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );
        }

        foreach ($this->automationRules() as $attributes) {
            AutomationRule::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );
        }

        foreach ($this->reportExports() as $attributes) {
            ReportExport::query()->updateOrCreate(
                ['external_id' => $attributes['external_id']],
                $attributes,
            );
        }

        foreach ($this->activities() as $attributes) {
            ActivityLog::query()->updateOrCreate(
                [
                    'audience_scope' => $attributes['audience_scope'],
                    'title' => $attributes['title'],
                ],
                $attributes,
            );
        }
    }

    private function users(): array
    {
        return [
            [
                'external_id' => 'ad-0001',
                'name' => 'ClickMaart Platform Admin',
                'email' => 'admin@clickmaart.com',
                'phone' => '+8801712345678',
                'role' => 'admin',
                'business_name' => 'ClickMaart Operations',
                'company' => 'ClickMaart Commerce Ltd.',
                'trade_license' => 'TL-2026-CM-00145',
                'designation' => 'Operations Director',
                'address' => 'House 12, Road 7, Gulshan 1, Dhaka',
                'business_document' => 'trade-license-clickmaart.pdf',
                'status' => 'approved',
                'documents_verified' => true,
                'password' => 'Admin@123',
            ],
            [
                'external_id' => 'wh-1001',
                'name' => 'Global Imports Owner',
                'email' => 'imports@global.com',
                'phone' => '+8801800001001',
                'role' => 'wholesaler',
                'business_name' => 'Global Imports',
                'category' => 'Electronics',
                'status' => 'pending',
                'documents_verified' => true,
                'compliance_score' => '97%',
                'products_count' => 75,
                'orders_count' => 320,
                'since_label' => '2 days ago',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'wh-1002',
                'name' => 'Quality Distributors Owner',
                'email' => 'quality@dist.com',
                'phone' => '+8801800001002',
                'role' => 'wholesaler',
                'business_name' => 'Quality Distributors',
                'category' => 'Home Goods',
                'status' => 'pending',
                'documents_verified' => true,
                'compliance_score' => '95%',
                'products_count' => 42,
                'orders_count' => 185,
                'since_label' => '1 day ago',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'wh-1003',
                'name' => 'Mega Suppliers Owner',
                'email' => 'mega@supply.com',
                'phone' => '+8801800001003',
                'role' => 'wholesaler',
                'business_name' => 'Mega Suppliers',
                'category' => 'Consumer Tech',
                'status' => 'approved',
                'documents_verified' => true,
                'compliance_score' => '98%',
                'products_count' => 118,
                'orders_count' => 510,
                'since_label' => 'Today',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'wh-1004',
                'name' => 'Premium Goods Lead',
                'email' => 'hello@premiumgoods.co',
                'phone' => '+8801800001004',
                'role' => 'wholesaler',
                'business_name' => 'Premium Goods LLC',
                'category' => 'Beauty',
                'status' => 'approved',
                'documents_verified' => true,
                'compliance_score' => '96%',
                'products_count' => 63,
                'orders_count' => 276,
                'since_label' => '3 days ago',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'wh-1005',
                'name' => 'Budget Goods Lead',
                'email' => 'budget@goods.com',
                'phone' => '+8801800001005',
                'role' => 'wholesaler',
                'business_name' => 'Budget Goods',
                'category' => 'Accessories',
                'status' => 'rejected',
                'documents_verified' => false,
                'compliance_score' => '61%',
                'products_count' => 21,
                'orders_count' => 44,
                'since_label' => '5 days ago',
                'rejection_reason' => 'Incomplete business registration documents',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'wh-1006',
                'name' => 'Cityline Wholesale Lead',
                'email' => 'ops@citylinewholesale.com',
                'phone' => '+8801800001006',
                'role' => 'wholesaler',
                'business_name' => 'Cityline Wholesale',
                'category' => 'Fashion',
                'status' => 'rejected',
                'documents_verified' => false,
                'compliance_score' => '58%',
                'products_count' => 39,
                'orders_count' => 78,
                'since_label' => '4 days ago',
                'rejection_reason' => 'Tax identity mismatch with submitted trade license',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2001',
                'name' => 'Urban Retail Co. Owner',
                'email' => 'urban@retail.com',
                'phone' => '+8801810002001',
                'role' => 'retailer',
                'business_name' => 'Urban Retail Co.',
                'business_type' => 'Fashion',
                'status' => 'pending',
                'documents_verified' => true,
                'monthly_orders' => 1250,
                'last_active_label' => 'Today',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2002',
                'name' => 'Fresh Grocers Owner',
                'email' => 'fresh@grocers.com',
                'phone' => '+8801810002002',
                'role' => 'retailer',
                'business_name' => 'Fresh Grocers',
                'business_type' => 'Food and Beverage',
                'status' => 'pending',
                'documents_verified' => false,
                'monthly_orders' => 620,
                'last_active_label' => '2 hours ago',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2003',
                'name' => 'Tech Haven Owner',
                'email' => 'tech@haven.com',
                'phone' => '+8801810002003',
                'role' => 'retailer',
                'business_name' => 'Tech Haven',
                'business_type' => 'Electronics',
                'status' => 'approved',
                'documents_verified' => true,
                'monthly_orders' => 890,
                'last_active_label' => 'Today',
                'address' => 'Banani, Dhaka',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2004',
                'name' => 'Urban Mart Owner',
                'email' => 'hello@urbanmart.com',
                'phone' => '+8801810002004',
                'role' => 'retailer',
                'business_name' => 'Urban Mart',
                'business_type' => 'Lifestyle',
                'status' => 'approved',
                'documents_verified' => true,
                'monthly_orders' => 1320,
                'last_active_label' => '1 hour ago',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2005',
                'name' => 'Budget Mart Owner',
                'email' => 'budget@mart.com',
                'phone' => '+8801810002005',
                'role' => 'retailer',
                'business_name' => 'Budget Mart',
                'business_type' => 'General Goods',
                'status' => 'rejected',
                'documents_verified' => false,
                'monthly_orders' => 170,
                'last_active_label' => '3 days ago',
                'rejection_reason' => 'Incomplete company identity and store ownership proof',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'rt-2006',
                'name' => 'Outlet Basics Owner',
                'email' => 'owner@outletbasics.com',
                'phone' => '+8801810002006',
                'role' => 'retailer',
                'business_name' => 'Outlet Basics',
                'business_type' => 'Household',
                'status' => 'rejected',
                'documents_verified' => false,
                'monthly_orders' => 245,
                'last_active_label' => '4 days ago',
                'rejection_reason' => 'Store compliance checklist not fully satisfied',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'cu-3001',
                'name' => 'Rafi Ahmed',
                'email' => 'rafi.ahmed@clickmaart.com',
                'phone' => '+8801711113001',
                'role' => 'customer',
                'status' => 'approved',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'cu-3002',
                'name' => 'Sumaiya Akter',
                'email' => 'sumaiya.akter@clickmaart.com',
                'phone' => '+8801711113002',
                'role' => 'customer',
                'status' => 'approved',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'cu-3003',
                'name' => 'Nusrat Jahan',
                'email' => 'nusrat.jahan@clickmaart.com',
                'phone' => '+8801711113003',
                'role' => 'customer',
                'status' => 'approved',
                'password' => 'Password@123',
            ],
            [
                'external_id' => 'cu-3004',
                'name' => 'Mehedi Hasan',
                'email' => 'mehedi.hasan@clickmaart.com',
                'phone' => '+8801711113004',
                'role' => 'customer',
                'status' => 'approved',
                'password' => 'Password@123',
            ],
        ];
    }

    private function stores(array $users): array
    {
        return [
            [
                'external_id' => 'admin-main',
                'owner_user_id' => $users['ad-0001']->id,
                'surface' => 'admin-store',
                'owner_role' => 'admin',
                'name' => 'ClickMaart Select',
                'slug' => 'admin-store',
                'domain' => 'select.clickmaart.shop',
                'status' => 'live',
                'products_count' => 186,
                'monthly_orders' => 940,
                'revenue' => 2860000,
                'low_stock_count' => 8,
                'dns_health' => 'Primary domain healthy',
                'tagline' => 'Platform-curated assortment with central merchandising control',
                'description' => 'The admin public store reuses the shared commerce shell while presenting curated products, featured campaigns, and centrally controlled pricing visibility.',
                'note' => 'Platform-owned store with the widest featured assortment.',
                'support_email' => 'select@clickmaart.com',
                'support_phone' => '+880 1800-100100',
                'is_preview_ready' => true,
            ],
            [
                'external_id' => 'urban-retail-co',
                'owner_user_id' => $users['rt-2003']->id,
                'surface' => 'retailer-store',
                'owner_role' => 'retailer',
                'name' => 'Tech Haven',
                'slug' => 'tech-haven',
                'domain' => 'tech.clickmaart.shop',
                'status' => 'live',
                'products_count' => 28,
                'monthly_orders' => 164,
                'revenue' => 486000,
                'low_stock_count' => 4,
                'dns_health' => 'Subdomain validated',
                'tagline' => 'Fast-moving gadgets, curated accessories, and strong electronics deals',
                'description' => 'Tech Haven is a retailer storefront focused on electronics with its own merchandising tone, pricing strategy, and catalog visibility.',
                'note' => 'Top retailer storefront with strong gadget conversion.',
                'support_email' => 'hello@techhaven.shop',
                'support_phone' => '+880 1811-220011',
                'is_preview_ready' => true,
            ],
            [
                'external_id' => 'fresh-grocers',
                'owner_user_id' => $users['rt-2003']->id,
                'surface' => 'retailer-store',
                'owner_role' => 'retailer',
                'name' => 'Fresh Basket',
                'slug' => 'fresh-basket',
                'domain' => 'fresh.clickmaart.shop',
                'status' => 'live',
                'products_count' => 18,
                'monthly_orders' => 121,
                'revenue' => 192500,
                'low_stock_count' => 2,
                'dns_health' => 'Subdomain validated',
                'tagline' => 'Daily essentials, pantry staples, and fast-moving grocery offers',
                'description' => 'Fresh Basket uses the shared commerce experience while keeping grocery-focused merchandising and store-level pricing rules.',
                'note' => 'High COD volume store with daily inventory rotations.',
                'support_email' => 'hello@freshbasket.shop',
                'support_phone' => '+880 1811-220022',
                'is_preview_ready' => true,
            ],
            [
                'external_id' => 'urban-fitness',
                'owner_user_id' => $users['rt-2003']->id,
                'surface' => 'retailer-store',
                'owner_role' => 'retailer',
                'name' => 'Urban Fitness',
                'slug' => 'urban-fitness',
                'domain' => 'fitness.clickmaart.shop',
                'status' => 'live',
                'products_count' => 14,
                'monthly_orders' => 73,
                'revenue' => 146300,
                'low_stock_count' => 3,
                'dns_health' => 'Subdomain validated',
                'tagline' => 'Fitness gear, yoga products, and active lifestyle essentials',
                'description' => 'Urban Fitness extends the shared storefront shell into a wellness-focused retailer storefront with campaign-ready merchandising.',
                'note' => 'Campaign-ready sports and wellness assortment.',
                'support_email' => 'hello@urbanfitness.shop',
                'support_phone' => '+880 1811-220033',
                'is_preview_ready' => true,
            ],
            [
                'external_id' => 'urban-living',
                'owner_user_id' => $users['rt-2003']->id,
                'surface' => 'retailer-store',
                'owner_role' => 'retailer',
                'name' => 'Urban Living',
                'slug' => 'urban-living',
                'domain' => 'living.clickmaart.shop',
                'status' => 'dns-pending',
                'products_count' => 9,
                'monthly_orders' => 0,
                'revenue' => 0,
                'low_stock_count' => 0,
                'dns_health' => 'CNAME check in progress',
                'tagline' => 'Home essentials, decor, and compact living upgrades',
                'description' => 'Urban Living is the setup-pending retailer store used to preview tenant-aware public storefront rendering before full launch.',
                'note' => 'Public launch is blocked until DNS propagation succeeds.',
                'support_email' => 'hello@urbanliving.shop',
                'support_phone' => '+880 1811-220044',
                'is_preview_ready' => true,
            ],
        ];
    }

    private function products(array $users, array $stores): array
    {
        return array_map(fn (array $attributes) => $this->decorateProduct($attributes), [
            ['external_id' => 'wp-1001', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Wireless Earbuds Pro', 'category' => 'Electronics', 'wholesale_price' => 52.17, 'selling_price' => 59.99, 'margin' => 7.82, 'stock' => 250, 'moderation_status' => 'pending', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Awaiting media and price verification', 'submitted_at' => '2026-04-12'],
            ['external_id' => 'wp-1002', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Organic Coffee Beans', 'category' => 'Grocery', 'wholesale_price' => 11.16, 'selling_price' => 12.50, 'margin' => 1.34, 'stock' => 640, 'moderation_status' => 'pending', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Nutrition-safe packaging proof requested', 'submitted_at' => '2026-04-10'],
            ['external_id' => 'wp-1003', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Smart Watch Active', 'category' => 'Electronics', 'wholesale_price' => 83.90, 'selling_price' => 99.00, 'margin' => 15.10, 'stock' => 65, 'moderation_status' => 'approved', 'listing_state' => 'listed', 'listed' => true, 'submitted_at' => '2026-04-05'],
            ['external_id' => 'wp-1004', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Yoga Mat Premium', 'category' => 'Fitness', 'wholesale_price' => 24.99, 'selling_price' => 29.99, 'margin' => 5.00, 'stock' => 180, 'moderation_status' => 'approved', 'listing_state' => 'listed', 'listed' => true, 'submitted_at' => '2026-04-06'],
            ['external_id' => 'wp-1005', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Cheap Sunglasses', 'category' => 'Accessories', 'wholesale_price' => 5.70, 'selling_price' => 6.00, 'margin' => 0.30, 'stock' => 500, 'moderation_status' => 'rejected', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Low-quality materials and duplicate imagery', 'submitted_at' => '2026-04-03'],
            ['external_id' => 'wp-1006', 'wholesaler_id' => $users['wh-1003']->id, 'name' => 'Plastic Lunch Box Set', 'category' => 'Kitchen', 'wholesale_price' => 7.87, 'selling_price' => 8.50, 'margin' => 0.63, 'stock' => 140, 'moderation_status' => 'rejected', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Compliance declaration incomplete', 'submitted_at' => '2026-04-01'],
            ['external_id' => 'rc-1001', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['urban-retail-co']->id, 'name' => 'Wireless Earbuds Pro', 'category' => 'Electronics', 'wholesale_price' => 7000, 'selling_price' => 8600, 'margin' => 1600, 'stock' => 36, 'retailer_catalog_status' => 'live', 'listing_state' => 'listed', 'listed' => true, 'featured' => true, 'admin_note' => 'Featured on homepage hero block'],
            ['external_id' => 'rc-1002', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['urban-retail-co']->id, 'name' => 'Smart Watch Active', 'category' => 'Electronics', 'wholesale_price' => 9800, 'selling_price' => 12200, 'margin' => 2400, 'stock' => 12, 'retailer_catalog_status' => 'low-stock', 'listing_state' => 'listed', 'listed' => true, 'admin_note' => 'Restock threshold reached'],
            ['external_id' => 'rc-1003', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['fresh-grocers']->id, 'name' => 'Organic Coffee Beans', 'category' => 'Grocery', 'wholesale_price' => 1200, 'selling_price' => 1550, 'margin' => 350, 'stock' => 84, 'retailer_catalog_status' => 'live', 'listing_state' => 'listed', 'listed' => true],
            ['external_id' => 'rc-1004', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['urban-fitness']->id, 'name' => 'Premium Yoga Mat', 'category' => 'Fitness', 'wholesale_price' => 2400, 'selling_price' => 3200, 'margin' => 800, 'stock' => 18, 'retailer_catalog_status' => 'low-stock', 'listing_state' => 'listed', 'listed' => true, 'admin_note' => 'Ad campaign increased order velocity'],
            ['external_id' => 'rc-1005', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['fresh-grocers']->id, 'name' => 'Mini Blender Portable', 'category' => 'Kitchen', 'wholesale_price' => 2800, 'selling_price' => 3650, 'margin' => 850, 'stock' => 0, 'retailer_catalog_status' => 'draft', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Pending final media selection before listing'],
            ['external_id' => 'rc-1006', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['urban-living']->id, 'name' => 'Desk Lamp Aura', 'category' => 'Home', 'wholesale_price' => 1900, 'selling_price' => 2550, 'margin' => 650, 'stock' => 26, 'retailer_catalog_status' => 'draft', 'listing_state' => 'not-listed', 'listed' => false, 'admin_note' => 'Scheduled for regional launch next week'],
            ['external_id' => 'rc-1007', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['admin-main']->id, 'name' => 'Smart Watch Active', 'category' => 'Electronics', 'wholesale_price' => 9800, 'selling_price' => 11900, 'margin' => 2100, 'stock' => 24, 'retailer_catalog_status' => 'live', 'listing_state' => 'listed', 'listed' => true, 'featured' => true, 'admin_note' => 'Admin curated bestseller'],
            ['external_id' => 'rc-1008', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['admin-main']->id, 'name' => 'Wireless Earbuds Pro', 'category' => 'Electronics', 'wholesale_price' => 7000, 'selling_price' => 8350, 'margin' => 1350, 'stock' => 44, 'retailer_catalog_status' => 'live', 'listing_state' => 'listed', 'listed' => true, 'featured' => true, 'admin_note' => 'Highlighted in admin storefront campaign'],
            ['external_id' => 'rc-1009', 'wholesaler_id' => $users['wh-1003']->id, 'primary_store_id' => $stores['admin-main']->id, 'name' => 'Organic Coffee Beans', 'category' => 'Grocery', 'wholesale_price' => 1200, 'selling_price' => 1490, 'margin' => 290, 'stock' => 120, 'retailer_catalog_status' => 'live', 'listing_state' => 'listed', 'listed' => true, 'featured' => false],
        ]);
    }

    private function orders(array $users, array $stores): array
    {
        return array_map(fn (array $attributes) => $this->decorateOrder($attributes, $users), [
            ['external_id' => '3056', 'source' => 'storefront', 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1001']->id, 'customer_id' => $users['cu-3004']->id, 'store_id' => $stores['urban-retail-co']->id, 'customer_name' => 'John Doe', 'items_count' => 3, 'gross_order_value' => 125.50, 'cod_amount' => 125.50, 'destination' => 'ClickMaart Admin Warehouse, Dhaka', 'admin_eta_label' => 'Nov 20', 'current_stage' => 'pending', 'admin_status' => 'pending', 'cod_state' => 'Awaiting warehouse confirmation', 'inbound_tracking' => 'FX789123', 'platform_commission' => 12.55, 'wholesaler_payable' => 94.00, 'retailer_profit' => 19.00, 'retailer_payable' => 17.10, 'updated_label' => '10 mins ago'],
            ['external_id' => '3057', 'source' => 'storefront', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_id' => $users['cu-3001']->id, 'store_id' => $stores['urban-retail-co']->id, 'customer_name' => 'Amina Rahman', 'items_count' => 2, 'gross_order_value' => 220.00, 'cod_amount' => 220.00, 'destination' => 'ClickMaart Admin Warehouse, Dhaka', 'admin_eta_label' => 'Nov 20', 'current_stage' => 'pending', 'admin_status' => 'pending', 'cod_state' => 'Awaiting wholesaler dispatch', 'inbound_tracking' => 'QD882010', 'platform_commission' => 22.00, 'wholesaler_payable' => 171.60, 'retailer_profit' => 26.40, 'retailer_payable' => 23.76, 'updated_label' => '18 mins ago'],
            ['external_id' => '3058', 'source' => 'storefront', 'retailer_id' => $users['rt-2001']->id, 'wholesaler_id' => $users['wh-1004']->id, 'customer_id' => $users['cu-3001']->id, 'store_id' => $stores['urban-retail-co']->id, 'customer_name' => 'Rafi Ahmed', 'items_count' => 4, 'gross_order_value' => 32500, 'cod_amount' => 32500, 'destination' => 'Customer address, Dhaka', 'admin_eta_label' => 'Expected by 2026-04-18 evening', 'current_stage' => 'out-for-delivery', 'admin_status' => 'shipped', 'cod_state' => 'COD verified at dispatch handoff', 'inbound_carrier' => 'Steadfast', 'inbound_tracking' => 'ST552010', 'outbound_carrier' => 'FedEx', 'outbound_tracking' => 'FX998331', 'platform_commission' => 3250, 'wholesaler_payable' => 24850, 'retailer_profit' => 4400, 'retailer_payable' => 3960, 'updated_label' => '14 mins ago'],
            ['external_id' => '3059', 'source' => 'external-marketing', 'retailer_id' => $users['rt-2002']->id, 'wholesaler_id' => $users['wh-1001']->id, 'customer_id' => $users['cu-3002']->id, 'store_id' => $stores['fresh-grocers']->id, 'customer_name' => 'Sumaiya Akter', 'items_count' => 6, 'gross_order_value' => 18200, 'cod_amount' => 18200, 'destination' => 'Customer address, Chattogram', 'admin_eta_label' => 'Dispatch planned within 3 hours', 'current_stage' => 'received', 'admin_status' => 'shipped', 'cod_state' => 'Awaiting final customer dispatch', 'inbound_carrier' => 'FedEx', 'inbound_tracking' => 'FX998002', 'outbound_carrier' => 'Steadfast', 'outbound_tracking' => 'ST442118', 'platform_commission' => 1820, 'wholesaler_payable' => 13980, 'retailer_profit' => 2400, 'retailer_payable' => 2160, 'updated_label' => '29 mins ago'],
            ['external_id' => '3060', 'source' => 'storefront', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_id' => $users['cu-3003']->id, 'store_id' => $stores['urban-retail-co']->id, 'customer_name' => 'Nusrat Jahan', 'items_count' => 1, 'gross_order_value' => 14000, 'cod_amount' => 14000, 'destination' => 'Customer address, Khulna', 'admin_eta_label' => 'Delivered', 'current_stage' => 'payment-done', 'admin_status' => 'delivered', 'cod_state' => 'COD fully settled and reconciled', 'inbound_carrier' => 'Pathao', 'inbound_tracking' => 'PT229901', 'outbound_carrier' => 'Steadfast', 'outbound_tracking' => 'ST114771', 'platform_commission' => 1400, 'wholesaler_payable' => 10800, 'retailer_profit' => 1800, 'retailer_payable' => 1620, 'updated_label' => 'Yesterday'],
            ['external_id' => '3061', 'source' => 'storefront', 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1004']->id, 'customer_id' => $users['cu-3004']->id, 'store_id' => $stores['urban-retail-co']->id, 'customer_name' => 'Mehedi Hasan', 'items_count' => 5, 'gross_order_value' => 9600, 'cod_amount' => 9600, 'destination' => 'Customer address, Dhaka', 'admin_eta_label' => 'Delivered', 'current_stage' => 'payment-done', 'admin_status' => 'delivered', 'cod_state' => 'Paid', 'inbound_carrier' => 'Steadfast', 'inbound_tracking' => 'ST445515', 'outbound_carrier' => 'Steadfast', 'outbound_tracking' => 'ST445515', 'platform_commission' => 960, 'wholesaler_payable' => 7560, 'retailer_profit' => 1200, 'retailer_payable' => 1080, 'updated_label' => 'Yesterday'],
            ['external_id' => '3062', 'source' => 'storefront', 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Sadia Karim', 'items_count' => 2, 'gross_order_value' => 8600, 'cod_amount' => 8600, 'destination' => 'Customer address, Sylhet', 'admin_eta_label' => 'Courier review pending', 'current_stage' => 'out-for-delivery', 'admin_status' => 'shipped', 'cod_state' => 'Delivery exception under review', 'outbound_carrier' => 'FedEx', 'outbound_tracking' => 'FX332114', 'platform_commission' => 860, 'wholesaler_payable' => 6708, 'retailer_profit' => 860, 'retailer_payable' => 774, 'updated_label' => '27 mins ago'],
            ['external_id' => '2056', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 3, 'gross_order_value' => 1000, 'cod_amount' => 125.50, 'destination' => 'ClickMaart Admin Warehouse, Dhaka', 'wholesaler_status' => 'pending', 'inbound_tracking' => 'FX789123', 'updated_label' => '10 mins ago'],
            ['external_id' => '2057', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 2, 'gross_order_value' => 500, 'cod_amount' => 220.00, 'destination' => 'ClickMaart Admin Warehouse, Dhaka', 'wholesaler_status' => 'pending', 'updated_label' => '18 mins ago'],
            ['external_id' => '2058', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2001']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 4, 'gross_order_value' => 720, 'cod_amount' => 310.75, 'destination' => 'ClickMaart Admin Warehouse, Chattogram', 'wholesaler_status' => 'shipped', 'inbound_tracking' => 'ST552010', 'updated_label' => '35 mins ago'],
            ['external_id' => '2059', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2002']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 6, 'gross_order_value' => 350, 'cod_amount' => 88.20, 'destination' => 'ClickMaart Admin Warehouse, Dhaka', 'wholesaler_status' => 'shipped', 'inbound_tracking' => 'FX998002', 'updated_label' => '1 hour ago'],
            ['external_id' => '2060', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 1, 'gross_order_value' => 140, 'cod_amount' => 140.00, 'destination' => 'Payment completed', 'wholesaler_status' => 'payment-done', 'inbound_tracking' => 'QD229901', 'updated_label' => 'Yesterday'],
            ['external_id' => '2061', 'source' => 'wholesaler-panel', 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Masked customer', 'customer_mask' => 'Customer contact masked', 'items_count' => 5, 'gross_order_value' => 96, 'cod_amount' => 96.00, 'destination' => 'Payment completed', 'wholesaler_status' => 'payment-done', 'inbound_tracking' => 'ST445515', 'updated_label' => 'Yesterday'],
            ['external_id' => 'R3056', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Nafis H.', 'items_count' => 3, 'gross_order_value' => 12850, 'cod_amount' => 12850, 'destination' => 'Dhaka', 'retailer_status' => 'pending', 'outbound_carrier' => 'Steadfast', 'outbound_tracking' => 'ST998201', 'updated_label' => '12 mins ago'],
            ['external_id' => 'R3057', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Jannat T.', 'items_count' => 1, 'gross_order_value' => 3650, 'cod_amount' => 3650, 'destination' => 'Chattogram', 'retailer_status' => 'pending', 'updated_label' => '20 mins ago'],
            ['external_id' => 'R3058', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Arif M.', 'items_count' => 2, 'gross_order_value' => 24400, 'cod_amount' => 24400, 'destination' => 'Sylhet', 'retailer_status' => 'in-delivery', 'outbound_carrier' => 'FedEx', 'outbound_tracking' => 'FX550028', 'updated_label' => '35 mins ago'],
            ['external_id' => 'R3059', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Mou S.', 'items_count' => 4, 'gross_order_value' => 6200, 'cod_amount' => 6200, 'destination' => 'Dhaka', 'retailer_status' => 'in-delivery', 'outbound_carrier' => 'Pathao', 'outbound_tracking' => 'PT203551', 'updated_label' => '1 hour ago'],
            ['external_id' => 'R3060', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Rafi K.', 'items_count' => 2, 'gross_order_value' => 8700, 'cod_amount' => 8700, 'destination' => 'Khulna', 'retailer_status' => 'completed', 'outbound_carrier' => 'Steadfast', 'outbound_tracking' => 'ST889118', 'updated_label' => 'Yesterday'],
            ['external_id' => 'R3061', 'source' => 'retailer-panel', 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'customer_name' => 'Sadia N.', 'items_count' => 1, 'gross_order_value' => 2550, 'cod_amount' => 2550, 'destination' => 'Dhaka', 'retailer_status' => 'completed', 'outbound_carrier' => 'RedX', 'outbound_tracking' => 'RX115009', 'updated_label' => 'Yesterday'],
        ]);
    }

    private function orderStageEvents(): array
    {
        return [
            ['order_id' => '3058', 'stage' => 'pending', 'label' => 'Order placed', 'owner' => 'Retailer storefront', 'event_at' => '2026-04-17 09:10', 'note' => 'Customer checkout completed with COD selected.'],
            ['order_id' => '3058', 'stage' => 'shipped', 'label' => 'Shipped from wholesaler', 'owner' => 'Wholesaler', 'event_at' => '2026-04-17 13:25', 'note' => 'Shipment left the wholesaler warehouse with sealed package manifest.'],
            ['order_id' => '3058', 'stage' => 'received', 'label' => 'Received at admin warehouse', 'owner' => 'Admin operations', 'event_at' => '2026-04-18 08:15', 'note' => 'Inbound package quality check passed without damage report.'],
            ['order_id' => '3058', 'stage' => 'out-for-delivery', 'label' => 'Sent to customer', 'owner' => 'Delivery team', 'event_at' => '2026-04-18 11:20', 'note' => 'FedEx assigned with live tracking refresh enabled every 15 minutes.'],
            ['order_id' => '3059', 'stage' => 'pending', 'label' => 'Order placed', 'owner' => 'Retailer manual order', 'event_at' => '2026-04-17 10:00', 'note' => 'Retailer captured the order from external marketing campaign.'],
            ['order_id' => '3059', 'stage' => 'shipped', 'label' => 'Shipped from wholesaler', 'owner' => 'Wholesaler', 'event_at' => '2026-04-17 17:25', 'note' => 'Cold-chain package transferred through inbound FedEx lane.'],
            ['order_id' => '3059', 'stage' => 'received', 'label' => 'Received at admin warehouse', 'owner' => 'Admin operations', 'event_at' => '2026-04-18 09:40', 'note' => 'Warehouse staff approved the condition check and queued customer dispatch.'],
            ['order_id' => '3060', 'stage' => 'pending', 'label' => 'Order placed', 'owner' => 'Tech Haven storefront', 'event_at' => '2026-04-15 12:05', 'note' => 'Customer completed checkout through the retailer public store.'],
            ['order_id' => '3060', 'stage' => 'shipped', 'label' => 'Shipped from wholesaler', 'owner' => 'Wholesaler', 'event_at' => '2026-04-15 16:20', 'note' => 'Shipment moved toward the admin warehouse with serial number verification.'],
            ['order_id' => '3060', 'stage' => 'received', 'label' => 'Received at admin warehouse', 'owner' => 'Admin operations', 'event_at' => '2026-04-16 08:45', 'note' => 'Warehouse intake completed and customer dispatch label issued.'],
            ['order_id' => '3060', 'stage' => 'out-for-delivery', 'label' => 'Sent to customer', 'owner' => 'Delivery team', 'event_at' => '2026-04-16 12:10', 'note' => 'Steadfast courier received the final-mile package.'],
            ['order_id' => '3060', 'stage' => 'payment-done', 'label' => 'Payment done', 'owner' => 'Finance operations', 'event_at' => '2026-04-17 18:30', 'note' => 'COD collection reconciled and settlement release approved.'],
        ];
    }

    private function trackingEvents(): array
    {
        return [
            ['order_id' => '3058', 'leg' => 'Wholesaler to Admin', 'carrier' => 'Steadfast', 'tracking_reference' => 'ST552010', 'status' => 'delivered', 'location' => 'Dhaka warehouse dock', 'updated_label' => '2026-04-18 08:10', 'destination' => 'ClickMaart warehouse, Dhaka', 'last_sync' => '8 mins ago', 'next_checkpoint' => 'Inbound leg completed', 'note' => 'Inbound carton scanned at warehouse intake.'],
            ['order_id' => '3058', 'leg' => 'Admin to Customer', 'carrier' => 'FedEx', 'tracking_reference' => 'FX998331', 'status' => 'out-for-delivery', 'location' => 'Dhaka city route', 'updated_label' => '2026-04-18 12:02', 'destination' => 'Customer address, Dhaka', 'last_sync' => '12 mins ago', 'next_checkpoint' => 'Customer handoff expected before 18:00', 'note' => 'Courier marked the package out for delivery with verified recipient phone.'],
            ['order_id' => '3059', 'leg' => 'Wholesaler to Admin', 'carrier' => 'FedEx', 'tracking_reference' => 'FX998002', 'status' => 'delivered', 'location' => 'Dhaka cold-storage receiving', 'updated_label' => '2026-04-18 09:35', 'destination' => 'Cold-storage receiving, Dhaka', 'last_sync' => '21 mins ago', 'next_checkpoint' => 'Outbound label handoff', 'note' => 'Temperature-sensitive package passed inbound validation.'],
            ['order_id' => '3059', 'leg' => 'Admin to Customer', 'carrier' => 'Steadfast', 'tracking_reference' => 'ST442118', 'status' => 'scheduled', 'location' => 'Dispatch queue', 'updated_label' => '2026-04-18 10:00', 'destination' => 'Customer address, Chattogram', 'last_sync' => '19 mins ago', 'next_checkpoint' => 'Courier pickup window 14:00 to 15:00', 'note' => 'Dispatch waits on final packing completion.'],
            ['order_id' => '3060', 'leg' => 'Wholesaler to Admin', 'carrier' => 'Pathao', 'tracking_reference' => 'PT229901', 'status' => 'delivered', 'location' => 'Dhaka warehouse', 'updated_label' => '2026-04-16 08:40', 'destination' => 'Dhaka warehouse', 'last_sync' => 'Yesterday', 'next_checkpoint' => 'Inbound leg completed', 'note' => 'Inbound shipment received without discrepancy.'],
            ['order_id' => '3060', 'leg' => 'Admin to Customer', 'carrier' => 'Steadfast', 'tracking_reference' => 'ST114771', 'status' => 'delivered', 'location' => 'Customer address, Khulna', 'updated_label' => '2026-04-17 15:22', 'destination' => 'Customer address, Khulna', 'last_sync' => 'Yesterday', 'next_checkpoint' => 'Delivery completed', 'note' => 'Customer delivery completed and proof captured.'],
            ['order_id' => '3062', 'leg' => 'Admin to Customer', 'carrier' => 'FedEx', 'tracking_reference' => 'FX332114', 'status' => 'delayed', 'location' => 'Weather hold', 'updated_label' => '2026-04-18 11:40', 'destination' => 'Customer address, Sylhet', 'last_sync' => '27 mins ago', 'next_checkpoint' => 'Courier exception review', 'note' => 'Weather-related sorting delay triggered an attention alert.'],
        ];
    }

    private function payouts(array $orders, array $users): array
    {
        return [
            ['external_id' => 'pay-3001', 'order_id' => $orders['2056']->id, 'beneficiary_role' => 'wholesaler', 'beneficiary_id' => $users['wh-1003']->id, 'gross_amount' => 1000, 'commission' => 100, 'profit' => null, 'payable' => 900, 'payout_status' => 'withdrawable', 'released_at_label' => 'Ready now', 'note' => 'Admin enabled withdrawal'],
            ['external_id' => 'pay-3002', 'order_id' => $orders['2057']->id, 'beneficiary_role' => 'wholesaler', 'beneficiary_id' => $users['wh-1003']->id, 'gross_amount' => 500, 'commission' => 50, 'profit' => null, 'payable' => 450, 'payout_status' => 'pending', 'released_at_label' => 'Awaiting delivery confirmation', 'note' => 'COD not fully confirmed yet'],
            ['external_id' => 'pay-3003', 'order_id' => $orders['2058']->id, 'beneficiary_role' => 'wholesaler', 'beneficiary_id' => $users['wh-1003']->id, 'gross_amount' => 720, 'commission' => 72, 'profit' => null, 'payable' => 648, 'payout_status' => 'paid', 'released_at_label' => '2026-04-14 14:30', 'note' => 'Transferred to registered bank account'],
            ['external_id' => 'pay-3004', 'order_id' => $orders['2059']->id, 'beneficiary_role' => 'wholesaler', 'beneficiary_id' => $users['wh-1003']->id, 'gross_amount' => 350, 'commission' => 35, 'profit' => null, 'payable' => 315, 'payout_status' => 'paid', 'released_at_label' => '2026-04-12 11:10', 'note' => 'Transferred with settlement reference'],
            ['external_id' => 'rp-4001', 'order_id' => $orders['R3056']->id, 'beneficiary_role' => 'retailer', 'beneficiary_id' => $users['rt-2003']->id, 'gross_amount' => 12850, 'commission' => 265, 'profit' => 2650, 'payable' => 2385, 'payout_status' => 'pending', 'released_at_label' => 'Awaiting delivery completion', 'note' => 'Order still in operational pipeline'],
            ['external_id' => 'rp-4002', 'order_id' => $orders['R3058']->id, 'beneficiary_role' => 'retailer', 'beneficiary_id' => $users['rt-2003']->id, 'gross_amount' => 24400, 'commission' => 410, 'profit' => 4100, 'payable' => 3690, 'payout_status' => 'withdrawable', 'released_at_label' => 'Ready now', 'note' => 'Admin enabled retailer withdrawal'],
            ['external_id' => 'rp-4003', 'order_id' => $orders['R3060']->id, 'beneficiary_role' => 'retailer', 'beneficiary_id' => $users['rt-2003']->id, 'gross_amount' => 8700, 'commission' => 170, 'profit' => 1700, 'payable' => 1530, 'payout_status' => 'paid', 'released_at_label' => '2026-04-15 11:30', 'note' => 'Transferred to registered wallet'],
            ['external_id' => 'rp-4004', 'order_id' => $orders['R3061']->id, 'beneficiary_role' => 'retailer', 'beneficiary_id' => $users['rt-2003']->id, 'gross_amount' => 2550, 'commission' => 65, 'profit' => 650, 'payable' => 585, 'payout_status' => 'paid', 'released_at_label' => '2026-04-14 16:10', 'note' => 'Transferred with settlement reference'],
        ];
    }

    private function commissionSettlements(array $orders, array $users): array
    {
        return [
            ['external_id' => 'cs-8101', 'order_id' => $orders['3058']->id, 'retailer_id' => $users['rt-2001']->id, 'wholesaler_id' => $users['wh-1004']->id, 'gross_order_value' => 32500, 'platform_commission' => 3250, 'wholesaler_payable' => 24850, 'retailer_profit' => 4400, 'retailer_payable' => 3960, 'cod_state' => 'Pending final delivery', 'payout_status' => 'pending-approval', 'released_at_label' => 'Awaiting successful delivery', 'note' => 'Settlement will release when customer delivery proof is confirmed.'],
            ['external_id' => 'cs-8102', 'order_id' => $orders['3059']->id, 'retailer_id' => $users['rt-2002']->id, 'wholesaler_id' => $users['wh-1001']->id, 'gross_order_value' => 18200, 'platform_commission' => 1820, 'wholesaler_payable' => 13980, 'retailer_profit' => 2400, 'retailer_payable' => 2160, 'cod_state' => 'Ready for customer dispatch', 'payout_status' => 'ready', 'released_at_label' => 'Queued for finance review', 'note' => 'Wholesaler payout can be pre-staged while outbound dispatch begins.'],
            ['external_id' => 'cs-8103', 'order_id' => $orders['3060']->id, 'retailer_id' => $users['rt-2003']->id, 'wholesaler_id' => $users['wh-1003']->id, 'gross_order_value' => 14000, 'platform_commission' => 1400, 'wholesaler_payable' => 10800, 'retailer_profit' => 1800, 'retailer_payable' => 1620, 'cod_state' => 'COD reconciled', 'payout_status' => 'processed', 'released_at_label' => '2026-04-17 18:30', 'note' => 'Settlement packet is waiting for payout execution batch.'],
            ['external_id' => 'cs-8104', 'order_id' => $orders['3061']->id, 'retailer_id' => $users['rt-2004']->id, 'wholesaler_id' => $users['wh-1004']->id, 'gross_order_value' => 9600, 'platform_commission' => 960, 'wholesaler_payable' => 7560, 'retailer_profit' => 1200, 'retailer_payable' => 1080, 'cod_state' => 'Paid', 'payout_status' => 'paid', 'released_at_label' => '2026-04-16 15:10', 'note' => 'Wholesaler and retailer settlements transferred successfully.'],
        ];
    }

    private function automationRules(): array
    {
        return [
            ['external_id' => 'auto-1001', 'title' => 'Order spike alert', 'trigger_text' => 'Order intake exceeds the configured hourly threshold', 'channels' => ['In-app', 'Email'], 'audience' => 'Admin operations', 'status' => 'active', 'note' => 'Helps warehouse teams rebalance inbound and outbound staffing quickly.'],
            ['external_id' => 'auto-1002', 'title' => 'Low stock escalation', 'trigger_text' => 'Store inventory crosses the low-stock floor', 'channels' => ['In-app', 'SMS'], 'audience' => 'Admin and retailer', 'status' => 'active', 'note' => 'Feeds store administration and merchandising follow-up before listings go stale.'],
            ['external_id' => 'auto-1003', 'title' => 'Payment delay notice', 'trigger_text' => 'COD reconciliation remains open beyond the allowed finance window', 'channels' => ['Email', 'SMS'], 'audience' => 'Finance operations', 'status' => 'monitoring', 'note' => 'Settlement blockers surface before wholesaler or retailer payouts are released.'],
            ['external_id' => 'auto-1004', 'title' => 'Carrier exception retry', 'trigger_text' => 'FedEx or Steadfast sync attempt fails twice in sequence', 'channels' => ['In-app'], 'audience' => 'Delivery operations', 'status' => 'queued', 'note' => 'Background retry job escalates to a manual override queue if needed.'],
        ];
    }

    private function reportExports(): array
    {
        return [
            ['external_id' => 'ex-9101', 'report' => 'Sales summary', 'format' => 'CSV', 'requested_by_name' => 'Operations admin', 'scope' => 'Monthly overview', 'status' => 'ready', 'generated_at_label' => '2026-04-18 10:45'],
            ['external_id' => 'ex-9102', 'report' => 'Commission reconciliation', 'format' => 'PDF', 'requested_by_name' => 'Finance lead', 'scope' => 'Weekly payout pack', 'status' => 'generating', 'generated_at_label' => 'Started 6 mins ago'],
            ['external_id' => 'ex-9103', 'report' => 'Delivery exceptions', 'format' => 'CSV', 'requested_by_name' => 'Warehouse ops', 'scope' => 'FedEx and Steadfast delays', 'status' => 'queued', 'generated_at_label' => 'Queued 2 mins ago'],
        ];
    }

    private function activities(): array
    {
        return [
            ['audience_scope' => 'admin', 'title' => 'Wholesaler approved', 'detail' => 'Premium Goods LLC moved from pending to approved queue', 'logged_at_label' => '8 mins ago'],
            ['audience_scope' => 'admin', 'title' => 'Retailer review requested', 'detail' => 'Fresh Grocers still needs a valid tax document upload', 'logged_at_label' => '16 mins ago'],
            ['audience_scope' => 'admin', 'title' => 'Product listed', 'detail' => 'Yoga Mat Premium is now live inside the admin store catalog', 'logged_at_label' => '24 mins ago'],
            ['audience_scope' => 'admin', 'title' => 'Delivery updated', 'detail' => 'Order #3058 moved into customer delivery handoff', 'logged_at_label' => '31 mins ago'],
            ['audience_scope' => 'wholesaler', 'title' => 'Product approved', 'detail' => 'Smart Watch Active is live inside the approved product queue.', 'logged_at_label' => '12 mins ago'],
            ['audience_scope' => 'wholesaler', 'title' => 'Shipment updated', 'detail' => 'Order #2058 now shows carrier tracking for admin warehouse delivery.', 'logged_at_label' => '28 mins ago'],
            ['audience_scope' => 'wholesaler', 'title' => 'Withdrawal enabled', 'detail' => 'Settlement for order #2056 is now ready for withdrawal.', 'logged_at_label' => '48 mins ago'],
            ['audience_scope' => 'retailer', 'title' => 'Store launch prepared', 'detail' => 'Urban Living is in setup-pending mode while final domain and merchandising tasks are reviewed.', 'logged_at_label' => '14 mins ago'],
            ['audience_scope' => 'retailer', 'title' => 'Low stock alert', 'detail' => 'Smart Watch Active inventory dropped below the configured threshold.', 'logged_at_label' => '26 mins ago'],
            ['audience_scope' => 'retailer', 'title' => 'Withdrawal enabled', 'detail' => 'Retailer earnings for order #R3058 are now available for payout.', 'logged_at_label' => '48 mins ago'],
        ];
    }

    private function decorateProduct(array $attributes): array
    {
        $catalog = match ($attributes['name']) {
            'Wireless Earbuds Pro' => [
                'description' => 'Compact wireless earbuds with active noise cancellation, low-latency pairing, and all-day listening comfort.',
                'details' => 'A reliable everyday audio pick for commute, office, and workouts, with fast USB-C charging and a lightweight pocket-ready case.',
                'image_urls' => ['/images/homepage/Product1.jpg'],
                'specifications' => [
                    ['label' => 'Battery', 'value' => '32 hours with case'],
                    ['label' => 'Connectivity', 'value' => 'Bluetooth 5.3'],
                    ['label' => 'Feature', 'value' => 'Active noise cancellation'],
                ],
                'rating' => 4.7,
                'review_count' => 148,
                'discount' => 12,
            ],
            'Organic Coffee Beans' => [
                'description' => 'Medium roast whole beans with balanced chocolate notes and smooth low-acid extraction.',
                'details' => 'Roasted in small batches for espresso, pour-over, and French press brewing, with resealable freshness packaging.',
                'image_urls' => ['/images/homepage/Product2.jpg'],
                'specifications' => [
                    ['label' => 'Roast', 'value' => 'Medium'],
                    ['label' => 'Origin', 'value' => 'Single-origin blend'],
                    ['label' => 'Pack Size', 'value' => '500g'],
                ],
                'rating' => 4.6,
                'review_count' => 93,
                'discount' => 8,
            ],
            'Smart Watch Active' => [
                'description' => 'Fitness-first smartwatch with AMOLED display, health tracking, and quick-release sport bands.',
                'details' => 'Tracks workouts, heart rate, sleep, and notifications while staying comfortable enough for all-day wear.',
                'image_urls' => ['/images/homepage/Product1.jpg'],
                'specifications' => [
                    ['label' => 'Display', 'value' => '1.78-inch AMOLED'],
                    ['label' => 'Battery', 'value' => '7 days typical use'],
                    ['label' => 'Sensors', 'value' => 'Heart rate and SpO2'],
                ],
                'rating' => 4.8,
                'review_count' => 211,
                'discount' => 10,
            ],
            'Yoga Mat Premium', 'Premium Yoga Mat' => [
                'description' => 'High-grip yoga mat with dense cushioning and non-slip texture for home or studio training.',
                'details' => 'Designed for yoga, stretching, and floor workouts with enough support for long sessions.',
                'image_urls' => ['/images/homepage/Product3.jpg'],
                'specifications' => [
                    ['label' => 'Thickness', 'value' => '6 mm'],
                    ['label' => 'Material', 'value' => 'High-density TPE'],
                    ['label' => 'Use Case', 'value' => 'Yoga and mobility training'],
                ],
                'rating' => 4.5,
                'review_count' => 78,
                'discount' => 5,
            ],
            'Mini Blender Portable' => [
                'description' => 'Rechargeable mini blender for shakes, juices, and quick smoothie prep on the go.',
                'details' => 'Travel-friendly design with detachable bottle base and simple single-button operation.',
                'image_urls' => ['/images/homepage/Product2.jpg'],
                'specifications' => [
                    ['label' => 'Capacity', 'value' => '420 ml'],
                    ['label' => 'Charging', 'value' => 'USB-C'],
                    ['label' => 'Blade', 'value' => 'Stainless steel'],
                ],
                'rating' => 4.3,
                'review_count' => 52,
                'discount' => 6,
            ],
            'Desk Lamp Aura' => [
                'description' => 'Minimal desk lamp with warm and cool light modes for study, work, and bedside use.',
                'details' => 'Compact lighting option with adjustable neck and soft ambient glow for long evening sessions.',
                'image_urls' => ['/images/homepage/Product3.jpg'],
                'specifications' => [
                    ['label' => 'Brightness Modes', 'value' => '3 levels'],
                    ['label' => 'Power', 'value' => 'USB powered'],
                    ['label' => 'Finish', 'value' => 'Matte white'],
                ],
                'rating' => 4.4,
                'review_count' => 36,
                'discount' => 4,
            ],
            'Cheap Sunglasses' => [
                'description' => 'Budget sunglasses with casual styling and lightweight plastic frame.',
                'details' => 'Rejected sample listing retained for moderation history and correction workflows.',
                'image_urls' => ['/images/homepage/Product3.jpg'],
                'specifications' => [
                    ['label' => 'Frame', 'value' => 'Plastic'],
                    ['label' => 'Lens', 'value' => 'Tinted'],
                    ['label' => 'Protection', 'value' => 'Needs compliance review'],
                ],
                'rating' => 3.1,
                'review_count' => 14,
                'discount' => 0,
            ],
            'Plastic Lunch Box Set' => [
                'description' => 'Multi-compartment lunch set intended for meal prep and portable storage.',
                'details' => 'Rejected sample listing retained until the supplier completes compliance documentation.',
                'image_urls' => ['/images/homepage/Product2.jpg'],
                'specifications' => [
                    ['label' => 'Pieces', 'value' => '3 containers'],
                    ['label' => 'Material', 'value' => 'Food-grade plastic'],
                    ['label' => 'Microwave Safe', 'value' => 'Pending declaration'],
                ],
                'rating' => 3.5,
                'review_count' => 11,
                'discount' => 0,
            ],
            default => [
                'description' => "{$attributes['name']} is available through the ClickMaart commerce catalog.",
                'details' => 'This product inherits the shared commerce presentation used across the marketplace and storefront previews.',
                'image_urls' => ['/images/homepage/Product1.jpg'],
                'specifications' => [
                    ['label' => 'Category', 'value' => $attributes['category']],
                    ['label' => 'Fulfillment', 'value' => 'ClickMaart managed'],
                    ['label' => 'Availability', 'value' => 'Live catalog data'],
                ],
                'rating' => 4.4,
                'review_count' => 24,
                'discount' => 0,
            ],
        };

        return array_merge($catalog, $attributes);
    }

    private function decorateOrder(array $attributes, array $users): array
    {
        $customer = collect($users)->first(fn (User $user) => $user->id === ($attributes['customer_id'] ?? null));
        $shippingAddress = $attributes['shipping_address'] ?? $this->defaultShippingAddress($attributes['customer_name']);
        $shippingCity = $attributes['shipping_city'] ?? $this->inferCity($attributes['destination']);

        return array_merge([
            'customer_email' => $customer?->email,
            'customer_phone' => $customer?->phone,
            'shipping_address' => $shippingAddress,
            'shipping_city' => $shippingCity,
            'shipping_postal_code' => $attributes['shipping_postal_code'] ?? $this->defaultPostalCode($shippingCity),
            'payment_method' => 'Cash on Delivery',
            'line_items' => $attributes['line_items'] ?? $this->buildLineItemsForOrder($attributes['external_id']),
        ], $attributes);
    }

    private function buildLineItemsForOrder(string $externalId): array
    {
        return match ($externalId) {
            '3056' => [
                ['productId' => 'rc-1003', 'name' => 'Organic Coffee Beans', 'quantity' => 2, 'unitPrice' => 1550, 'image' => '/images/homepage/Product2.jpg'],
                ['productId' => 'rc-1004', 'name' => 'Premium Yoga Mat', 'quantity' => 1, 'unitPrice' => 3200, 'image' => '/images/homepage/Product3.jpg'],
            ],
            '3057', '3058', 'R3056', 'R3058' => [
                ['productId' => 'rc-1001', 'name' => 'Wireless Earbuds Pro', 'quantity' => 1, 'unitPrice' => 8600, 'image' => '/images/homepage/Product1.jpg'],
                ['productId' => 'rc-1002', 'name' => 'Smart Watch Active', 'quantity' => 1, 'unitPrice' => 12200, 'image' => '/images/homepage/Product1.jpg'],
            ],
            '3059' => [
                ['productId' => 'rc-1003', 'name' => 'Organic Coffee Beans', 'quantity' => 6, 'unitPrice' => 1550, 'image' => '/images/homepage/Product2.jpg'],
            ],
            '3060', 'R3060' => [
                ['productId' => 'rc-1002', 'name' => 'Smart Watch Active', 'quantity' => 1, 'unitPrice' => 12200, 'image' => '/images/homepage/Product1.jpg'],
            ],
            '3061', 'R3059', 'R3061' => [
                ['productId' => 'rc-1006', 'name' => 'Desk Lamp Aura', 'quantity' => 1, 'unitPrice' => 2550, 'image' => '/images/homepage/Product3.jpg'],
            ],
            '3062', '2056', '2057', '2058', '2059', '2060', '2061', 'R3057' => [
                ['productId' => 'rc-1001', 'name' => 'Wireless Earbuds Pro', 'quantity' => 1, 'unitPrice' => 8600, 'image' => '/images/homepage/Product1.jpg'],
            ],
            default => [
                ['productId' => 'rc-1001', 'name' => 'Wireless Earbuds Pro', 'quantity' => 1, 'unitPrice' => 8600, 'image' => '/images/homepage/Product1.jpg'],
            ],
        };
    }

    private function defaultShippingAddress(string $customerName): string
    {
        return "{$customerName}, House 12, Road 7, Dhaka";
    }

    private function inferCity(string $destination): string
    {
        foreach (['Dhaka', 'Chattogram', 'Sylhet', 'Khulna'] as $city) {
            if (str_contains($destination, $city)) {
                return $city;
            }
        }

        return 'Dhaka';
    }

    private function defaultPostalCode(string $city): string
    {
        return match ($city) {
            'Chattogram' => '4000',
            'Sylhet' => '3100',
            'Khulna' => '9000',
            default => '1212',
        };
    }
}
