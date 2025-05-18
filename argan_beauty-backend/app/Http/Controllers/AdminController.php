<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        return response()->json($admins);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:20',
            'email' => 'required|email|unique:admins,email|max:100',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'nullable|string|max:50',
            'permissions' => 'nullable|string',
            'numero_telephone' => 'nullable|integer',
        ]);

        $admin = Admin::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'mot_de_passe' => bcrypt($request->mot_de_passe),
            'role' => $request->role ?? 'admin',
            'permissions' => $request->permissions,
            'actif' => 1,
            'numero_telephone' => $request->numero_telephone,
        ]);

        return response()->json($admin, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $request->validate([
            'nom' => 'sometimes|required|string|max:100',
            'prenom' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|email|max:100|unique:admins,email,' . $id . ',id_admin',
            'mot_de_passe' => 'sometimes|required|string|min:6',
            'role' => 'nullable|string|max:50',
            'permissions' => 'nullable|string',
            'actif' => 'nullable|boolean',
            'numero_telephone' => 'nullable|integer',
        ]);

        $data = $request->all();
        if (isset($data['mot_de_passe'])) {
            $data['mot_de_passe'] = bcrypt($data['mot_de_passe']);
        }

        $admin->update($data);

        return response()->json($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(null, 204);
    }
}