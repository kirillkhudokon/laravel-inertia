import { FC, PropsWithChildren } from 'react';
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import type { PageProps } from '../types';
import '../../css/app.css';
import { useUIComponents } from '@/contexts/UIContext';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    const { auth } = usePage<PageProps>().props;
    const components = useUIComponents();
    const { Link } = components;

    return (
        <div className="min-h-screen flex flex-col bg-background">

                <header className="bg-primary text-primary-foreground shadow-md">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold m-0">Blog</h2>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        {auth.user.image ? (
                                            <img 
                                                src={auth.user.image.url} 
                                                alt={auth.user.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="text-sm">Привет, {auth.user.name}!</span>
                                    </div>
                                    <InertiaLink 
                                        href="/logout" 
                                        method="post" 
                                        as="button"
                                        className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
                                    >
                                        Выйти
                                    </InertiaLink>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
                                        Войти
                                    </Link>
                                    <Link href="/register" className="bg-white text-primary hover:bg-white/90 px-4 py-2 rounded-md transition-colors font-medium">
                                        Регистрация
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex flex-1">
                    <aside className="w-64 bg-card border-r border-border">
                        <nav className="p-4 space-y-2">
                            <Link 
                                href="/" 
                                className="block px-4 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors no-underline"
                            >
                                Все посты
                            </Link>
                            
                            {auth.user && (
                                <>
                                    <Link 
                                        href="/my-posts" 
                                        className="block px-4 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors no-underline"
                                    >
                                        Мои посты
                                    </Link>
                                    <Link 
                                        href="/posts/create" 
                                        className="block px-4 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors no-underline"
                                    >
                                        Создать пост
                                    </Link>
                                </>
                            )}
                        </nav>
                    </aside>

                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
                
                <footer className="bg-muted border-t border-border py-4">
                    <div className="container mx-auto px-6 text-center">
                        <p className="m-0 text-sm text-muted-foreground">© 2025 Blog</p>
                    </div>
                </footer>
            </div>
    );
}
export default DefaultLayout;