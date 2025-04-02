<?php

namespace App\Helpers;

use App\Models\Token;
use App\Models\Role;
use App\Models\Permission;

function checkPermissionByToken($token, $permissionName)
{
    // 1. Trouver le token en base de données
    $userToken = Token::where('token', $token)->first();

    if (!$userToken) {
        return false; // Token invalide
    }

    // 2. Récupérer l'utilisateur associé au token
    $user = $userToken->user;

    // 3. Vérifier si l'un des rôles de l'utilisateur possède la permission
    foreach ($user->roles as $role) {
        if ($role->permissions()->where('name', $permissionName)->exists()) {
            return true; // L'utilisateur a la permission
        }
    }

    return false; // L'utilisateur n'a pas la permission
}