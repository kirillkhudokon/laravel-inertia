import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Button, Link, Alert, Card } from '../../Components';
import { FC, PropsWithChildren } from 'react';
import { PageProps, Post } from '@/types';

interface IndexProps {
    posts: Post[]
}

const Index: FC<PropsWithChildren<IndexProps>> = ({ posts }) => {
    const { flash, auth } = usePage<PageProps>().props;

    return (
        <DefaultLayout>
            <div className="content container">
                <div className="flex-between mb-4">
                    <h1 className="mb-0">Все посты</h1>
                    <Link href="/posts/create">
                        <Button variant="primary">
                            Создать пост
                        </Button>
                    </Link>
                </div>

                {flash?.success && (
                    <Alert type="success">
                        {flash.success}
                    </Alert>
                )}

                {posts.length === 0 ? (
                    <div className="empty-state">
                        <p>Пока нет постов. <Link href="/posts/create">Создайте первый пост!</Link></p>
                    </div>
                ) : (
                    <div className="posts-grid">
                        {posts.map(post => (
                            <Card key={post.id}>
                                <div className="flex-between">
                                    <div style={{ flex: 1 }}>
                                        <h3 className="mb-2">
                                            <Link href={`/posts/${post.url}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="post-content-preview">
                                            {post.content}
                                        </p>
                                        <div className="post-meta">
                                            Автор: {post.user?.name || 'Неизвестно'} | 
                                            Создано: {new Date(post.created_at).toLocaleDateString('ru-RU')}
                                        </div>
                                    </div>
                                    {auth.user && auth.user.id === post.user_id && (
                                        <div className="post-actions">
                                            <Link href={`/posts/${post.url}/edit`}>
                                                <Button variant="success" size="small">
                                                    Изменить
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
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}

export default Index;