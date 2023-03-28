<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categorie\StoreUpdateRequest;
use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index()
    {
        $categories = Categorie::with('lieux')->get()->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Liste des catégories',
            'categories' => $categories
        ]);
    }

    public function store(StoreUpdateRequest $request)
    {
        $categorie = Categorie::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Catégorie créée',
            'categorie' => $categorie
        ]);
    }

    public function show(Categorie $categorie)
    {
        $categorie->lieux = $categorie->lieux;
        return response()->json([
            'success' => true,
            'message' => 'Affichage de la catégorie',
            'categorie' => $categorie
        ]);
    }

    public function update(StoreUpdateRequest $request, Categorie $categorie)
    {
        $categorie->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Catégorie modifiée',
            'categorie' => $categorie
        ]);
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return response()->json([
            'success' => true,
            'message' => 'Catégorie supprimée',
        ]);
    }
}
