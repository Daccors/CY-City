<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\smart_lamp>
 */
class SmartLampFactory extends Factory
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
            'stat' => fake()->randomElement(['on', 'off', 'updating']),
            'intensity' => fake()->randomFloat(2, 0, 100),
            'battery' => fake()->randomFloat(2, 0, 100),
            'presence' => fake()->boolean(),
        ];
    }
}