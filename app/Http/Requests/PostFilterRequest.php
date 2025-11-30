<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostFilterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'created_at' => ['nullable', 'date'],
            'updated_at' => ['nullable', 'date'],
            'sort_by' => ['nullable', 'string', 'in:created_at,updated_at'],
            'sort_order' => ['nullable', 'string', 'in:asc,desc'],
        ];
    }
}
