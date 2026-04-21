<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('profile_photo_path')->nullable()->after('business_document');
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->text('description')->nullable()->after('category');
            $table->text('details')->nullable()->after('description');
            $table->json('image_urls')->nullable()->after('details');
            $table->json('specifications')->nullable()->after('image_urls');
            $table->unsignedTinyInteger('discount')->default(0)->after('margin');
            $table->decimal('rating', 3, 2)->default(4.50)->after('discount');
            $table->unsignedInteger('review_count')->default(0)->after('rating');
        });

        Schema::table('orders', function (Blueprint $table): void {
            $table->string('customer_email')->nullable()->after('customer_name');
            $table->string('customer_phone')->nullable()->after('customer_email');
            $table->text('shipping_address')->nullable()->after('customer_phone');
            $table->string('shipping_city')->nullable()->after('shipping_address');
            $table->string('shipping_postal_code')->nullable()->after('shipping_city');
            $table->string('payment_method')->nullable()->after('shipping_postal_code');
            $table->json('line_items')->nullable()->after('payment_method');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropColumn([
                'customer_email',
                'customer_phone',
                'shipping_address',
                'shipping_city',
                'shipping_postal_code',
                'payment_method',
                'line_items',
            ]);
        });

        Schema::table('products', function (Blueprint $table): void {
            $table->dropColumn([
                'description',
                'details',
                'image_urls',
                'specifications',
                'discount',
                'rating',
                'review_count',
            ]);
        });

        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['profile_photo_path']);
        });
    }
};
