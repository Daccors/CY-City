<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class article extends Model{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'photo',
        'author',
        'description',
        'content',
        'keyword'
    ];

    public function consults(){
        return $this->hasMany(Consult::class, 'article_id');
    }
}
