<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutomationRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'title',
        'trigger_text',
        'channels',
        'audience',
        'status',
        'note',
    ];

    protected function casts(): array
    {
        return [
            'channels' => 'array',
        ];
    }
}
