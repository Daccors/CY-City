<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class smartlamp extends Model
{
    /** @use HasFactory<\Database\Factories\SmartlampFactory> */
    use HasFactory;

    protected $fillable = [
        'localisations_id',
        'stat',
        'intensity',
        'battery',
        'presence'
    ];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'smart_lamp_id');
    }
}
