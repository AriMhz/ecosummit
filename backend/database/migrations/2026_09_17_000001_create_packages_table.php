<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category'); // 'trek', 'tour', 'expedition'
            $table->string('region')->nullable();
            $table->string('activity')->nullable();
            $table->string('duration')->nullable();
            $table->integer('duration_days')->default(1);
            $table->string('difficulty')->default('Moderate');
            $table->string('max_altitude')->nullable();
            $table->string('best_season')->nullable();
            $table->string('group_size')->nullable();
            $table->string('starting_price')->nullable();
            $table->decimal('price_numeric', 10, 2)->nullable();
            $table->text('short_description')->nullable();
            $table->longText('overview')->nullable();
            $table->json('highlights')->nullable();
            $table->string('featured_image')->nullable();
            $table->json('gallery')->nullable();
            $table->string('route_map_image')->nullable();
            $table->string('video_id')->nullable();
            $table->string('transportation')->nullable();
            $table->string('start_end_point')->nullable();
            $table->string('accommodation_type')->nullable();
            $table->text('acclimatisation_plan')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
