<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['general', 'plan_custom_trip'])->default('general');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('country')->nullable();
            $table->string('destination')->nullable();
            $table->foreignId('package_id')->nullable()->constrained('packages')->nullOnDelete();
            $table->string('preferred_date')->nullable();
            $table->string('duration_days')->nullable();
            $table->string('group_size')->nullable();
            $table->string('budget_range')->nullable();
            $table->string('travel_style')->nullable();
            $table->json('interests')->nullable();
            $table->text('message');
            $table->enum('status', ['new', 'contacted', 'completed', 'archived'])->default('new');
            $table->text('internal_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
