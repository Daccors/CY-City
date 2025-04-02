<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveringDrone extends Model
{
    /** @use HasFactory<\Database\Factories\DeliveringDroneFactory> */
    use HasFactory;

    protected $fillable = [
        'addresses_id',
        'localisations_id',
        'stat',
        'batterie',
        'capacity',
        'departure',
        'estimated_arrival_time'
    ];

    public function address()
    {
        return $this->belongsTo(Address::class, 'addresses_id');
    }

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'delivering_drones_id');
    }
}
