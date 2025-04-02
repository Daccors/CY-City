<?php

namespace App\Services;

use Laravel\Sanctum\PersonalAccessToken;

class PermissionService
{
    public function checkPermissionFromToken(string $token, string $permissionName): bool
    {
        $accessToken = PersonalAccessToken::findToken($token);
        
        if (!$accessToken) {
            return false;
        }
        
        $user = $accessToken->tokenable;
        
        return $user->hasPermissionTo($permissionName);
    }
}
