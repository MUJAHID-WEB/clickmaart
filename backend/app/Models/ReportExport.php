<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportExport extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'report',
        'format',
        'requested_by_name',
        'scope',
        'status',
        'generated_at_label',
    ];
}
