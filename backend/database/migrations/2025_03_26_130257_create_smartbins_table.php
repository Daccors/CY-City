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
        Schema::create('smartbins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('localisations_id')->constrained('localisations');
            $table->float('capacity', 5, 2);
            $table->boolean('opened')->default(false);
            $table->date('last_collection');
            $table->enum('stat', ['on', 'off', 'updating']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('smartbins');
    }
};
