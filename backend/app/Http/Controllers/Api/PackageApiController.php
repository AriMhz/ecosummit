<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PackageApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Package::query()->with(['itineraries', 'departures', 'allInclusions', 'faqs']);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('region')) {
            $query->where('region', 'like', '%' . $request->region . '%');
        }

        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('overview', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%");
            });
        }

        $packages = $query->orderBy('order', 'asc')->get()->map(function ($pkg) {
            return $this->formatPackage($pkg);
        });

        return response()->json([
            'success' => true,
            'count' => $packages->count(),
            'data' => $packages,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $package = Package::with(['itineraries', 'departures', 'allInclusions', 'faqs'])
            ->where('slug', $slug)
            ->first();

        if (!$package) {
            return response()->json([
                'success' => false,
                'message' => 'Package not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatPackage($package),
        ]);
    }

    private function formatPackage(Package $pkg): array
    {
        return [
            'id' => $pkg->id,
            'slug' => $pkg->slug,
            'title' => $pkg->title,
            'category' => $pkg->category,
            'region' => $pkg->region,
            'activity' => $pkg->activity,
            'duration' => $pkg->duration,
            'durationDays' => $pkg->duration_days,
            'difficulty' => $pkg->difficulty,
            'maxAltitude' => $pkg->max_altitude,
            'bestSeason' => $pkg->best_season,
            'groupSize' => $pkg->group_size,
            'startingPrice' => $pkg->starting_price,
            'shortDescription' => $pkg->short_description,
            'overview' => $pkg->overview,
            'highlights' => $pkg->highlights ?: [],
            'featuredImage' => $pkg->featured_image,
            'gallery' => $pkg->gallery ?: [],
            'routeMapImage' => $pkg->route_map_image,
            'videoId' => $pkg->video_id,
            'transportation' => $pkg->transportation,
            'startEndPoint' => $pkg->start_end_point,
            'accommodationType' => $pkg->accommodation_type,
            'acclimatisationPlan' => $pkg->acclimatisation_plan,
            'isFeatured' => (bool) $pkg->is_featured,
            'itinerary' => $pkg->itineraries->map(function ($it) {
                return [
                    'day' => $it->day,
                    'title' => $it->title,
                    'altitude' => $it->altitude,
                    'duration' => $it->duration,
                    'description' => $it->description,
                    'accommodation' => $it->accommodation,
                    'meals' => $it->meals,
                ];
            }),
            'inclusions' => $pkg->inclusions->pluck('item')->toArray(),
            'exclusions' => $pkg->exclusions->pluck('item')->toArray(),
            'faqs' => $pkg->faqs->map(function ($f) {
                return [
                    'question' => $f->question,
                    'answer' => $f->answer,
                ];
            }),
            'fixedDepartures' => $pkg->departures->map(function ($d) {
                return [
                    'id' => (string) $d->id,
                    'startDate' => $d->start_date ? $d->start_date->format('Y-m-d') : '',
                    'endDate' => $d->end_date ? $d->end_date->format('Y-m-d') : '',
                    'price' => $d->price,
                    'status' => $d->status,
                    'seatsLeft' => $d->seats_left,
                ];
            }),
        ];
    }
}
