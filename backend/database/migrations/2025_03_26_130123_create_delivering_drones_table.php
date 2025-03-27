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
        Schema::create('delivering_drones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('addresses_id')->constrained('addresses');
            $table->foreignId('localisations_id')->constrained('localisations');
            $table->enum('stat', ['on', 'off', 'updating']);
            $table->float('batterie', 4, 2);
            $table->float('capacity', 4, 2);
            $table->time('departure');
            $table->time('estimated_arrival_time');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivering_drones');
    }
};
