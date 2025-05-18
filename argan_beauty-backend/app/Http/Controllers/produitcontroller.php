<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = Produit::with('category')->get();
        return response()->json($produits);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_produit' => 'required|string|max:200',
            'description_courte' => 'nullable|string|max:255',
            'description_complete' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'id_categorie' => 'nullable|exists:categories,id_categorie',
            'origine' => 'nullable|string|max:100',
            'certification' => 'nullable|string|max:100',
            'poids' => 'nullable|numeric|min:0',
            'unite_poids' => 'nullable|string|max:20',
            'image_principale' => 'nullable|string|max:255',
        ]);

        $produit = Produit::create($request->all());

        return response()->json($produit, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produit = Produit::with('category')->findOrFail($id);
        return response()->json($produit);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $request->validate([
            'nom_produit' => 'sometimes|required|string|max:200',
            'description_courte' => 'nullable|string|max:255',
            'description_complete' => 'nullable|string',
            'prix' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
            'id_categorie' => 'nullable|exists:categories,id_categorie',
            'origine' => 'nullable|string|max:100',
            'certification' => 'nullable|string|max:100',
            'poids' => 'nullable|numeric|min:0',
            'unite_poids' => 'nullable|string|max:20',
            'image_principale' => 'nullable|string|max:255',
        ]);

        $produit->update($request->all());

        return response()->json($produit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return response()->json(null, 204);
    }
    
    /**
     * Search for products by name or description
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        $produits = Produit::where('nom_produit', 'like', "%{$query}%")
            ->orWhere('description_courte', 'like', "%{$query}%")
            ->orWhere('description_complete', 'like', "%{$query}%")
            ->with('category')
            ->get();
            
        return response()->json($produits);
    }
}
