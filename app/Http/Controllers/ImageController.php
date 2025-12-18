<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'model_type' => 'required|in:post,user',
            'model_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $model = $this->getModel($request->model_type, $request->model_id);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => 'Модель не найдена'
            ], 404);
        }

        if (!$this->canUpload($request, $model)) {
            return response()->json([
                'success' => false,
                'message' => 'Недостаточно прав'
            ], 403);
        }

        try {
            $image = $model->uploadImage($request->file('image'));

            if ($request->header('X-Inertia')) {
                return back()->with('image', [
                    'id' => $image->id,
                    'url' => $image->url,
                    'path' => $image->path,
                ]);
            }

            return response()->json([
                'success' => true,
                'image' => [
                    'id' => $image->id,
                    'url' => $image->url,
                    'path' => $image->path,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при загрузке изображения: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request, string $modelType, int $modelId): JsonResponse
    {
        $model = $this->getModel($modelType, $modelId);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => 'Модель не найдена'
            ], 404);
        }

        if (!$this->canDelete($request, $model)) {
            return response()->json([
                'success' => false,
                'message' => 'Недостаточно прав'
            ], 403);
        }

        try {
            $model->deleteImage();

            return response()->json([
                'success' => true,
                'message' => 'Изображение удалено'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ошибка при удалении изображения'
            ], 500);
        }
    }

    private function getModel(string $type, int $id)
    {
        return match($type) {
            'post' => Post::find($id),
            'user' => User::find($id),
            default => null,
        };
    }

    private function canUpload(Request $request, $model): bool
    {
        $user = $request->user();

        if (!$user) {
            return false;
        }

        if ($model instanceof Post) {
            return $model->user_id === $user->id;
        }

        if ($model instanceof User) {
            return $model->id === $user->id;
        }

        return false;
    }


    private function canDelete(Request $request, $model): bool
    {
        return $this->canUpload($request, $model);
    }
}
