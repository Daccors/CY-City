<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationScreen extends Model
{
    /** @use HasFactory<\Database\Factories\InformationScreenFactory> */
    use HasFactory;

    protected $fillable = [
        'localisations_id',
        'type_of_content',
        'stat',
        'last_content_update'
    ];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisations_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class, 'information_screen_id');
    }
}
