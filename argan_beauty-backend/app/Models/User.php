<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_user';
    public $timestamps = false;
    
    // Map Laravel's default timestamp to the custom column in database
    const CREATED_AT = 'date_inscription';
    const UPDATED_AT = null;

    protected $fillable = [
        'nom',
        'prenom',
        'numero_telephone',
        'email',
        'mot_de_passe',
        'name', // for compatibility with Breeze
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];
    
    /**
     * The attributes that should be treated as passwords.
     *
     * @var array
     */
    protected $passwordAttributes = ['mot_de_passe'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        // Removed 'mot_de_passe' => 'hashed' to prevent double hashing
    ];

    /**
     * Set the user's password.
     * This mutator ensures that when 'password' is set, it's saved to 'mot_de_passe'
     *
     * @param  string  $value
     * @return void
     */
public function setMotDePasseAttribute($value)
    {
        if ($value) {
            $this->attributes['mot_de_passe'] = bcrypt($value);
        }
    }

    public function carts()
    {
        return $this->hasMany(Cart::class, 'id_user', 'id_user');
    }
    // Accessor for 'name' to combine nom and prenom
    public function getNameAttribute()
    {
        return trim($this->nom . ' ' . $this->prenom);
    }
    
    /**
     * Get the password for the user.
     * This method is required by Laravel's authentication system.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
    
    /**
     * Set the user's password.
     * This mutator ensures that when 'password' is set, it's saved to 'mot_de_passe'
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->setMotDePasseAttribute($value);
    }
}
