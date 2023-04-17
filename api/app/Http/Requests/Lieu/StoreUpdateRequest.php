<?php

namespace App\Http\Requests\Lieu;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\File;

class StoreUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => 'required',
            'adresse' => 'required',
            'ville' => 'required',
            'code_postal' => 'required|max:5',
            'longitude' => 'required',
            'latitude' => 'required',
            'categories' => 'exists:categories,id',
            'imagesLieu.*' => [File::image()->max(12 * 1024)]
        ];
    }

    public function messages()
    {
        return [
            'nom' =>  'Le champ nom est obligatoire.',
            'adresse' =>  'Le champ adresse est obligatoire.',
            'ville' =>  'Le champ ville est obligatoire.',
            'code_postal' =>  'Le champ code postal est obligatoire.',
            'code_postal.max' =>  'Le champ code postal doit contenir maximum 5 caractères.',
            'longitude' =>  'Le champ longitude est obligatoire.',
            'latitude' =>  'Le champ latitude est obligatoire.',
            'categories' =>  'Le champ categories est obligatoire.',
            'categories.exists' =>  'La catégorie renseignée n\'existe pas.',
            'imagesLieu.*.max' => 'Trop lourds'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Erreurs lors de l\'envoie du formulaire.',
            'data'      => $validator->errors(),
        ]));
    }
}
