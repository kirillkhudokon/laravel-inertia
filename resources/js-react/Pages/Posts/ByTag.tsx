import { Link, Link as InertiaLink } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Post } from '../../types';
import { useUIComponents } from '@/contexts/UIContext';
import { PaginationData } from 'ui/Pagination';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    posts: PaginationData<Post>;
    tag: Tag;
}

export default function ByTag({ posts, tag }: Props) {
    const components = useUIComponents();
    const { Pagination } = components;

    return (
        <DefaultLayout>
            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Посты с тегом "#{tag.name}"
                    </h1>
                    <p className="text-gray-600">
                        Найдено постов: {posts.total}
                    </p>
                </div>

                    {posts.data.length > 0 ? (
                        <>
                            <div className="space-y-8">
                                {posts.data.map((post: Post) => (
                                    <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold">
                                                        {post.user?.name?.[0]?.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{post.user?.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {post.created_at ? new Date(post.created_at).toLocaleDateString('ru-RU') : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                            <Link 
                                                href={`/posts/${post.url}`}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-700 mb-4 line-clamp-3">
                                            {post.content}
                                        </p>

                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.map((postTag: any) => (
                                                    <Link
                                                        key={postTag.id}
                                                        href={`/tags/${postTag.slug}`}
                                                        className={`
                                                            inline-block px-3 py-1 text-sm rounded-full transition-colors
                                                            ${postTag.id === tag.id 
                                                                ? 'bg-blue-100 text-blue-800 font-medium' 
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }
                                                        `}
                                                    >
                                                        #{postTag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                ))}
                            </div>
                            
                            <Pagination links={posts.links} LinkComponent={InertiaLink} />
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg mb-4">
                                Постов с тегом "#{tag.name}" пока нет
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                ← Вернуться к постам
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            ← Все посты
                        </Link>
                    </div>
                </div>
            </DefaultLayout>
    );
}