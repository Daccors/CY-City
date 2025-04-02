<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bike extends Model
{
    /** @use HasFactory<\Database\Factories\BikeFactory> */
    use HasFactory;

    protected $fillable = [
        'localisations_id',
        'brand',
        'type',
        'availability'
    ];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'bike_id');
    }
}
