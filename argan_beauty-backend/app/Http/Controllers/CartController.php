<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Cart::with('cartItems')->get();
        return response()->json($carts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|exists:users,id_user',
        ]);

        $cart = Cart::create([
            'id_user' => $request->id_user,
        ]);

        return response()->json($cart, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cart = Cart::with('cartItems')->findOrFail($id);
        return response()->json($cart);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $cart = Cart::findOrFail($id);

        $request->validate([
            'id_user' => 'sometimes|required|exists:users,id_user',
        ]);

        $cart->update($request->all());

        return response()->json($cart);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();

        return response()->json(null, 204);
    }

    /**
     * Get the cart for a specific user
     */
    public function getUserCart($id)
    {
        $cart = Cart::where('id_user', $id)
            ->with(['cartItems.produit'])
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'No cart found for this user'], 404);
        }

        return response()->json($cart);
    }
}
