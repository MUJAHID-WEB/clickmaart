<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStageEvent extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'stage',
        'label',
        'owner',
        'event_at',
        'note',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
