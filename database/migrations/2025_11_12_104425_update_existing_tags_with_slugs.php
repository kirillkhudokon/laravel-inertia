<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Обновляем существующие теги, у которых нет slug
        $tags = \App\Models\Tag::whereNull('slug')->orWhere('slug', '')->get();
        
        foreach ($tags as $tag) {
            $tag->slug = \Illuminate\Support\Str::slug($tag->name);
            $tag->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Очищаем slug у всех тегов
        \App\Models\Tag::query()->update(['slug' => null]);
    }
};
