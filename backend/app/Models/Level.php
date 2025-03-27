<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'points'
    ];

    public function unlockings()
    {
        return $this->hasMany(Unlocking::class, 'level_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'level_id');
    }
}
