<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('external_id')->nullable()->unique()->after('id');
            $table->string('phone')->nullable()->after('email');
            $table->string('role')->default('customer')->index()->after('phone');
            $table->string('business_name')->nullable()->after('role');
            $table->string('business_type')->nullable()->after('business_name');
            $table->string('category')->nullable()->after('business_type');
            $table->string('company')->nullable()->after('category');
            $table->string('trade_license')->nullable()->after('company');
            $table->string('designation')->nullable()->after('trade_license');
            $table->text('address')->nullable()->after('designation');
            $table->string('business_document')->nullable()->after('address');
            $table->string('status')->default('approved')->index()->after('business_document');
            $table->text('rejection_reason')->nullable()->after('status');
            $table->boolean('documents_verified')->default(false)->after('rejection_reason');
            $table->string('compliance_score')->nullable()->after('documents_verified');
            $table->unsignedInteger('products_count')->default(0)->after('compliance_score');
            $table->unsignedInteger('orders_count')->default(0)->after('products_count');
            $table->unsignedInteger('monthly_orders')->default(0)->after('orders_count');
            $table->string('last_active_label')->nullable()->after('monthly_orders');
            $table->string('since_label')->nullable()->after('last_active_label');
            $table->text('approval_note')->nullable()->after('since_label');
            $table->string('api_token', 80)->nullable()->unique()->after('remember_token');
            $table->string('otp_code', 12)->nullable()->after('api_token');
            $table->timestamp('otp_expires_at')->nullable()->after('otp_code');
        });

        Schema::create('stores', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->foreignId('owner_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('surface')->index();
            $table->string('owner_role');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('domain')->nullable()->unique();
            $table->string('status')->index();
            $table->unsignedInteger('products_count')->default(0);
            $table->unsignedInteger('monthly_orders')->default(0);
            $table->decimal('revenue', 12, 2)->default(0);
            $table->unsignedInteger('low_stock_count')->default(0);
            $table->string('dns_health')->nullable();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->text('note')->nullable();
            $table->string('support_email')->nullable();
            $table->string('support_phone')->nullable();
            $table->boolean('is_preview_ready')->default(true);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->foreignId('wholesaler_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('primary_store_id')->nullable()->constrained('stores')->nullOnDelete();
            $table->string('name');
            $table->string('category');
            $table->decimal('wholesale_price', 12, 2)->nullable();
            $table->decimal('selling_price', 12, 2)->nullable();
            $table->decimal('margin', 12, 2)->nullable();
            $table->unsignedInteger('stock')->default(0);
            $table->string('moderation_status')->default('pending')->index();
            $table->string('retailer_catalog_status')->nullable()->index();
            $table->string('listing_state')->default('not-listed');
            $table->boolean('listed')->default(false);
            $table->boolean('featured')->default(false);
            $table->text('admin_note')->nullable();
            $table->date('submitted_at')->nullable();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('source')->default('storefront');
            $table->foreignId('retailer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('wholesaler_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('store_id')->nullable()->constrained('stores')->nullOnDelete();
            $table->string('customer_name');
            $table->string('customer_mask')->nullable();
            $table->unsignedInteger('items_count')->default(1);
            $table->decimal('gross_order_value', 12, 2)->default(0);
            $table->decimal('cod_amount', 12, 2)->default(0);
            $table->string('destination');
            $table->string('admin_eta_label')->nullable();
            $table->string('current_stage')->nullable();
            $table->string('admin_status')->nullable()->index();
            $table->string('wholesaler_status')->nullable()->index();
            $table->string('retailer_status')->nullable()->index();
            $table->string('cod_state')->nullable();
            $table->string('inbound_carrier')->nullable();
            $table->string('inbound_tracking')->nullable();
            $table->string('outbound_carrier')->nullable();
            $table->string('outbound_tracking')->nullable();
            $table->decimal('platform_commission', 12, 2)->default(0);
            $table->decimal('wholesaler_payable', 12, 2)->default(0);
            $table->decimal('retailer_profit', 12, 2)->default(0);
            $table->decimal('retailer_payable', 12, 2)->default(0);
            $table->string('updated_label')->nullable();
            $table->timestamps();
        });

        Schema::create('order_stage_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('stage');
            $table->string('label');
            $table->string('owner');
            $table->string('event_at');
            $table->text('note')->nullable();
        });

        Schema::create('tracking_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('leg');
            $table->string('carrier');
            $table->string('tracking_reference');
            $table->string('status')->index();
            $table->string('location')->nullable();
            $table->string('updated_label')->nullable();
            $table->string('destination')->nullable();
            $table->string('last_sync')->nullable();
            $table->string('next_checkpoint')->nullable();
            $table->text('note')->nullable();
        });

        Schema::create('payouts', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('beneficiary_role')->index();
            $table->foreignId('beneficiary_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('gross_amount', 12, 2)->default(0);
            $table->decimal('commission', 12, 2)->default(0);
            $table->decimal('profit', 12, 2)->nullable();
            $table->decimal('payable', 12, 2)->default(0);
            $table->string('payout_status')->index();
            $table->string('released_at_label');
            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('commission_settlements', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('retailer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('wholesaler_id')->nullable()->constrained('users')->nullOnDelete();
            $table->decimal('gross_order_value', 12, 2)->default(0);
            $table->decimal('platform_commission', 12, 2)->default(0);
            $table->decimal('wholesaler_payable', 12, 2)->default(0);
            $table->decimal('retailer_profit', 12, 2)->default(0);
            $table->decimal('retailer_payable', 12, 2)->default(0);
            $table->string('cod_state')->nullable();
            $table->string('payout_status')->index();
            $table->string('released_at_label');
            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('automation_rules', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('title');
            $table->text('trigger_text');
            $table->json('channels');
            $table->string('audience');
            $table->string('status')->index();
            $table->text('note')->nullable();
            $table->timestamps();
        });

        Schema::create('report_exports', function (Blueprint $table): void {
            $table->id();
            $table->string('external_id')->unique();
            $table->string('report');
            $table->string('format');
            $table->string('requested_by_name');
            $table->string('scope');
            $table->string('status')->index();
            $table->string('generated_at_label');
            $table->timestamps();
        });

        Schema::create('activity_logs', function (Blueprint $table): void {
            $table->id();
            $table->string('audience_scope')->index();
            $table->string('title');
            $table->text('detail');
            $table->string('logged_at_label');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('report_exports');
        Schema::dropIfExists('automation_rules');
        Schema::dropIfExists('commission_settlements');
        Schema::dropIfExists('payouts');
        Schema::dropIfExists('tracking_events');
        Schema::dropIfExists('order_stage_events');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('stores');

        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn([
                'external_id',
                'phone',
                'role',
                'business_name',
                'business_type',
                'category',
                'company',
                'trade_license',
                'designation',
                'address',
                'business_document',
                'status',
                'rejection_reason',
                'documents_verified',
                'compliance_score',
                'products_count',
                'orders_count',
                'monthly_orders',
                'last_active_label',
                'since_label',
                'approval_note',
                'api_token',
                'otp_code',
                'otp_expires_at',
            ]);
        });
    }
};
