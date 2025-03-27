<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\information_screen>
 */
class InformationScreenFactory extends Factory
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
            'type_of_content' => fake()->randomElement(['news', 'weather', 'traffic', 'events', 'ads']),
            'stat' => fake()->randomElement(['on', 'off', 'updating']),
            'last_content_update' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
        ];
    }
}