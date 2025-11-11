<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        
        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Display posts for authenticated user.
     */
    public function myPosts()
    {
        $posts = Post::where('user_id', Auth::id())
            ->with('user')
            ->latest()
            ->get();
        
        return Inertia::render('Posts/MyPosts', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $url = Str::slug($validated['title']);

        $post = Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'url' => $url,
            'user_id' => Auth::id(),
        ]);

        $post->update(['url' => $url . '-' . $post->id]);

        return redirect()->route('home')
            ->with('success', 'Пост успешно создан!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load('user');
        
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            return Inertia::render('Errors/Forbidden');
        }
        
        return Inertia::render('Posts/Edit', [
            'post' => $post
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
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($post->title !== $validated['title']) {
            $url = Str::slug($validated['title']);
            $validated['url'] = $url . '-' . $post->id;
        }

        $post->update($validated);

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
