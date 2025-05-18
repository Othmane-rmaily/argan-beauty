<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cartItems = CartItem::all();
        return response()->json($cartItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_cart' => 'required|exists:cart,id_cart',
            'id_produit' => 'required|exists:produits,id_produit',
            'quantite' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::create([
            'id_cart' => $request->id_cart,
            'id_produit' => $request->id_produit,
            'quantite' => $request->quantite,
        ]);

        return response()->json($cartItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cartItem = CartItem::findOrFail($id);
        return response()->json($cartItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);

        $request->validate([
            'id_cart' => 'sometimes|required|exists:cart,id_cart',
            'id_produit' => 'sometimes|required|exists:produits,id_produit',
            'quantite' => 'sometimes|required|integer|min:1',
        ]);

        $cartItem->update($request->all());

        return response()->json($cartItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json(null, 204);
    }
}
