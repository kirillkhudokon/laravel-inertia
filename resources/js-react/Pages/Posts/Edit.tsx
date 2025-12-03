import { useForm, router, usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { FC, FormEventHandler, PropsWithChildren, useMemo } from 'react';
import { Post, PageProps } from '@/types';
import { useUIComponents } from '@/contexts/UIContext';

interface EditProps {
    post: Post 
}

const Edit: FC<PropsWithChildren<EditProps>> = ({ post }) => {
    const components = useUIComponents();
    const { tagSuggestions } = usePage<PageProps>().props;
    const { Button, Link, Input, TextArea, TagInput } = components;
    
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        tags: post.tags?.map(tag => tag.name) || [],
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        put(`/posts/${post.url}`);
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