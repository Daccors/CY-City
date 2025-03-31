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
    $editArticles = Permission::create(['name' => 'edit-articles']);
    
    // Attribution des permissions aux rôles
    $admin->givePermissionTo($editArticles);
    }
}
