<?php

namespace App\Http\Requests\Categorie;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
        ];
    }

    public function messages()
    {
        return [
            'nom' =>  'Le champ nom est obligatoire.',
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
