<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // 'featured_journeys', 'explore_categories', 'featured_destinations', 'grounded_leadership', 'recent_gallery', 'testimonials', 'travel_guide', 'hero'
            $table->string('badge')->nullable();
            $table->string('headline');
            $table->string('subheadline')->nullable();
            $table->text('description')->nullable();
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->json('media_items')->nullable(); // image urls or banners
            $table->json('settings')->nullable(); // custom layout settings or ids
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('homepage_sections');
    }
};
