<?php

namespace App\Http\Requests\Article;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titre' => 'required',
            'slug' => 'required|unique:articles,slug|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'content' => 'required',
            'url_image' => 'required',
            'lieu_id' => 'required|exists:lieux,id',
        ];
    }

    public function messages()
    {
        return [
            'titre' =>  'Le champ titre est obligatoire.',
            'slug' =>  'Le champ slug est obligatoire.',
            'slug.regex' =>  'Le slug ne doit pas contenir d\'espace et de caractères spéciaux.',
            'slug.unique' =>  'Le slug existe déjà.',
            'content' =>  'Le champ contenue est obligatoire.',
            'url_image' =>  'Le champ image est obligatoire.',
            'lieu_id' =>  'Le champ lieu est obligatoire.',
            'lieu_id.exists' =>  'Le lieu existe pas.',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Erreurs lors de l\'envoie du formulaire.',
            'data'      => $validator->errors()
        ]));
    }
}
