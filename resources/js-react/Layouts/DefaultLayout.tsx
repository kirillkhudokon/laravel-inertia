import { FC, PropsWithChildren } from 'react';
import { Link } from '../Components';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '../types';
import '../../css/app.css';

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="app-layout">
            <div className="topbar">
                <div className="d-flex justify-content-between align-items-center pl-5 pr-5">
                    <h2 className="mb-0 mt-0 text-white">Blog</h2>
                    {auth.user ? (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-white">Привет, {auth.user.name}!</span>
                            <Link href="/logout" method="post" variant="button">
                                Выйти
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link href="/login" variant="button">
                                Войти
                            </Link>
                            <Link href="/register" variant="button">
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="app-content">
                <div className="sidebar">
                    <nav className="sidebar-nav">
                        <Link href="/" className="sidebar-link">
                            Все посты
                        </Link>
                        
                        {auth.user && (
                            <>
                                <Link href="/my-posts" className="sidebar-link">
                                    Мои посты
                                </Link>
                                <Link href="/posts/create" className="sidebar-link">
                                    Создать пост
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className="main-content">
                    {children}
                </div>
            </div>
            
            <div className="footer">
                <div className="container text-center">
                    <p className="mb-0 text-muted">© 2025 Blog</p>
                </div>
            </div>
        </div>
    );
}
export default DefaultLayout;