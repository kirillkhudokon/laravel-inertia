<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Data\PostData;
use App\Data\CreatePostData;
use App\Data\PostFiltersData;
use App\Data\TagData;
use App\Data\UserData;
use App\Http\Requests\PostFilterRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(PostFilterRequest $request)
    {
        $query = Post::with(['user', 'tags']);

        if ($request->filled('search')) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('created_from')) {
            $query->whereDate('created_at', '>=', $request->created_from);
        }
        if ($request->filled('created_to')) {
            $query->whereDate('created_at', '<=', $request->created_to);
        }

        if ($request->filled('updated_from')) {
            $query->whereDate('updated_at', '>=', $request->updated_from);
        }
        if ($request->filled('updated_to')) {
            $query->whereDate('updated_at', '<=', $request->updated_to);
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $posts = $query->paginate(10)->withQueryString();

        $users = User::all();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'users' => $users,
            'filters' => PostFiltersData::from([
                'search' => $request->search,
                'user_id' => $request->user_id,
                'created_from' => $request->created_from,
                'created_to' => $request->created_to,
                'updated_from' => $request->updated_from,
                'updated_to' => $request->updated_to,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ])
        ]);
    }

    /**
     * Display posts filtered by tag.
     */
    public function byTag($tagSlug)
    {
        $tag = Tag::where('slug', $tagSlug)->firstOrFail();
        $posts = Post::whereHas('tags', function ($query) use ($tag) {
            $query->where('tags.id', $tag->id);
        })->with(['user', 'tags'])->latest()->paginate(10);
        
        return Inertia::render('Posts/ByTag', [
            'posts' => $posts,
            'tag' => $tag
        ]);
    }

    /**
     * Display posts for authenticated user.
     */
    public function myPosts()
    {
        $posts = Post::where('user_id', Auth::id())
            ->with(['user', 'tags'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('Posts/MyPosts', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $tagQuery = $request->get('tagQuery', '');
        $suggestions = [];
        
        if (strlen($tagQuery) >= 1) {
            $suggestions = Tag::where('name', 'LIKE', '%' . $tagQuery . '%')
                ->limit(10)
                ->get(['id', 'name'])
                ->toArray();
        }

        return Inertia::render('Posts/Create', [
            'tagSuggestions' => $suggestions,
            'tagQuery' => $tagQuery
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $postData = CreatePostData::validateAndCreate($request->all());

        $url = Str::slug($postData->title);

        $post = Post::create([
            'title' => $postData->title,
            'content' => $postData->content,
            'url' => $url,
            'user_id' => Auth::id(),
        ]);

        $post->update(['url' => $url . '-' . $post->id]);

        if ($postData->tags !== null) {
            $post->syncTags($postData->tags);
        }

        return redirect()->route('home')
            ->with('success', 'Пост успешно создан!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['user', 'tags']);
        
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, Request $request)
    {
        if ($post->user_id !== Auth::id()) {
            return Inertia::render('Errors/Forbidden');
        }
        
        $post->load('tags');
        
        $tagQuery = $request->get('tagQuery', '');
        $suggestions = [];
        
        if (strlen($tagQuery) >= 1) {
            $suggestions = Tag::where('name', 'LIKE', '%' . $tagQuery . '%')
                ->limit(10)
                ->get(['id', 'name'])
                ->toArray();
        }
        
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'tagSuggestions' => $suggestions,
            'tagQuery' => $tagQuery
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return Inertia::render('Errors/Forbidden');
        }
        
        $postData = CreatePostData::validateAndCreate($request->all());

        if ($post->title !== $postData->title) {
            $url = Str::slug($postData->title);
            $urlToUpdate = $url . '-' . $post->id;
        }

        $post->update([
            'title' => $postData->title,
            'content' => $postData->content,
            'url' => $urlToUpdate ?? $post->url
        ]);

        if ($postData->tags !== null) {
            $post->syncTags($postData->tags);
        }

        return redirect()->route('home')
            ->with('success', 'Пост успешно обновлен!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return Inertia::render('Errors/Forbidden');
        }
        
        $post->delete();

        return redirect()->route('posts.my')
            ->with('success', 'Пост успешно удален!');
    }
}
