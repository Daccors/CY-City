<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class having extends Model
{
    /** @use HasFactory<\Database\Factories\HavingFactory> */
    use HasFactory;

    protected $fillable = [
        'users_id',
        'connection_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function connection()
    {
        return $this->belongsTo(Connection::class, 'connection_id');
    }
}
