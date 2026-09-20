<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'highlights' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'journey_count' => 'integer',
    ];
}
