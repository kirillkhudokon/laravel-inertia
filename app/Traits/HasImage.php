<?php

namespace App\Traits;

use App\Models\Image;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasImage
{
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function uploadImage(UploadedFile $file, string $disk = 'public'): Image
    {
        if ($this->image) {
            $this->image->delete();
        }

        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $directory = strtolower(class_basename($this)) . 's';
        $path = $file->storeAs($directory, $filename, $disk);

        return $this->image()->create([
            'path' => $path,
            'url' => asset('storage/' . $path),
            'disk' => $disk,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ]);
    }

    public function deleteImage(): bool
    {
        if ($this->image) {
            return $this->image->delete();
        }

        return false;
    }

    public function getImageUrl(?string $default = null): ?string
    {
        return $this->image?->url ?? $default;
    }

    public function hasImage(): bool
    {
        return $this->image !== null;
    }
}
