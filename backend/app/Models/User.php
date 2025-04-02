<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'surname',
        'photo',
        'name',
        'email',
        'gender',
        'birthdate',
        'status',
        'password',
        'level_id',
        'address_id'
    ];

    public function actions()
    {
        return $this->hasMany(Action::class, 'users_id');
    }

    public function connections()
    {
        return $this->hasMany(Connection::class, 'user_id');
    }

    public function consults()
    {
        return $this->hasMany(Consult::class, 'user_id');
    }

    public function makes()
    {
        return $this->hasMany(Make::class, 'users_id');
    }

    public function modifies()
    {
        return $this->hasMany(Modify::class, 'users_id');
    }

    public function havings()
    {
        return $this->hasMany(Having::class, 'users_id');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    public function roles()
{
    return $this->belongsToMany(Role::class, 'role_user');
}
}
