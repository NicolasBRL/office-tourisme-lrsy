<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json([
            'success' => true,
            'message' => 'Liste des utilisateurs',
            'users' => $users
        ]);
    }

    public function store(StoreRequest $request)
    {
        $user = User::create(array_merge($request->all(), [
            'password' => Hash::make($request->password)
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur créé',
            'user' => $user
        ]);
    }

    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'message' => 'Affichage utilisateur',
            'user' => $user
        ]);
    }

    public function update(UpdateRequest $request, User $user)
    {
        $user->update(array_merge($request->all(), [
            'password' => ($request->has('password')) ? Hash::make($request->password) : $user->password
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Utilisateur modifié',
            'user' => $user
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Utilisateur supprimé',
        ]);
    }
}
