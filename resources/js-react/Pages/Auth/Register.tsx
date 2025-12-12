import { useForm, router } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { FormEventHandler, useState } from 'react';
import { useUIComponents } from '@/contexts/UIContext';

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    image: File | null;
}

export default function Register() {
    const components = useUIComponents();
    const { Input, Button, Card, ImageUpload } = components;
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const { data, setData, processing, errors } = useForm<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        image: null,
    });

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        
        if (imageFile) {
            formData.append('image', imageFile);
        }
        
        router.post('/register', formData);
    };
    
    const handleImageChange = (file: File | null) => {
        setImageFile(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    
    const handleImageDelete = () => {
        setImageFile(null);
        setImagePreview(null);
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
                                    
                                    <div className="mb-4">
                                        <ImageUpload
                                            value={imagePreview}
                                            onChange={handleImageChange}
                                            onDelete={handleImageDelete}
                                            label="Аватар (необязательно)"
                                            error={errors.image}
                                            disabled={processing}
                                            maxSize={5}
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
    )
}