<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'owner_user_id',
        'surface',
        'owner_role',
        'name',
        'slug',
        'domain',
        'status',
        'products_count',
        'monthly_orders',
        'revenue',
        'low_stock_count',
        'dns_health',
        'tagline',
        'description',
        'note',
        'support_email',
        'support_phone',
        'is_preview_ready',
    ];

    protected function casts(): array
    {
        return [
            'revenue' => 'decimal:2',
            'is_preview_ready' => 'boolean',
        ];
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'primary_store_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function getRouteKeyName(): string
    {
        return 'external_id';
    }
}
