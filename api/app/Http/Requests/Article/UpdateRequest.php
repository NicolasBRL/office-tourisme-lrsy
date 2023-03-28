<?php

namespace App\Http\Requests\Article;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'slug' => 'unique:articles,slug|regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
            'lieu_id' => 'exists:lieux,id',
        ];
    }

    public function messages()
    {
        return [
            'slug.regex' =>  'Le slug ne doit pas contenir d\'espace et de caractères spéciaux.',
            'slug.unique' =>  'Le slug existe déjà.',
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
