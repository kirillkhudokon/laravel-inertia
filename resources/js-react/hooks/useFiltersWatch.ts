import { useState, useMemo, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';

interface UseFiltersOptions<T> {
    initialFilters: T;
    debounceMs?: number;
    debounceFields?: (keyof T)[];
}

interface UseFiltersReturn<T> {
    localFilters: T;
    setLocalFilters: React.Dispatch<React.SetStateAction<T>>;
    debouncedSetLocalFilters: (newFilters: T) => void
}

export function useFiltersWatch<T extends Record<string, any>>({
    initialFilters,
}: UseFiltersOptions<T>): UseFiltersReturn<T> {
    const [localFilters, setLocalFilters] = useState<T>(initialFilters);

    const getCleanedFilters = (filters: T) => {
        return Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
        );
    };

    const applyFilters = (newFilters: T) => {
        const cleanFilters = getCleanedFilters(newFilters);
        router.get('/', cleanFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const debouncedSetLocalFilters = useMemo(
        () => debounce(applyFilters, 500),
        []
    );


    useEffect(() => {
        applyFilters(localFilters);
        return () => {
            debouncedSetLocalFilters.cancel();
        };
    }, [localFilters]);

    return {
        localFilters,
        setLocalFilters,
        debouncedSetLocalFilters
    };
}
