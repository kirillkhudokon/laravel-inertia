declare module 'ui/*' {
  const component: any;
  export = component;
}

declare module 'ui/Button' {
  import { FC, PropsWithChildren } from 'react';
  
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger' | 'link' | 'success';
    size?: 'small' | 'normal' | 'large' | 'sm' | 'md';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
  }
  
  const Button: FC<PropsWithChildren<ButtonProps>>;
  export default Button;
}

declare module 'ui/Input' {
  import { FC, InputHTMLAttributes } from 'react';
  
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    required?: boolean;
  }
  
  const Input: FC<InputProps>;
  export default Input;
}

declare module 'ui/Textarea' {
  import { FC, TextareaHTMLAttributes } from 'react';
  
  interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    required?: boolean;
  }
  
  const TextArea: FC<TextAreaProps>;
  export default TextArea;
}

declare module 'ui/Link' {
  import { FC, AnchorHTMLAttributes, PropsWithChildren } from 'react';
  
  interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: 'default' | 'button';
  }
  
  const Link: FC<PropsWithChildren<LinkProps>>;
  export default Link;
}

declare module 'ui/Alert' {
  import { FC, PropsWithChildren } from 'react';
  
  interface AlertProps {
    variant?: 'danger';
    type?: 'success' | 'error' | 'warning' | 'info' | 'danger';
    className?: string;
  }
  
  const Alert: FC<PropsWithChildren<AlertProps>>;
  export default Alert;
}

declare module 'ui/Card' {
  import { FC, PropsWithChildren, HTMLAttributes } from 'react';
  
  interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'featured';
    padding?: 'small' | 'normal' | 'large';
    className?: string;
  }
  
  const Card: FC<PropsWithChildren<CardProps>>;
  export default Card;
}

declare module 'ui/ui/button' {
  import { ComponentProps } from 'react';
  import { VariantProps } from 'class-variance-authority';
  
  export const Button: React.ForwardRefExoticComponent<
    ComponentProps<'button'> & VariantProps<any> & {
      asChild?: boolean;
    }
  >;
  export const buttonVariants: any;
}

declare module 'ui/ui/input' {
  import { ComponentProps } from 'react';
  export const Input: React.ForwardRefExoticComponent<ComponentProps<'input'>>;
}

declare module 'ui/ui/calendar' {
  export const Calendar: React.ComponentType<any>;
}

declare module 'ui/ui/popover' {
  export const Popover: React.ComponentType<any>;
  export const PopoverTrigger: React.ComponentType<any>;
  export const PopoverContent: React.ComponentType<any>;
}

declare module 'ui/DateRangePicker' {
  import { DateRange } from 'react-day-picker';
  export const DateRangePicker: React.ComponentType<{
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    placeholder?: string;
    className?: string;
  }>;
}

declare module 'ui/DateRangeFilter' {
  export interface DateRangeFilterRef {
    reset: () => void;
  }
  export const DateRangeFilter: React.ForwardRefExoticComponent<{
    initialFrom?: string | null;
    initialTo?: string | null;
    placeholder?: string;
    onChange?: (from: string | null, to: string | null) => void;
  }>;
}

declare module 'ui/TagInput' {
  export interface Tag {
    id?: number;
    name: string;
  }
  
  export const TagInput: React.FC<{
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    className?: string;
    onSearch?: (term: string) => void;
    suggestions?: Tag[];
    maxTags?: number;
    allowDuplicates?: boolean;
    debounceMs?: number;
  }>;
}

declare module 'ui/Pagination' {
  export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  
  export interface PaginationData<T = any> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  const Pagination: React.ComponentType<{ links: PaginationLink[]; LinkComponent?: any }>;
  export default Pagination;
}

declare module 'ui/PostFilters' {
  interface PostFiltersData {
    search: string | null;
    user_id: number | null;
    created_from: string | null;
    created_to: string | null;
    updated_from: string | null;
    updated_to: string | null;
    sort_by: string | null;
    sort_order: string | null;
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }

  interface PostFiltersProps {
    filters: PostFiltersData;
    users: User[];
    onFiltersChange?: (filters: Record<string, any>) => void;
  }

  const PostFilters: React.FC<PostFiltersProps>;
  export default PostFilters;
}

declare module 'ui/hooks/useFiltersWatch' {
  export function useFiltersWatch<T extends Record<string, any>>(options: {
    initialFilters: T;
    debounceMs?: number;
    debounceFields?: (keyof T)[];
    onFiltersChange?: (filters: Record<string, any>) => void;
  }): {
    localFilters: T;
    setLocalFilters: React.Dispatch<React.SetStateAction<T>>;
    debouncedSetLocalFilters: (newFilters: T) => void;
  };
}

declare module 'ui/hooks/useSortFilter' {
  type SortOrder = 'asc' | 'desc';
  export function useSortFilter<T extends string>(
    initialField: T,
    initialOrder?: SortOrder
  ): {
    sortBy: T;
    sortOrder: SortOrder;
    handleSort: (field: T) => void;
    reset: (defaultField: T, defaultOrder?: SortOrder) => void;
  };
}

declare module 'ui/hooks/useDateRangeFilter' {
  import { DateRange } from 'react-day-picker';
  export function formatDateToLocal(date: Date): string;
  export function useDateRangeFilter(
    initialFrom?: string | null,
    initialTo?: string | null
  ): {
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    reset: () => void;
  };
}

declare module 'ui/utils' {
  import { ClassValue } from 'clsx';
  export function cn(...inputs: ClassValue[]): string;
}
