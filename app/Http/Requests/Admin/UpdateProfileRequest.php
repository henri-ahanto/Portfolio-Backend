<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
     * @return array<string, array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'handle' => ['required', 'string', 'max:100', 'alpha_dash'],
            'role' => ['required', 'string', 'max:150'],
            'roles' => ['required', 'array', 'min:1'],
            'roles.*' => ['required', 'string', 'max:100'],
            'tagline' => ['required', 'string', 'max:300'],
            'location' => ['required', 'string', 'max:150'],
            'email' => ['required', 'string', 'email', 'max:150'],
            'phones' => ['required', 'array', 'min:1'],
            'phones.*' => ['required', 'string', 'max:30'],
            'availability' => ['required', 'string', 'max:150'],
            'bio' => ['required', 'array', 'min:1'],
            'bio.*' => ['required', 'string', 'max:2000'],
            'links' => ['required', 'array'],
            'links.github' => ['nullable', 'string', 'max:255'],
            'links.youtube' => ['nullable', 'string', 'max:255'],
            'links.portfolio' => ['nullable', 'string', 'max:255'],
            'links.cv' => ['nullable', 'string', 'max:255'],
            'languages' => ['required', 'array', 'min:1'],
            'languages.*' => ['required', 'string', 'max:50'],
            'stats' => ['required', 'array', 'min:1'],
            'stats.*.value' => ['required', 'integer', 'min:0', 'max:100000'],
            'stats.*.suffix' => ['nullable', 'string', 'max:10'],
            'stats.*.label' => ['required', 'string', 'max:100'],
            'diplomas' => ['required', 'array', 'min:1'],
            'diplomas.*.year' => ['required', 'string', 'max:10'],
            'diplomas.*.title' => ['required', 'string', 'max:150'],
            'diplomas.*.place' => ['required', 'string', 'max:150'],
        ];
    }
}
