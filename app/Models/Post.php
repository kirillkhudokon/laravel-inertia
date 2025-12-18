<?php

namespace App\Models;

use App\Traits\HasImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasImage;

    protected $fillable = [
        'title',
        'content',
        'url',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function syncTags(array $tagNames): void
    {
        $tags = collect($tagNames)->map(function ($name) {
            return Tag::findOrCreateByName(trim($name));
        });

        $this->tags()->sync($tags->pluck('id'));
    }

    public function getRouteKeyName()
    {
        return 'url';
    }
}
