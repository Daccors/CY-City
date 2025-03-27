<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SmartBin>
 */
class SmartBinFactory extends Factory
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
            'capacity' => fake()->randomFloat(2, 0, 100),
            'opened' => fake()->boolean(),
            'last_collection' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'stat' => fake()->randomElement(['on', 'off', 'updating']),
        ];
    }
}