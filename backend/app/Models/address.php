<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class address extends Model
{
    /** @use HasFactory<\Database\Factories\AddressFactory> */
    use HasFactory;

    protected $fillable = [
        'number',
        'name'
    ];

    public function deliveringDrones()
    {
        return $this->hasMany(DeliveringDrone::class, 'addresses_id');
    }

    public function Users()
    {
        return $this->hasMany(User::class, 'addresses_id');
    }
}
