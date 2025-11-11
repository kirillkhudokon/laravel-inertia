import DefaultLayout from '../../Layouts/DefaultLayout';
import { Link } from '../../Components';

export default function Forbidden() {
    return (
        <DefaultLayout>
            <div className="section-content">
                <div className="container text-center">
                    <div className="py-5">
                        <h1 className="display-1">403</h1>
                        <h2 className="mb-4">Доступ запрещен</h2>
                        <p className="text-muted mb-4">
                            У вас нет прав для доступа к этой странице.
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