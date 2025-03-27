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
        Schema::create('information_screens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('localisations_id')->constrained('localisations');
            $table->enum('type_of_content', ['news', 'weather', 'traffic', 'events', 'ads']);
            $table->enum('stat', ['on', 'off', 'updating']);
            $table->date('last_content_update');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('information_screens');
    }
};
