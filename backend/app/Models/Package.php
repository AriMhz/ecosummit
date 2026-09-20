<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'highlights' => 'array',
        'gallery' => 'array',
        'is_featured' => 'boolean',
        'duration_days' => 'integer',
        'price_numeric' => 'decimal:2',
    ];

    public function itineraries(): HasMany
    {
        return $this->hasMany(Itinerary::class)->orderBy('day');
    }

    public function departures(): HasMany
    {
        return $this->hasMany(PackageDeparture::class)->orderBy('start_date');
    }

    public function inclusions(): HasMany
    {
        return $this->hasMany(PackageInclusion::class)->where('type', 'include')->orderBy('order');
    }

    public function exclusions(): HasMany
    {
        return $this->hasMany(PackageInclusion::class)->where('type', 'exclude')->orderBy('order');
    }

    public function allInclusions(): HasMany
    {
        return $this->hasMany(PackageInclusion::class)->orderBy('order');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(PackageFaq::class)->orderBy('order');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
