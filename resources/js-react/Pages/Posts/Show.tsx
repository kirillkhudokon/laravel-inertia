import DefaultLayout from '../../Layouts/DefaultLayout';
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import { PageProps, Post } from '@/types';
import { FC, PropsWithChildren } from 'react';
import { useUIComponents } from '@/contexts/UIContext';

interface ShowProps {
    post: Post
}

const Show: FC<PropsWithChildren<ShowProps>> = ({ post }) => {
    const { auth } = usePage<PageProps>().props;
    const components = useUIComponents();
    const { Button, Link } = components;
    
    return (
        <DefaultLayout>
            <div className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/" className="text-primary hover:underline">
                        ← Назад к постам
                    </Link>
                </div>

                <article className="bg-card border border-border rounded-lg p-8 shadow-sm">
                    <header className="mb-8 pb-6 border-b border-border">
                        <h1 className="text-4xl font-bold mb-4">
                            {post.title}
                        </h1>
                        <div className="text-sm text-muted-foreground">
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

                    <div className="prose prose-slate max-w-none mb-6">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map(tag => (
                                <Link 
                                    key={tag.id} 
                                    href={`/tags/${tag.slug}`}
                                    className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm no-underline hover:bg-secondary/80 transition-colors cursor-pointer"
                                >
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {auth.user && auth.user.id === post.user_id && (
                        <div className="flex gap-3 pt-6 border-t border-border mt-6">
                            <Link href={`/posts/${post.url}/edit`}>
                                  <Button variant="success" size="small">
                                    Редактировать
                                </Button>
                            </Link>
                            
                            <InertiaLink 
                                href={`/posts/${post.url}`}
                                method="delete"
                                as="button"
                                onBefore={() => confirm('Вы уверены, что хотите удалить этот пост?')}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 text-xs"
                            >
                                Удалить
                            </InertiaLink>
                        </div>
                    )}
                </article>
            </div>
        </DefaultLayout>
    );
}

export default Show;