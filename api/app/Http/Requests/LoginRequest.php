<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'email.email' => 'Votre email doit être valide.',
            'email.required' => 'L\'email est obligatoire.',
            'password.required' => 'Le mot de passe est obligatoire.',
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