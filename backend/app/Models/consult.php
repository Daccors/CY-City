<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class consult extends Model
{
    /** @use HasFactory<\Database\Factories\ConsultFactory> */
    use HasFactory;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function article()
    {
        return $this->belongsTo(Article::class, 'article_id');
    }
}
