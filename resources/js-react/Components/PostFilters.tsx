import { FC, useRef, useState } from 'react';
import { Input, Button, DateRangeFilter, DateRangeFilterRef } from '../Components';
import { User, PostFiltersData } from '@/types';
import { useSortFilter } from '../hooks/useSortFilter';
import { useFiltersWatch } from '../hooks/useFiltersWatch';

interface PostFiltersProps {
    filters: PostFiltersData;
    users: User[];
}

const PostFilters: FC<PostFiltersProps> = ({ filters, users }) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const { localFilters, setLocalFilters, debouncedSetLocalFilters } = useFiltersWatch<PostFiltersData>({
        initialFilters: filters,
    });
    
    const createdDateRef = useRef<DateRangeFilterRef>(null);
    const updatedDateRef = useRef<DateRangeFilterRef>(null);
    
    const sortFilter = useSortFilter<'created_at' | 'updated_at'>(
        filters.sort_by as 'created_at' | 'updated_at',
        filters.sort_order as 'asc' | 'desc'
    );

    const handleSearchChange = (value: string) => {
        setSearch(value);
        debouncedSetLocalFilters({ ...localFilters, search: value });
    };

    const handleFilterChange = (key: keyof PostFiltersData, value: string | number | null) => {
        setLocalFilters((prev: PostFiltersData) => ({ ...prev, [key]: value }));
    };

    const handleCreatedDateChange = (from: string | null, to: string | null) => {
        setLocalFilters((prev: PostFiltersData) => ({
            ...prev,
            created_from: from,
            created_to: to,
        }));
    };

    const handleUpdatedDateChange = (from: string | null, to: string | null) => {
        setLocalFilters((prev: PostFiltersData) => ({
            ...prev,
            updated_from: from,
            updated_to: to,
        }));
    };

    const handleSort = (field: 'created_at' | 'updated_at') => {
        sortFilter.handleSort(field);
        const newOrder = sortFilter.sortBy === field && sortFilter.sortOrder === 'desc' ? 'asc' : 'desc';
        
        setLocalFilters((prev: PostFiltersData) => ({ 
            ...prev, 
            sort_by: field, 
            sort_order: newOrder
        }));
    };

    const resetFilters = () => {
        const emptyFilters: PostFiltersData = {
            search: null,
            user_id: null,
            created_from: null,
            created_to: null,
            updated_from: null,
            updated_to: null,
            sort_by: 'created_at',
            sort_order: 'desc',
        };
        
        setLocalFilters(emptyFilters);
        createdDateRef.current?.reset();
        updatedDateRef.current?.reset();
        sortFilter.reset('created_at', 'desc');
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <h3>Фильтры и сортировка</h3>
            </div>

            <div className="filters-form">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Поиск по названию</label>
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value ?? '')}
                            placeholder="Введите название..."
                        />
                    </div>

                    <div className="filter-group">
                        <label>Автор</label>
                        <select
                            value={localFilters.user_id || ''}
                            onChange={(e) => handleFilterChange('user_id', e.target.value ? Number(e.target.value) : null)}
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
                        <label>Период создания</label>
                        <DateRangeFilter
                            ref={createdDateRef}
                            initialFrom={filters.created_from}
                            initialTo={filters.created_to}
                            onChange={handleCreatedDateChange}
                            placeholder="Выберите период"
                        />
                    </div>

                    <div className="filter-group">
                        <label>Период обновления</label>
                        <DateRangeFilter
                            ref={updatedDateRef}
                            initialFrom={filters.updated_from}
                            initialTo={filters.updated_to}
                            onChange={handleUpdatedDateChange}
                            placeholder="Выберите период"
                        />
                    </div>
                </div>

                {/* Сортировка */}
                <div className="sort-buttons">
                    <label>Сортировка:</label>
                    <Button
                        type="button"
                        variant={sortFilter.sortBy === 'created_at' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('created_at')}
                    >
                        По дате создания {sortFilter.sortBy === 'created_at' && (sortFilter.sortOrder === 'desc' ? '↓' : '↑')}
                    </Button>
                    <Button
                        type="button"
                        variant={sortFilter.sortBy === 'updated_at' ? 'primary' : 'secondary'}
                        onClick={() => handleSort('updated_at')}
                    >
                        По дате обновления {sortFilter.sortBy === 'updated_at' && (sortFilter.sortOrder === 'desc' ? '↓' : '↑')}
                    </Button>
                </div>

                <div className="filter-actions">
                    <Button type="button" variant="secondary" onClick={resetFilters}>
                        Сбросить фильтры
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PostFilters;
