<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class action extends Model
{
    /** @use HasFactory<\Database\Factories\ActionFactory> */
    use HasFactory;
    protected $fillable = [
        'users_id',
        'delivering_drones_id',
        'smart_bins_id',
        'information_screen_id',
        'parking_sensors_id',
        'smart_lamp_id',
        'bike_id',
        'action_type'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'users_id');
    }

    public function deliveringDrone(){
        return $this->belongsTo(DeliveringDrone::class, 'delivering_drones_id');
    }

    public function smartBin(){
        return $this->belongsTo(SmartBin::class, 'smart_bins_id');
    }

    public function informationScreen(){
        return $this->belongsTo(InformationScreen::class, 'information_screen_id');
    }

    public function parkingSensor(){
        return $this->belongsTo(ParkingSensor::class, 'parking_sensors_id');
    }

    public function smartLamp(){
        return $this->belongsTo(SmartLamp::class, 'smart_lamp_id');
    }

    public function bike(){
        return $this->belongsTo(Bike::class, 'bike_id');
    }
}
