import { router } from '@inertiajs/react';
import { FC, FormEvent, useState } from 'react';
import { Input, Button } from '../Components';
import { User, PostFiltersData } from '@/types';

interface PostFiltersProps {
    filters: PostFiltersData;
    users: User[];
}

const PostFilters: FC<PostFiltersProps> = ({ filters, users }) => {
    const [localFilters, setLocalFilters] = useState<PostFiltersData>(filters);

    const handleFilterChange = (key: keyof PostFiltersData, value: string | number | undefined) => {
        setLocalFilters((prev: PostFiltersData) => ({ ...prev, [key]: value || null }));
    };
    
    const getCleanedFilters = (filters: PostFiltersData) => {
      return Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
      );
    }

    const applyFilters = (e: FormEvent) => {
        e.preventDefault();
        const cleanFilters = getCleanedFilters(localFilters);
        router.get('/', cleanFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        const emptyFilters: PostFiltersData = {
            search: null,
            user_id: null,
            created_at: null,
            updated_at: null,
            sort_by: 'created_at',
            sort_order: 'desc',
        };
        setLocalFilters(emptyFilters);
        
        const cleanFilters = getCleanedFilters(emptyFilters);
        router.get('/', cleanFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (field: 'created_at' | 'updated_at') => {
        const newOrder = localFilters.sort_by === field && localFilters.sort_order === 'desc' ? 'asc' : 'desc';
        setLocalFilters((prev: PostFiltersData) => ({ ...prev, sort_by: field, sort_order: newOrder }));
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <h3>Фильтры и сортировка</h3>
            </div>

            <form onSubmit={applyFilters} className="filters-form">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Поиск по названию</label>
                        <Input
                            type="text"
                            value={localFilters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            placeholder="Введите название..."
                        />
                    </div>

                    <div className="filter-group">
                        <label>Автор</label>
                        <select
                            value={localFilters.user_id || ''}
                            onChange={(e) => handleFilterChange('user_id', e.target.value ? Number(e.target.value) : undefined)}
                            className="filter-select"
                        >
                            <option value="">Все авторы</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Дата создания</label>
                        <Input
                            type="date"
                            value={localFilters.created_at || ''}
                            onChange={(e) => handleFilterChange('created_at', e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Дата обновления</label>
                        <Input
                            type="date"
                            value={localFilters.updated_at || ''}
                            onChange={(e) => handleFilterChange('updated_at', e.target.value)}
                        />
                    </div>
                </div>

                <div className="sort-buttons">
                    <label>Сортировка:</label>
                    <Button
                        type="button"
                        variant={localFilters.sort_by === 'created_at' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('created_at')}
                    >
                        По дате создания {localFilters.sort_by === 'created_at' && (localFilters.sort_order === 'desc' ? '↓' : '↑')}
                    </Button>
                    <Button
                        type="button"
                        variant={localFilters.sort_by === 'updated_at' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('updated_at')}
                    >
                        По дате обновления {localFilters.sort_by === 'updated_at' && (localFilters.sort_order === 'desc' ? '↓' : '↑')}
                    </Button>
                </div>

                <div className="filter-actions">
                    <Button type="submit" variant="primary">
                        Применить
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetFilters}>
                        Сбросить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PostFilters;
