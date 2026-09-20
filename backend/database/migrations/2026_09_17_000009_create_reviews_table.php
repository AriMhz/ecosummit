<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('author_name');
            $table->string('author_country')->nullable();
            $table->string('author_avatar')->nullable();
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->string('trek_name')->nullable();
            $table->string('title')->nullable();
            $table->text('comment');
            $table->string('review_date')->nullable();
            $table->boolean('is_verified')->default(true);
            $table->boolean('is_featured')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
