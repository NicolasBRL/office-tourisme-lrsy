<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lieu\StoreUpdateRequest;
use App\Models\Lieu;
use Illuminate\Http\Request;

class LieuController extends Controller
{

    public function index()
    {
        $lieux = Lieu::with('categorie')->get()->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Liste des lieux',
            'lieux' => $lieux
        ]);
    }

    public function store(StoreUpdateRequest $request)
    {
        $lieux = Lieu::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Lieu créé',
            'lieux' => $lieux
        ]);
    }

    public function show(Lieu $lieu)
    {
        $lieu->categorie = $lieu->categorie;
        return response()->json([
            'success' => true,
            'message' => 'Affichage du lieu',
            'lieu' => $lieu
        ]);
    }

    public function update(StoreUpdateRequest $request, Lieu $lieu)
    {
        $lieu->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Lieu modifié',
            'lieu' => $lieu
        ]);
    }

    public function destroy(Lieu $lieu)
    {
        $lieu->delete();
        return response()->json([
            'success' => true,
            'message' => 'Lieu supprimée',
        ]);
    }
}
