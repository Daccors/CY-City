<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class smartbin extends Model
{
    /** @use HasFactory<\Database\Factories\SmartbinFactory> */
    use HasFactory;

    protected $fillable = [
        'localisations_id',
        'capacity',
        'opened',
        'last_collection',
        'stat'
    ];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'smart_bins_id');
    }
}
