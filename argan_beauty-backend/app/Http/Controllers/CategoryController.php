<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_categorie' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $category = Category::create([
            'nom_categorie' => $request->nom_categorie,
            'description' => $request->description,
        ]);

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'nom_categorie' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(null, 204);
    }

    /**
     * Get all products for a specific category
     */
    public function produits($id)
    {
        $category = Category::findOrFail($id);
        $produits = $category->produits;
        
        return response()->json($produits);
    }
    
    /**
     * Search for categories by name or description
     */
    public function search(Request $request)
    {
        $query = $request->input('q');
        
        $categories = Category::where('nom_categorie', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->get();
            
        return response()->json($categories);
    }
}
