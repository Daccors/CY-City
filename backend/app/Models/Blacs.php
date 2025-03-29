<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blacs extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'age', 'email', 'is_active'];
}