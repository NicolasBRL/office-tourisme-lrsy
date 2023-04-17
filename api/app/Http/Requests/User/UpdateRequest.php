<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'email:rfc,dns|unique:users,email',
            'password' => [
                'nullable',
                Password::min(8)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
            ],
            
        ];
    }

    public function messages()
    {
        return [
            'email.email' =>  'Le champ email doit un email valide.',
            'email.unique' =>  'L\'email existe déjà.',
            'password' =>  'Le champ mot de passe doit contenir au moins 8 caractères, avec au minimum une majuscule, une minuscule, un chiffre et un symbole.',
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
