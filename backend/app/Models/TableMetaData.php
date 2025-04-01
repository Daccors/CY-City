<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableMetaData extends Model
{
    use HasFactory;

    protected $fillable = [
        'ObjectType',
        'atributs',
        'relevantAtt',
        'display',
        'displayFormats',
        'icon',
    ];

    protected $casts = [
        'atributs' => 'array',
        'relevantAtt' => 'array',
        'display' => 'array',
        'displayFormats' => 'array',
    ];
}