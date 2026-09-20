<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InquiryApiController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'nullable|in:general,plan_custom_trip',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'country' => 'nullable|string|max:100',
            'destination' => 'nullable|string',
            'package_id_or_slug' => 'nullable|string',
            'preferred_date' => 'nullable|string',
            'duration_days' => 'nullable|string',
            'group_size' => 'nullable|string',
            'budget_range' => 'nullable|string',
            'travel_style' => 'nullable|string',
            'interests' => 'nullable|array',
            'message' => 'required|string',
        ]);

        $packageId = null;
        if (!empty($validated['package_id_or_slug'])) {
            $pkg = Package::where('slug', $validated['package_id_or_slug'])
                ->orWhere('id', $validated['package_id_or_slug'])
                ->first();
            if ($pkg) {
                $packageId = $pkg->id;
            }
        }

        $inquiry = Inquiry::create([
            'type' => $validated['type'] ?? 'general',
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'country' => $validated['country'] ?? null,
            'destination' => $validated['destination'] ?? null,
            'package_id' => $packageId,
            'preferred_date' => $validated['preferred_date'] ?? null,
            'duration_days' => $validated['duration_days'] ?? null,
            'group_size' => $validated['group_size'] ?? null,
            'budget_range' => $validated['budget_range'] ?? null,
            'travel_style' => $validated['travel_style'] ?? null,
            'interests' => $validated['interests'] ?? [],
            'message' => $validated['message'],
            'status' => 'new',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you! Your inquiry has been sent to our Himalayan planners. We will craft your custom itinerary within 24 hours.',
            'data' => $inquiry,
        ], 201);
    }
}
