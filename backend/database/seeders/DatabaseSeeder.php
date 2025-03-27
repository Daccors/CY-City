<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Article;
use App\Models\Bike;
use App\Models\DeliveringDrone;
use App\Models\SmartBin;
use App\Models\InformationScreen;
use App\Models\ParkingSensor;
use App\Models\SmartLamp;
use App\Models\Action;
use App\Models\Connection;
use App\Models\Consult;
use App\Models\Having;
use App\Models\Modify;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::factory()->count(10)->create();

        $articles = Article::factory()->count(5)->create();

        $connections = Connection::factory()->count(30)->create();

        $consults = Consult::factory()->count(25)->create();

        $havings = Having::factory()->count(20)->create();

        $modifies = Modify::factory()->count(15)->create();


        $count = 20;
        $objectTypes = [
            Bike::class => $count,
            DeliveringDrone::class => $count,
            SmartBin::class => $count,
            InformationScreen::class => $count,
            ParkingSensor::class => $count,
            SmartLamp::class => $count
        ];

        foreach ($objectTypes as $modelClass => $count) {
            $modelClass::factory()->count($count)->create();
        }

        $actions = Action::factory()->count(50)->create();
    }
}