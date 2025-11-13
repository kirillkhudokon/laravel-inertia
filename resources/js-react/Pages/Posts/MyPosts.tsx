import DefaultLayout from '../../Layouts/DefaultLayout';
import { Link, Button, Pagination, PaginationData } from '../../Components';
import { useForm } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import { Post } from '@/types';


interface MyPostsProps {
    posts: PaginationData<Post>
}

const MyPosts: FC<PropsWithChildren<MyPostsProps>> = ({ posts }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (post: Post) => {
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

                    {posts.data.length === 0 ? (
                        <div className="text-center py-5">
                            <h3>У вас пока нет постов</h3>
                            <p className="text-muted">Создайте свой первый пост!</p>
                            <Link href="/posts/create" variant="button">
                                Создать пост
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                {posts.data.map((post: Post) => (
                                    <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">
                                                    {post.content.substring(0, 100)}
                                                    {post.content.length > 100 && '...'}
                                                </p>
                                                {post.created_at && (
                                                    <div className="small text-muted mb-3">
                                                        {new Date(post.created_at).toLocaleDateString('ru-RU')}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="card-footer">
                                                <div className="d-flex gap-2">
                                                    <Link 
                                                        href={`/posts/${post.url}`} 
                                                        variant="button" 
                                                    >
                                                        Читать
                                                    </Link>
                                                    <Link 
                                                        href={`/posts/${post.url}/edit`} 
                                                        variant="button" 
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
                            
                            <Pagination links={posts.links} />
                        </>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default MyPosts;