<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

            'title' => 'required|string',
            'body' => 'required|string',
            'tags' => 'required|array|min:1',
            'tags.*' => 'required|string',

        ];
    }

    public function messages(): array
    {
        return [
            'tags.min' => 'You must select at least one tag.',
        ];
    }
}
