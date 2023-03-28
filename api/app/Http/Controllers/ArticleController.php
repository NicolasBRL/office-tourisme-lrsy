<?php

namespace App\Http\Controllers;

use App\Http\Requests\Article\StoreRequest;
use App\Http\Requests\Article\UpdateRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('lieu')->get()->toArray();

        return response()->json([
            'success' => true,
            'message' => 'Liste des Articles',
            'articles' => $articles
        ]);
    }

    public function store(StoreRequest $request)
    {

        // On récupère le nom du fichier avec son extension
        $filenameWithExt = $request->file('url_image')->getClientOriginalName();
        $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);

        //  On récupère l'extension du fichier
        $extension = $request->file('url_image')->getClientOriginalExtension();

        // On créer un nouveau fichier avec le nom + une date + l'extension
        $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;

        // On enregistre le fichier à la racine /storage/app/public/uploads.
        $path = $request->file('url_image')->storeAs('public/uploads', $filename);

        $article = Article::create(array_merge($request->all(), [
            'url_image' => $filename,
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Article créé',
            'article' => $article
        ]);
    }

    public function show(Article $article)
    {
        $article->lieux = $article->lieux;
        return response()->json([
            'success' => true,
            'message' => 'Affichage de l\'article',
            'article' => $article
        ]);
    }

    public function update(UpdateRequest $request, Article $article)
    {
        if ($request->hasFile('url_image')) {
            Storage::delete('upload/' . $article->url_image);

            // On récupère le nom du fichier avec son extension
            $filenameWithExt = $request->file('url_image')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);

            //  On récupère l'extension du fichier
            $extension = $request->file('url_image')->getClientOriginalExtension();

            // On créer un nouveau fichier avec le nom + une date + l'extension
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;

            // On enregistre le fichier à la racine /storage/app/public/uploads.
            $path = $request->file('url_image')->storeAs('public/uploads', $filename);
        }

        $article->update(array_merge($request->all(), [
            'url_image' => ($request->hasFile('url_image')) ? $filename : $article->url_image,
        ]));
        
        return response()->json([
            'success' => true,
            'message' => 'Article modifié',
            'article' => $article
        ]);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json([
            'success' => true,
            'message' => 'Article suprimé'
        ]);
    }
}
