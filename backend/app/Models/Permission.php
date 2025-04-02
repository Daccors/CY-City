<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relation avec les rôles
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permission');
    }
}
