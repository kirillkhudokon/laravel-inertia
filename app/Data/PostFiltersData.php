<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PostFiltersData extends Data
{
    public function __construct(
        public ?string $search,
        public ?int $user_id,
        public ?string $created_at,
        public ?string $updated_at,
        public ?string $sort_by,
        public ?string $sort_order,
    ) {
    }
}
