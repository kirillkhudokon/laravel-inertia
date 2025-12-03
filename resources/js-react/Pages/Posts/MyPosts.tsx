import DefaultLayout from '../../Layouts/DefaultLayout';
import { Link as InertiaLink, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { Post, PageProps } from '@/types';
import { useUIComponents } from '@/contexts/UIContext';
import type { PaginationData } from 'ui/Pagination';

interface MyPostsProps {
    posts: PaginationData<Post>
}

const MyPosts: FC<PropsWithChildren<MyPostsProps>> = ({ posts }) => {
    const { flash } = usePage<PageProps>().props;
    const components = useUIComponents();
    const { Link, Button, Card, Alert, Pagination } = components;

    return (
        <DefaultLayout>
            <div className="container mx-auto px-6 py-8 max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold m-0">Мои посты</h1>
                    <Link href="/posts/create">
                        <Button variant="primary">
                            Создать новый пост
                        </Button>
                    </Link>
                </div>

                {flash?.success && (
                    <Alert type="success">
                        {flash.success}
                    </Alert>
                )}

                {posts.data.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <h3 className="text-xl font-semibold mb-3">У вас пока нет постов</h3>
                        <p className="mb-4">Создайте свой первый пост!</p>
                        <Link href="/posts/create">
                            <Button variant="primary">
                                Создать пост
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
                            {posts.data.map((post: Post) => (
                                <Card key={post.id}>
                                    <div className="flex flex-col h-full">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">
                                                <Link href={`/posts/${post.url}`}>
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="text-muted-foreground mb-3 line-clamp-3">
                                                {post.content}
                                            </p>
                                            <div className="text-sm text-muted-foreground mb-2">
                                                Создано: {post.created_at ? new Date(post.created_at).toLocaleDateString('ru-RU') : 'N/A'}
                                            </div>
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {post.tags.map((tag) => (
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
                                        </div>
                                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
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
                                                className="cursor-pointer text-white inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 text-xs"
                                            >
                                                Удалить
                                            </InertiaLink>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        
                        <Pagination links={posts.links} LinkComponent={InertiaLink} />
                    </>
                )}
            </div>
        </DefaultLayout>
    );
}

export default MyPosts;