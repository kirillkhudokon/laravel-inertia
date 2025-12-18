import { useForm, router, usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { FormEventHandler, useMemo, useState } from 'react';
import { useUIComponents } from '@/contexts/UIContext';
import { PageProps } from '@/types';

export default function Create() {
    const components = useUIComponents();
    const { tagSuggestions } = usePage<PageProps>().props;
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        content: string;
        tags: string[];
    }>({
        title: '',
        content: '',
        tags: []
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        if (imageFile) {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('content', data.content);
            data.tags.forEach(tag => formData.append('tags[]', tag));
            formData.append('image', imageFile);
            
            router.post('/posts', formData, {
                preserveState: false,
                onError: (errors) => {
                    console.error('Failed to create post:', errors);
                }
            });
        } else {
            post('/posts');
        }
    };

    const onSearch = (term: string) => {
        router.get('/api/tags/search', { term }, {
            only: ['tagSuggestions'],
            preserveState: true,
            replace: true,
            preserveUrl: true
        });
    }

    const { Button, Link, Input, TextArea, TagInput, ImageUpload } = components;

    const suggestions = useMemo(() => {
        return tagSuggestions?.map(tag => ({ id: tag.id!, name: tag.name }) ) || []
    }, [tagSuggestions])

    return (
        <DefaultLayout>
            <div className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/" className="text-primary hover:underline">
                        ← Назад к постам
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-6">Создать новый пост</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-6">
                    <Input
                        id="title"
                        label="Заголовок"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Введите заголовок поста"
                        error={errors.title}
                        required
                    />

                    <TextArea
                        id="content"
                        label="Содержание"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={10}
                        placeholder="Введите содержание поста"
                        error={errors.content}
                        required
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Теги</label>
                        <TagInput
                            tags={data.tags}
                            onChange={(tags: string[]) => setData('tags', tags)}
                            placeholder="Добавьте теги (например: #programming, #react)..."
                            onSearch={onSearch}
                            suggestions={suggestions}
                        />
                        {errors.tags && (
                            <div className="text-sm text-destructive mt-1">
                                {errors.tags}
                            </div>
                        )}
                    </div>

                    <ImageUpload
                        value={null}
                        onChange={(file) => {
                            setImageFile(file);
                            setImageError(null);
                        }}
                        label="Изображение поста"
                        error={imageError || undefined}
                        disabled={processing}
                        maxSize={5}
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing ? 'Создание...' : 'Создать пост'}
                        </Button>
                        
                        <Link href="/">
                            <Button variant="secondary">
                                Отмена
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}