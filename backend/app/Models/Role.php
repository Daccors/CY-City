<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relation avec les permissions (un rôle a plusieurs permissions)
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }

    // Relation avec les utilisateurs (un rôle appartient à plusieurs utilisateurs)
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user');
    }
}
