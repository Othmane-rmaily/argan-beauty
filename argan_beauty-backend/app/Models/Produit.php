<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produits';
    protected $primaryKey = 'id_produit';
    public $timestamps = true;

    protected $fillable = [
        'nom_produit',
        'description_courte',
        'description_complete',
        'prix',
        'stock',
        'id_categorie',
        'origine',
        'certification',
        'poids',
        'unite_poids',
        'image_principale',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id_categorie', 'id_categorie');
    }

    public function producteurs()
    {
        return $this->belongsToMany(
            Producteur::class,
            'produit_producteur',
            'id_produit',
            'id_producteur'
        );
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'id_produit', 'id_produit');
    }
}
