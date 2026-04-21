<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackingEvent extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'leg',
        'carrier',
        'tracking_reference',
        'status',
        'location',
        'updated_label',
        'destination',
        'last_sync',
        'next_checkpoint',
        'note',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
