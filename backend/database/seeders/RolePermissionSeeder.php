<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Création des rôles
    $admin = Role::create(['name' => 'admin']);
    $visiteur = Role::create(['name' => 'visiteur']);
    $simple = Role::create(['name' => 'simple']);
    $complexe = Role::create(['name' => 'complexe']);

    // Création des permissions
    $editProfil = Permission::create(['name' => 'edit-profil']);
    $connexion = Permission::create(['name' => 'connexion']);
    $editObject = Permission::create(['name' => 'edit-Object']);

    
    // Attribution des permissions aux rôles
    $simple->givePermissionTo($connexion);
    $simple->givePermissionTo($editProfil);
    $complexe->givePermissionTo($connexion);
    $complexe->givePermissionTo($editProfil);
    $complexe->givePermissionTo($editObject);

    }
}
