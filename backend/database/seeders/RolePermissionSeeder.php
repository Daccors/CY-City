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
    $article = Permission::create(['name' => 'article']);
    $editObject = Permission::create(['name' => 'edit-Object']);
    $Profil = Permission::create(['name' => 'Profil']);
    $Object = Permission::create(['name' => 'Object']);

    
    // Attribution des permissions aux rôles
    $visiteur->givePermissionsTo($article);
    $simple->givePermissionTo($article);
    $simple->givePermissionTo($Profil);
    $simple->givePermissionTo($editProfil);
    $simple->givePermissionTo($Object);
    $complexe->givePermissionTo($article);
    $complexe->givePermissionTo($Profil);
    $complexe->givePermissionTo($Object);
    $complexe->givePermissionTo($editProfil);
    $complexe->givePermissionTo($editObject);
    $admin->givePermissionTo($article);
    $admin->givePermissionTo($Profil);
    $admin->givePermissionTo($Object);
    $admin->givePermissionTo($editProfil);
    $admin->givePermissionTo($editObject);
    }
}
