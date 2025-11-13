import DefaultLayout from '../../Layouts/DefaultLayout';
import { Link } from '../../Components';

export default function NotFound() {
    return (
        <DefaultLayout>
            <div className="section-content">
                <div className="container text-center">
                    <div className="py-5">
                        <h1 className="display-1">404</h1>
                        <h2 className="mb-4">Страница не найдена</h2>
                        <p className="text-muted mb-4">
                            К сожалению, запрашиваемая страница не существует.
                        </p>
                        <Link href="/" variant="button">
                            Вернуться на главную
                        </Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}