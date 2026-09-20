<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use App\Models\RecentGallery;
use App\Models\Review;
use App\Models\TeamMember;
use App\Models\TravelGuide;
use Illuminate\Http\JsonResponse;

class ContentApiController extends Controller
{
    public function destinations(): JsonResponse
    {
        $destinations = Destination::orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $destinations,
        ]);
    }

    public function reviews(): JsonResponse
    {
        $reviews = Review::where('is_featured', true)->orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $reviews,
        ]);
    }

    public function team(): JsonResponse
    {
        $team = TeamMember::orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $team,
        ]);
    }

    public function galleries(): JsonResponse
    {
        $galleries = RecentGallery::where('is_active', true)->orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $galleries,
        ]);
    }

    public function guides(): JsonResponse
    {
        $guides = TravelGuide::orderBy('published_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $guides,
        ]);
    }
}
