<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localisation extends Model
{
    /** @use HasFactory<\Database\Factories\LocalisationFactory> */
    use HasFactory;

    protected $fillable = [
        'latitude',
        'longitude'
    ];

    public function bikes()
    {
        return $this->hasMany(Bike::class, 'localisations_id');
    }

    public function deliveringDrones()
    {
        return $this->hasMany(DeliveringDrone::class, 'localisations_id');
    }

    public function informationScreens()
    {
        return $this->hasMany(InformationScreen::class, 'localisations_id');
    }

    public function parkingSensors()
    {
        return $this->hasMany(ParkingSensor::class, 'localisations_id');
    }

    public function smartBins()
    {
        return $this->hasMany(SmartBin::class, 'localisations_id');
    }

    public function smartLamps()
    {
        return $this->hasMany(SmartLamp::class, 'localisations_id');
    }
}
