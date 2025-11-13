<?php

namespace App\Data;

use App\Models\Post;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Optional;

#[TypeScript]
class PostData extends Data
{
    public function __construct(
        public int|Optional $id,
        
        #[Required, StringType, Max(255)]
        public string $title,
        
        #[Required, StringType]
        public string $content,
        
        public string|Optional $url,
        
        public int|Optional $user_id,
        
        /** @var TagData[] */
        public array|Optional $tags,
        
        public UserData|Optional $user,
        
        public string|Optional $created_at,
        public string|Optional $updated_at,
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
            user: $post->user ? $post->user : Optional::create(),
            created_at: $post->created_at?->toISOString(),
            updated_at: $post->updated_at?->toISOString(),
        );
    }
}