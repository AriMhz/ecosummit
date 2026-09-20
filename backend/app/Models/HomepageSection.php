<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageSection extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'media_items' => 'array',
        'settings' => 'array',
        'is_active' => 'boolean',
    ];
}
