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
            $table->enum('type_of_content', ['nouvelle', 'météo', 'traffic', 'événement', 'pub']);
            $table->enum('stat', ['allumé', 'éteint', 'mise à jour']);
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
