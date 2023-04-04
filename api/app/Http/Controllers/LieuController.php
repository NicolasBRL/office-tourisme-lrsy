<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lieu\StoreUpdateRequest;
use App\Models\Lieu;
use Illuminate\Http\Request;

class LieuController extends Controller
{

    public function index()
    {
        $lieux = Lieu::with('categories')->get()->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Liste des lieux',
            'lieux' => $lieux
        ]);
    }

    public function store(StoreUpdateRequest $request)
    {
        $lieux = Lieu::create($request->all());

        foreach($request->categories as $category){
            $lieux->categories()->attach($category);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lieu créé',
            'lieux' => $lieux
        ]);
    }

    public function show(Lieu $lieu)
    {
        $lieu->categories = $lieu->categories;
        return response()->json([
            'success' => true,
            'message' => 'Affichage du lieu',
            'lieu' => $lieu
        ]);
    }

    public function update(StoreUpdateRequest $request, Lieu $lieu)
    {
        $lieu->update($request->all());

        $lieu->categories()->sync($request->categories);

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
