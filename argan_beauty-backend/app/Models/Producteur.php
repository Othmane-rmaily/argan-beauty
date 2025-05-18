<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producteur extends Model
{
    use HasFactory;

    protected $table = 'producteurs';
    protected $primaryKey = 'id_producteur';
    public $timestamps = true;

    protected $fillable = [
        'nom_cooperative',
        'region',
        'description',
        'certifications',
        'contact_telephone',
        'contact_email',
    ];

    public function produits()
    {
        return $this->belongsToMany(
            Produit::class,
            'produit_producteur',
            'id_producteur',
            'id_produit'
        );
    }
}
