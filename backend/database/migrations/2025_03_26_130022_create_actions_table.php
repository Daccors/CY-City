<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->on('users');
            $table->foreignId('delivering_drones_id')->on('delivering_drones')->nullable();
            $table->foreignId('smart_bins_id')->on('smart_bins')->nullable();
            $table->foreignId('information_screen_id')->on('information_screen')->nullable();
            $table->foreignId('parking_sensors_id')->on('parking_sensors')->nullable();
            $table->foreignId('smart_lamp_id')->on('smart_lamps')->nullable();
            $table->foreignId('bike_id')->on('bikes')->nullable();
            $table->enum('action_type', ['like', 'pin', 'consulté', 'création', 'modification']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
