<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "nickname" => "required|unique:users,nickname,alpha_dash",
            "name" => "required",
            "email" => "required|email|unique:users,email",
            "password" => "required|min:8|confirmed"

        ];
    }

    public function messages()
    {
        return [
            "name.required" => "Nombre es requerido",
            "nickname.required" => "Nickname es requerido",
            "nickname.unique" => "Este nickname ya existe",
            "email.required" => "Email es requerido",
            "email.unique" => "Este email ya existe",
            "email.email" => "Email no es válido",
            "password.required" =>"Claves requerida",
            "password.confirmed" => "Claves no coinciden",
            "password.min" => "Clave debe tener al menos 8 carácteres",
            "nickname.alpha_dash" => "Nickname no puede contener espacios en blanco"
        ];
    }
}
