<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payout extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'order_id',
        'beneficiary_role',
        'beneficiary_id',
        'gross_amount',
        'commission',
        'profit',
        'payable',
        'payout_status',
        'released_at_label',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2',
            'commission' => 'decimal:2',
            'profit' => 'decimal:2',
            'payable' => 'decimal:2',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function beneficiary()
    {
        return $this->belongsTo(User::class, 'beneficiary_id');
    }
}
