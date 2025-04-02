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
use App\Models\Role;
use App\Models\Permission;

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
        
        // Créer les rôles
        $adminRole = Role::create(['name' => 'admin']);
        $simpleRole = Role::create(['name' => 'simple']);
        $complexeRole = Role::create(['name' => 'complexe']);
        $visiteurRole = Role::create(['name' => 'visiteur']);

        // Créer les permissions
        $editProfil = Permission::create(['name' => 'edit-profil']);
        $article = Permission::create(['name' => 'article']);
        $editObject = Permission::create(['name' => 'edit-Object']);
        $Profil = Permission::create(['name' => 'Profil']);
        $Object = Permission::create(['name' => 'Object']);

        // Associer les permissions aux rôles
        $adminRole->permissions()->attach([$editProfil->id, $article->id, $editObject->id, $Profil->id, $Object->id]);
        $simpleRole->permissions()->attach([$editProfil->id, $article->id, $Profil->id, $Object->id]);
        $complexeRole->permissions()->attach([$editProfil->id, $article->id, $editObject->id, $Profil->id, $Object->id]);
        $visiteurRole->permissions()->attach([$article->id]);
    }
}