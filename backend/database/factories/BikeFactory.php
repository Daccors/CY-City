<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\bike>
 */
class BikeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'localisations_id' => \App\Models\Localisation::factory(),
            'brand' => fake()->randomElement(['Trek', 'Giant', 'Specialized', 'Cannondale', 'Scott']),
            'type' => fake()->randomElement(['montagne', 'BMX', 'électrique', 'cyclo-cross']),
            'availability' => fake()->boolean(70),
        ];
    }
}