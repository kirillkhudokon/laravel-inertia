import { useForm } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link, Input, TextArea } from '../../Components';
import { FC, FormEventHandler, PropsWithChildren } from 'react';
import { Post } from '@/types';

interface EditProps {
    post: Post 
}

const Edit: FC<PropsWithChildren<EditProps>> = ({ post }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        put(`/posts/${post.url}`);
    };

    return (
        <DefaultLayout>
            <div className="content container-small">
                <div className="mb-4">
                    <Link href="/">
                        Назад к постам
                    </Link>
                </div>

                <h1>Редактировать пост</h1>

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