import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link } from '../../Components';
import { usePage } from '@inertiajs/react';
import { PageProps, Post } from '@/types';
import { FC, PropsWithChildren } from 'react';

interface ShowProps {
    post: Post
}

const Show: FC<PropsWithChildren<ShowProps>> = ({ post }) => {
    const { auth } = usePage<PageProps>().props;
    return (
        <DefaultLayout>
            <div className="content container-small">
                <div className="mb-4">
                    <Link href="/">
                        Назад к постам
                    </Link>
                </div>

                <article className="article">
                    <header className="article-header">
                        <h1 className="article-title">
                            {post.title}
                        </h1>
                        <div className="article-meta">
                            Автор: {post.user?.name || 'Неизвестно'} | 
                            Создано: {post.created_at ? new Date(post.created_at).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : 'N/A'}
                            {post.updated_at && post.updated_at !== post.created_at && (
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

                    {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                            {post.tags.map(tag => (
                                <Link 
                                    key={tag.id} 
                                    href={`/tags/${tag.slug}`}
                                    className="post-tag hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {auth.user && auth.user.id === post.user_id && (
                        <div className="article-actions">
                            <Link href={`/posts/${post.url}/edit`}>
                                  <Button variant="success" size="small">
                                    Редактировать
                                </Button>
                            </Link>
                            
                            <Link 
                                href={`/posts/${post.url}`}
                                method="delete"
                                as="button"
                                onBefore={() => confirm('Вы уверены, что хотите удалить этот пост?')}
                                className="btn-danger btn-small"
                            >
                                Удалить
                            </Link>
                        </div>
                    )}
                </article>
            </div>
        </DefaultLayout>
    );
}

export default Show;