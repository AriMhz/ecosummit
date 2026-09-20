<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->foreignId('package_id')->nullable()->constrained('packages')->nullOnDelete();
            $table->string('package_title');
            $table->string('package_slug')->nullable();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('country');
            $table->date('departure_date');
            $table->integer('travelers_count')->default(1);
            $table->string('room_preference')->nullable();
            $table->string('dietary_requirements')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->text('special_requests')->nullable();
            $table->enum('status', ['new', 'contacted', 'confirmed', 'completed', 'cancelled'])->default('new');
            $table->enum('payment_status', ['pending', 'deposit_paid', 'fully_paid', 'refunded'])->default('pending');
            $table->string('total_amount')->nullable();
            $table->text('internal_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
