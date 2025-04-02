<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class parkingsensor extends Model
{
    /** @use HasFactory<\Database\Factories\ParkingsensorFactory> */
    use HasFactory;

    protected $fillable = [
        'localisations_id',
        'availability'
    ];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'parking_sensors_id');
    }
}
