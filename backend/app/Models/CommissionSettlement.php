<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionSettlement extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'order_id',
        'retailer_id',
        'wholesaler_id',
        'gross_order_value',
        'platform_commission',
        'wholesaler_payable',
        'retailer_profit',
        'retailer_payable',
        'cod_state',
        'payout_status',
        'released_at_label',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'gross_order_value' => 'decimal:2',
            'platform_commission' => 'decimal:2',
            'wholesaler_payable' => 'decimal:2',
            'retailer_profit' => 'decimal:2',
            'retailer_payable' => 'decimal:2',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function retailer()
    {
        return $this->belongsTo(User::class, 'retailer_id');
    }

    public function wholesaler()
    {
        return $this->belongsTo(User::class, 'wholesaler_id');
    }

    public function getRouteKeyName(): string
    {
        return 'external_id';
    }
}
