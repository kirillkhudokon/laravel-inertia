<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }

    public static function createFromName(string $name): self
    {
        return self::create([
            'name' => $name,
            'slug' => Str::slug($name)
        ]);
    }

    public static function findOrCreateByName(string $name): self
    {
        return self::firstOrCreate([
            'name' => $name
        ], [
            'slug' => Str::slug($name)
        ]);
    }
}
