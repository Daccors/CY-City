<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class modify extends Model
{
    /** @use HasFactory<\Database\Factories\ModifyFactory> */
    use HasFactory;

    use HasFactory;

    protected $fillable = [
        'users_id',
        'users_id_2',
        'comments'
    ];

    public function userInitiating()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function userModified()
    {
        return $this->belongsTo(User::class, 'users_id_2');
    }
}
