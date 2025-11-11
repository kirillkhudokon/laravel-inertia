import { Link } from '../Components';
import { usePage } from '@inertiajs/react';
import '../../css/app.css';

export default function DefaultLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="app-layout">
            <div className="topbar">
                <div className="d-flex justify-content-between align-items-center pl-5 pr-5">
                    <h2 className="mb-0 mt-0 text-white">Blog</h2>
                    {auth.user ? (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-white">Привет, {auth.user.name}!</span>
                            <Link href="/logout" method="post" variant="button" size="sm">
                                Выйти
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link href="/login" variant="button" size="sm">
                                Войти
                            </Link>
                            <Link href="/register" variant="button" size="sm">
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