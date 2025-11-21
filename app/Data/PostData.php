<?php

namespace App\Data;

use App\Models\Post;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostData extends Data
{
    public function __construct(
        public int $id,
        public string $title,
        public string $content,
        public string $url,
        public int $user_id,
        
        /** @var TagData[] */
        public array $tags,
        
        public ?UserData $user,
        public ?string $created_at,
        public ?string $updated_at,
    ) {}
    
    public static function fromModel(Post $post): self
    {
        return new self(
            id: $post->id,
            title: $post->title,
            content: $post->content,
            url: $post->url,
            user_id: $post->user_id,
            tags: $post->tags,
            user: $post->user ? UserData::from($post->user) : null,
            created_at: $post->created_at?->toISOString(),
            updated_at: $post->updated_at?->toISOString(),
        );
    }
}
