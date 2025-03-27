<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\delivering_drone;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeliveringDrones>
 */
class DeliveringDroneFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departure = fake()->time('H:i:s');
        $departureDateTime = \DateTime::createFromFormat('H:i:s', $departure);
        $estimatedArrival = clone $departureDateTime;
        $estimatedArrival->modify('+' . rand(30, 120) . ' minutes');

        return [
            'addresses_id' => \App\Models\Address::factory(),
            'localisations_id' => \App\Models\Localisation::factory(),
            'stat' => fake()->randomElement(['on', 'off', 'updating']),
            'batterie' => fake()->randomFloat(2, 0, 100),
            'capacity' => fake()->randomFloat(2, 0, 9.99),
            'departure' => $departure,
            'estimated_arrival_time' => $estimatedArrival->format('H:i:s'), 
        ];
    }
}