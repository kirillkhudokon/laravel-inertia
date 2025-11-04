import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link } from '../../Components';

export default function Show({ post }) {
    return (
        <DefaultLayout>
            <div className="content container-small">
                <div className="mb-4">
                    <Link href="/">
                        ← Назад к постам
                    </Link>
                </div>

                <article className="article">
                    <header className="article-header">
                        <h1 className="article-title">
                            {post.title}
                        </h1>
                        <div className="article-meta">
                            Автор: {post.user?.name || 'Неизвестно'} | 
                            Создано: {new Date(post.created_at).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                            {post.updated_at !== post.created_at && (
                                <span> | Обновлено: {new Date(post.updated_at).toLocaleDateString('ru-RU', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            )}
                        </div>
                    </header>

                    <div className="article-content">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="article-actions">
                        <Link href={`/posts/${post.url}/edit`}>
                            <Button variant="success">
                                Редактировать
                            </Button>
                        </Link>
                        
                        <Link 
                            href={`/posts/${post.url}`}
                            method="delete"
                            as="button"
                            onBefore={() => confirm('Вы уверены, что хотите удалить этот пост?')}
                            className="btn-danger"
                        >
                            Удалить
                        </Link>
                    </div>
                </article>
            </div>
        </DefaultLayout>
    );
}