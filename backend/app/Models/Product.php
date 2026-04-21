<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'wholesaler_id',
        'primary_store_id',
        'name',
        'category',
        'description',
        'details',
        'image_urls',
        'specifications',
        'wholesale_price',
        'selling_price',
        'margin',
        'discount',
        'rating',
        'review_count',
        'stock',
        'moderation_status',
        'retailer_catalog_status',
        'listing_state',
        'listed',
        'featured',
        'admin_note',
        'submitted_at',
    ];

    protected function casts(): array
    {
        return [
            'wholesale_price' => 'decimal:2',
            'selling_price' => 'decimal:2',
            'margin' => 'decimal:2',
            'image_urls' => 'array',
            'specifications' => 'array',
            'discount' => 'integer',
            'rating' => 'decimal:2',
            'review_count' => 'integer',
            'listed' => 'boolean',
            'featured' => 'boolean',
            'submitted_at' => 'date',
        ];
    }

    public function wholesaler()
    {
        return $this->belongsTo(User::class, 'wholesaler_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'primary_store_id');
    }

    public function getRouteKeyName(): string
    {
        return 'external_id';
    }
}
