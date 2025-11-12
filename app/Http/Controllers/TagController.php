<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function search(Request $request)
    {
        $term = $request->get('term', '');
        
        $tags = [];
        if (strlen($term) >= 1) {
            $tags = Tag::where('name', 'LIKE', '%' . $term . '%')
                ->limit(10)
                ->get(['id', 'name']);
        }

        $component = $request->header('X-Inertia-Partial-Component') ?? '';

        return Inertia::render($component, [
            'tagSuggestions' => $tags
        ]);
    }
}
