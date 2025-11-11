import DefaultLayout from '../../Layouts/DefaultLayout';
import { Link, Button } from '../../Components';
import { useForm } from '@inertiajs/react';

export default function MyPosts({ posts }) {
    const { delete: destroy } = useForm();

    const handleDelete = (post) => {
        if (confirm('Вы уверены, что хотите удалить этот пост?')) {
            destroy(`/posts/${post.url}`);
        }
    };

    return (
        <DefaultLayout>
            <div className="section-content">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Мои посты</h1>
                        <Link href="/posts/create" variant="button">
                            Создать новый пост
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-5">
                            <h3>У вас пока нет постов</h3>
                            <p className="text-muted">Создайте свой первый пост!</p>
                            <Link href="/posts/create" variant="button">
                                Создать пост
                            </Link>
                        </div>
                    ) : (
                        <div className="row">
                            {posts.map((post) => (
                                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">
                                                {post.content.substring(0, 100)}
                                                {post.content.length > 100 && '...'}
                                            </p>
                                            <div className="small text-muted mb-3">
                                                {new Date(post.created_at).toLocaleDateString('ru-RU')}
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex gap-2">
                                                <Link 
                                                    href={`/posts/${post.url}`} 
                                                    variant="button" 
                                                    size="sm"
                                                >
                                                    Читать
                                                </Link>
                                                <Link 
                                                    href={`/posts/${post.url}/edit`} 
                                                    variant="button" 
                                                    size="sm"
                                                >
                                                    Редактировать
                                                </Link>
                                                <Button 
                                                    variant="danger" 
                                                    size="md"
                                                    onClick={() => handleDelete(post)}
                                                >
                                                    Удалить
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}