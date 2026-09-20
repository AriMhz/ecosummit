<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingApiController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'package_slug' => 'nullable|string',
            'package_title' => 'required|string',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'country' => 'required|string|max:100',
            'departure_date' => 'required|date',
            'travelers_count' => 'required|integer|min:1',
            'room_preference' => 'nullable|string',
            'dietary_requirements' => 'nullable|string',
            'emergency_contact' => 'nullable|string',
            'special_requests' => 'nullable|string',
        ]);

        $package = null;
        if (!empty($validated['package_slug'])) {
            $package = Package::where('slug', $validated['package_slug'])->first();
        }

        $bookingCode = 'ECO-' . strtoupper(Str::random(6));

        $booking = Booking::create([
            'booking_code' => $bookingCode,
            'package_id' => $package ? $package->id : null,
            'package_title' => $validated['package_title'],
            'package_slug' => $validated['package_slug'] ?? null,
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'country' => $validated['country'],
            'departure_date' => $validated['departure_date'],
            'travelers_count' => $validated['travelers_count'],
            'room_preference' => $validated['room_preference'] ?? null,
            'dietary_requirements' => $validated['dietary_requirements'] ?? null,
            'emergency_contact' => $validated['emergency_contact'] ?? null,
            'special_requests' => $validated['special_requests'] ?? null,
            'status' => 'new',
            'payment_status' => 'pending',
            'total_amount' => $package ? $package->starting_price : null,
        ]);

        return response()->json([
            'success' => true,
            'booking_code' => $booking->booking_code,
            'message' => 'Your expedition booking request has been received. Our expedition team will review and confirm availability within 6 hours.',
            'data' => $booking,
        ], 201);
    }
}
