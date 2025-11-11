import { useForm } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { Input, Button, Card, Alert } from '../../Components';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <DefaultLayout>
            <div className="section-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="p-4">
                                <h3 className="text-center mb-4">Регистрация</h3>
                                
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <Input
                                            type="text"
                                            placeholder="Имя"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <Input
                                            type="password"
                                            placeholder="Пароль"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <Input
                                            type="password"
                                            placeholder="Подтверждение пароля"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <Button type="submit" disabled={processing} className="w-100">
                                        {processing ? 'Регистрация...' : 'Зарегистрироваться'}
                                    </Button>
                                </form>
                                
                                <div className="text-center mt-3">
                                    <p>
                                        Уже есть аккаунт? <a href="/login">Войдите</a>
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}