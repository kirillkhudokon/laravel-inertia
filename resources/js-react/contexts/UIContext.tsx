import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ButtonComponent = typeof import('ui/Button').default;
type InputComponent = typeof import('ui/Input').default;
type LinkComponent = typeof import('ui/Link').default;
type TextAreaComponent = typeof import('ui/Textarea').default;
type AlertComponent = typeof import('ui/Alert').default;
type CardComponent = typeof import('ui/Card').default;
type PaginationComponent = typeof import('ui/Pagination').default;
type TagInputComponent = typeof import('ui/TagInput').TagInput;
type DateRangePickerComponent = typeof import('ui/DateRangePicker').DateRangePicker;
type DateRangeFilterComponent = typeof import('ui/DateRangeFilter').DateRangeFilter;
type PostFiltersComponent = typeof import('ui/PostFilters').default;
type ImageUploadComponent = typeof import('ui/ImageUpload').default;

type ShadcnButtonComponent = typeof import('ui/ui/button').Button;
type ShadcnInputComponent = typeof import('ui/ui/input').Input;
type CalendarComponent = typeof import('ui/ui/calendar').Calendar;
type PopoverComponent = typeof import('ui/ui/popover').Popover;
type PopoverTriggerComponent = typeof import('ui/ui/popover').PopoverTrigger;
type PopoverContentComponent = typeof import('ui/ui/popover').PopoverContent;

type UseFiltersWatchHook = typeof import('ui/hooks/useFiltersWatch').useFiltersWatch;
type UseSortFilterHook = typeof import('ui/hooks/useSortFilter').useSortFilter;
type UseDateRangeFilterHook = typeof import('ui/hooks/useDateRangeFilter').useDateRangeFilter;
type FormatDateToLocalFn = typeof import('ui/hooks/useDateRangeFilter').formatDateToLocal;

type CnFunction = typeof import('ui/utils').cn;

interface UIComponents {
  Button: ButtonComponent;
  Input: InputComponent;
  Link: LinkComponent;
  TextArea: TextAreaComponent;
  TagInput: TagInputComponent;
  Alert: AlertComponent;
  Card: CardComponent;
  Pagination: PaginationComponent;
  DateRangePicker: DateRangePickerComponent;
  DateRangeFilter: DateRangeFilterComponent;
  PostFilters: PostFiltersComponent;
  ImageUpload: ImageUploadComponent;

  ShadcnButton: ShadcnButtonComponent;
  ShadcnInput: ShadcnInputComponent;
  Calendar: CalendarComponent;
  Popover: PopoverComponent;
  PopoverTrigger: PopoverTriggerComponent;
  PopoverContent: PopoverContentComponent;
}

interface UIHooks {
  useFiltersWatch: UseFiltersWatchHook;
  useSortFilter: UseSortFilterHook;
  useDateRangeFilter: UseDateRangeFilterHook;
  formatDateToLocal: FormatDateToLocalFn;
}

interface UIUtils {
  cn: CnFunction;
}

interface UIContextValue {
  components: UIComponents | null;
  hooks: UIHooks | null;
  utils: UIUtils | null;
  isLoading: boolean;
}

const UIContext = createContext<UIContextValue>({
  components: null,
  hooks: null,
  utils: null,
  isLoading: true,
});

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [components, setComponents] = useState<UIComponents | null>(null);
  const [hooks, setHooks] = useState<UIHooks | null>(null);
  const [utils, setUtils] = useState<UIUtils | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUI = async () => {
      try {
        const [
          buttonModule,
          inputModule,
          linkModule,
          textAreaModule,
          tagInputModule,
          alertModule,
          cardModule,
          paginationModule,
          dateRangePickerModule,
          dateRangeFilterModule,
          postFiltersModule,
          imageUploadModule,

          shadcnButtonModule,
          shadcnInputModule,
          calendarModule,
          popoverModule,

          filtersHookModule,
          sortFilterHookModule,
          dateRangeHookModule,

          utilsModule,
        ] = await Promise.all([
          import('ui/Button'),
          import('ui/Input'),
          import('ui/Link'),
          import('ui/Textarea'),
          import('ui/TagInput'),
          import('ui/Alert'),
          import('ui/Card'),
          import('ui/Pagination'),
          import('ui/DateRangePicker'),
          import('ui/DateRangeFilter'),
          import('ui/PostFilters'),
          import('ui/ImageUpload'),

          import('ui/ui/button'),
          import('ui/ui/input'),
          import('ui/ui/calendar'),
          import('ui/ui/popover'),

          import('ui/hooks/useFiltersWatch'),
          import('ui/hooks/useSortFilter'),
          import('ui/hooks/useDateRangeFilter'),

          import('ui/utils'),
        ]);

        setComponents({
          Button: buttonModule.default,
          Input: inputModule.default,
          Link: linkModule.default,
          TextArea: textAreaModule.default,
          TagInput: tagInputModule.TagInput,
          Alert: alertModule.default,
          Card: cardModule.default,
          Pagination: paginationModule.default,
          DateRangePicker: dateRangePickerModule.DateRangePicker,
          DateRangeFilter: dateRangeFilterModule.DateRangeFilter,
          PostFilters: postFiltersModule.default,
          ImageUpload: imageUploadModule.default,
          ShadcnButton: shadcnButtonModule.Button,
          ShadcnInput: shadcnInputModule.Input,
          Calendar: calendarModule.Calendar,
          Popover: popoverModule.Popover,
          PopoverTrigger: popoverModule.PopoverTrigger,
          PopoverContent: popoverModule.PopoverContent,
        });

        setHooks({
          useFiltersWatch: filtersHookModule.useFiltersWatch,
          useSortFilter: sortFilterHookModule.useSortFilter,
          useDateRangeFilter: dateRangeHookModule.useDateRangeFilter,
          formatDateToLocal: dateRangeHookModule.formatDateToLocal,
        });

        setUtils({
          cn: utilsModule.cn,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load UI microfrontend:', error);
        setIsLoading(false);
      }
    };

    loadUI();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Загрузка UI компонентов...</div>
      </div>
    );
  }

  if (!components || !hooks || !utils) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Ошибка загрузки UI компонентов</div>
      </div>
    );
  }

  return (
    <UIContext.Provider value={{ components, hooks, utils, isLoading }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export const useUIComponents = () => {
  const { components } = useUI();
  return components!;
};

export const useUIHooks = () => {
  const { hooks } = useUI();
  return hooks!;
};

export const useUIUtils = () => {
  const { utils } = useUI();
  return utils!;
};
