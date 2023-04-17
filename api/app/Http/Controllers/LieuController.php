<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lieu\StoreUpdateRequest;
use App\Models\ImageLieu;
use App\Models\Lieu;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class LieuController extends Controller
{

    public function index()
    {
        $lieux = Lieu::with('categories', 'images')->get()->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Liste des lieux',
            'lieux' => $lieux
        ]);
    }

    public function store(StoreUpdateRequest $request)
    {
        $lieu = Lieu::create($request->all());

        foreach($request->categories as $category){
            $lieu->categories()->attach($category);
        }

        // Gestion des images si y'a
        if ($request->hasFile('imagesLieu')) {
            foreach($request->file('imagesLieu') as $file) {
                $filenameWithExt = $file->getClientOriginalName();
                $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);

                $extension = $file->getClientOriginalExtension();

                $fileName = $filenameWithoutExt . '_' . time() . '.' . $extension;

                $path = $file->storeAs('public/uploads', $fileName);

                $imageLieu = ImageLieu::create([
                    'url' => "uploads/$fileName",
                    'lieu_id' => $lieu->id
                ]);

            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Lieu créé',
            'lieu' => $lieu,
        ]);
    }

    public function show(Lieu $lieu)
    {
        $lieu->categories = $lieu->categories;
        $lieu->images = $lieu->images;
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

        // Gestion des images si y'a
        if ($request->hasFile('imagesLieu')) {
            foreach($request->file('imagesLieu') as $file) {
                $filenameWithExt = $file->getClientOriginalName();
                $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);

                $extension = $file->getClientOriginalExtension();

                $fileName = $filenameWithoutExt . '_' . time() . '.' . $extension;

                $path = $file->storeAs('public/uploads', $fileName);

                $imageLieu = ImageLieu::create([
                    'url' => "uploads/$fileName",
                    'lieu_id' => $lieu->id
                ]);
            }
        }

        if ($request->has('removedFiles')){
            foreach ($request->removedFiles as $removed){
                $image = ImageLieu::find($removed);
                $image->delete();
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Lieu modifié',
            'lieu' => $lieu,
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
