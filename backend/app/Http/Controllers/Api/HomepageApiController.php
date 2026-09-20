<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomepageSection;
use Illuminate\Http\JsonResponse;

class HomepageApiController extends Controller
{
    public function index(): JsonResponse
    {
        $sections = HomepageSection::where('is_active', true)->get()->keyBy('section_key');

        return response()->json([
            'success' => true,
            'data' => $sections,
        ]);
    }
}
