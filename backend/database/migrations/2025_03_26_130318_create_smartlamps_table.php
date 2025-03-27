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
        Schema::create('smartlamps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('localisations_id')->constrained('localisations');
            $table->enum('stat', ['on', 'off', 'updating']);
            $table->float('intensity', 5, 2);
            $table->float('battery', 5, 2);
            $table->boolean('presence')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smartlamps');
    }
};
