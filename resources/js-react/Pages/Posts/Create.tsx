import { useForm } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link, Input, TextArea, TagInput } from '../../Components';
import { FormEventHandler } from 'react';

export default function Create() {
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
        post('/posts');
    };

    return (
        <DefaultLayout>
            <div className="content container-small">
                <div className="mb-4">
                    <Link href="/">
                       Назад к постам
                    </Link>
                </div>

                <h1>Создать новый пост</h1>

                <form onSubmit={handleSubmit} className="mt-4">
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

                    <div className="form-group">
                        <label className="form-label">Теги</label>
                        <TagInput
                            tags={data.tags}
                            onChange={(tags) => setData('tags', tags)}
                            placeholder="Добавьте теги (например: #programming, #react)..."
                        />
                        {errors.tags && (
                            <div className="error-message">
                                {errors.tags}
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
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