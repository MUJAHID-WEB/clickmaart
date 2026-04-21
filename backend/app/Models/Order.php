<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'source',
        'retailer_id',
        'wholesaler_id',
        'customer_id',
        'store_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_address',
        'shipping_city',
        'shipping_postal_code',
        'payment_method',
        'line_items',
        'customer_mask',
        'items_count',
        'gross_order_value',
        'cod_amount',
        'destination',
        'admin_eta_label',
        'current_stage',
        'admin_status',
        'wholesaler_status',
        'retailer_status',
        'cod_state',
        'inbound_carrier',
        'inbound_tracking',
        'outbound_carrier',
        'outbound_tracking',
        'platform_commission',
        'wholesaler_payable',
        'retailer_profit',
        'retailer_payable',
        'updated_label',
    ];

    protected function casts(): array
    {
        return [
            'gross_order_value' => 'decimal:2',
            'cod_amount' => 'decimal:2',
            'platform_commission' => 'decimal:2',
            'wholesaler_payable' => 'decimal:2',
            'retailer_profit' => 'decimal:2',
            'retailer_payable' => 'decimal:2',
            'line_items' => 'array',
        ];
    }

    public function retailer()
    {
        return $this->belongsTo(User::class, 'retailer_id');
    }

    public function wholesaler()
    {
        return $this->belongsTo(User::class, 'wholesaler_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function stageEvents()
    {
        return $this->hasMany(OrderStageEvent::class);
    }

    public function trackingEvents()
    {
        return $this->hasMany(TrackingEvent::class);
    }

    public function settlements()
    {
        return $this->hasMany(CommissionSettlement::class);
    }

    public function getRouteKeyName(): string
    {
        return 'external_id';
    }

    public function resolveRouteBinding($value, $field = null)
    {
        $normalized = ltrim((string) $value, '#');

        return $this->where($field ?? $this->getRouteKeyName(), $normalized)->firstOrFail();
    }
}
