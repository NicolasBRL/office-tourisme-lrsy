<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email:rfc,dns|unique:users,email',
            'password' => [
                'required',
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
            'email.required' =>  'Le champ email est obligatoire.',
            'email.email' =>  'Le champ email doit un email valide.',
            'email.unique' =>  'L\'email existe déjà.',
            'password.required' =>  'Le champ mot de passe est obligatoire.',
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
