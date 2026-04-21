<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'external_id',
        'name',
        'email',
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
        'profile_photo_path',
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
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
        'otp_code',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at' => 'datetime',
            'documents_verified' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function stores()
    {
        return $this->hasMany(Store::class, 'owner_user_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'wholesaler_id');
    }

    public function retailerOrders()
    {
        return $this->hasMany(Order::class, 'retailer_id');
    }

    public function wholesalerOrders()
    {
        return $this->hasMany(Order::class, 'wholesaler_id');
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class, 'beneficiary_id');
    }

    public function scopeRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function getRouteKeyName(): string
    {
        return 'external_id';
    }
}
