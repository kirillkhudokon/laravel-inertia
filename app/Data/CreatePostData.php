<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\StringType;
use Spatie\LaravelData\Data;


class CreatePostData extends Data
{
    public function __construct(
        #[Required, StringType, Max(255)]
        public string $title,
        
        #[Required, StringType]
        public string $content,
        
        /** @var array<string>|null */
        public ?array $tags = null,
    ) {}
}
