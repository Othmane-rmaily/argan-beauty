<?php

namespace App\Http\Controllers;

use App\Models\Producteur;
use Illuminate\Http\Request;

class ProducteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $producteurs = Producteur::all();
        return response()->json($producteurs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_cooperative' => 'required|string|max:200',
            'region' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'certifications' => 'nullable|string|max:255',
            'contact_telephone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:100',
        ]);

        $producteur = Producteur::create($request->all());

        return response()->json($producteur, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $producteur = Producteur::findOrFail($id);
        return response()->json($producteur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $producteur = Producteur::findOrFail($id);

        $request->validate([
            'nom_cooperative' => 'sometimes|required|string|max:200',
            'region' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'certifications' => 'nullable|string|max:255',
            'contact_telephone' => 'nullable|string|max:20',
            'contact_email' => 'nullable|email|max:100',
        ]);

        $producteur->update($request->all());

        return response()->json($producteur);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $producteur = Producteur::findOrFail($id);
        $producteur->delete();

        return response()->json(null, 204);
    }

    /**
     * Get all products for a specific producer
     */
    public function produits($id)
    {
        $producteur = Producteur::findOrFail($id);
        $produits = $producteur->produits;
        
        return response()->json($produits);
    }
}
