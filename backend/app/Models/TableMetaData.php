<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableMetadata extends Model
{
    use HasFactory;

    protected $fillable = [
        'ObjectType',
        'atributs',
        'relevantAtt',
        'display',
        'display_formats',
        'icon',
    ];

    protected $casts = [
        'atributs' => 'array',
        'relevantAtt' => 'array',
        'display' => 'array',
        'display_formats' => 'array',
    ];
}