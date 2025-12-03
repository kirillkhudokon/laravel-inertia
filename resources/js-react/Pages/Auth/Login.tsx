import { useForm } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { FormEventHandler } from 'react';
import { useUIComponents } from '@/contexts/UIContext';

export default function Login() {
    const components = useUIComponents();
    const { Input, Button, Card, Alert } = components;
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <DefaultLayout>
            <div className="section-content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Card className="p-4">
                                <h3 className="text-center mb-4">Вход</h3>
                                
                                {errors.email && <Alert variant="danger" type="danger">{errors.email}</Alert>}
                                
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            />
                                        </div>
                                        
                                        <div className="mb-3">
                                            <Input
                                                type="password"
                                                placeholder="Пароль"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                        </div>
                                        
                                        <Button type="submit" disabled={processing} className="w-100">
                                            {processing ? 'Вход...' : 'Войти'}
                                        </Button>
                                    </form>
                                    
                                    <div className="text-center mt-3">
                                        <p>
                                            Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
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