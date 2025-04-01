<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\action>
 */
class ActionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $objects = [
            'delivering_drones_id' => \App\Models\DeliveringDrone::inRandomOrder()->first()?->id,
            'smart_bins_id' => \App\Models\SmartBin::inRandomOrder()->first()?->id,
            'information_screen_id' => \App\Models\InformationScreen::inRandomOrder()->first()?->id,
            'parking_sensors_id' => \App\Models\ParkingSensor::inRandomOrder()->first()?->id,
            'smart_lamp_id' => \App\Models\SmartLamp::inRandomOrder()->first()?->id,
            'bike_id' => \App\Models\Bike::inRandomOrder()->first()?->id,
        ];
        $key = array_rand($objects);
        
        return [
            'users_id' => \App\Models\User::inRandomOrder()->first()?->id,
            $key => $objects[$key], 
            'action_type' => fake()->randomElement(['like', 'pin', 'consulté', 'création', 'modification']),
        ];
    }
}