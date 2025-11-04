import { useForm } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link, Input, TextArea } from '../../Components';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts');
    };

    return (
        <DefaultLayout>
            <div className="content container-small">
                <div className="mb-4">
                    <Link href="/">
                        ← Назад к постам
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