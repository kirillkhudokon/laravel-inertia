import { useForm, router, usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { FC, FormEventHandler, PropsWithChildren, useMemo, useState } from 'react';
import { Post, PageProps } from '@/types';
import { useUIComponents } from '@/contexts/UIContext';

interface EditProps {
    post: Post & { image?: { id: number; url: string } | null };
}

interface FormData { 
    title: string
    content: string
    tags: string[]
    image: File | null
    delete_image: string
}

const Edit: FC<PropsWithChildren<EditProps>> = ({ post }) => {
    const components = useUIComponents();
    const { tagSuggestions } = usePage<PageProps>().props;
    const { Button, Link, Input, TextArea, TagInput, ImageUpload } = components;
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(post.image?.url || null);
    const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
    
    const { data, setData, processing, errors } = useForm<FormData>({
        title: post.title,
        content: post.content,
        tags: post.tags?.map(tag => tag.name) || [],
        image: null,
        delete_image: 'false',
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        
        if (data.tags.length > 0) {
            data.tags.forEach(tag => {
                formData.append('tags[]', tag);
            });
        }
        
        if (imageFile) {
            formData.append('image', imageFile);
        }
        
        if (shouldDeleteImage) {
            formData.append('delete_image', 'true');
        }
        
        formData.append('_method', 'PUT');
        
        router.post(`/posts/${post.url}`, formData, {
            preserveState: false,
        });
    };
    
    const handleImageChange = (file: File | null) => {
        setImageFile(file);
        setShouldDeleteImage(false);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleImageDelete = () => {
        setImageFile(null);
        setImagePreview(null);
        setShouldDeleteImage(true);
    };

    
    const onSearch = (term: string) => {
        router.get('/api/tags/search', { term }, {
            only: ['tagSuggestions'],
            preserveState: true,
            replace: true,
            preserveUrl: true
        });
    }

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

                <h1 className="text-3xl font-bold mb-6">Редактировать пост</h1>

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
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('content', e.target.value)}
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
                            suggestions={suggestions || []}
                        />
                        {errors.tags && (
                            <div className="text-sm text-destructive mt-1">
                                {errors.tags}
                            </div>
                        )}
                    </div>

                    <ImageUpload
                        value={imagePreview}
                        onChange={handleImageChange}
                        onDelete={handleImageDelete}
                        label="Изображение поста"
                        error={errors.image}
                        disabled={processing}
                        maxSize={5}
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            variant="success"
                            disabled={processing}
                        >
                            {processing ? 'Сохранение...' : 'Сохранить изменения'}
                        </Button>
                        
                        <Link href={`/posts/${post.url}`}>
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

export default Edit