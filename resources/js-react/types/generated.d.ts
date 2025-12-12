export type PostData = {
    id: number;
    title: string;
    content: string;
    url: string;
    user_id: number;
    tags: Array<TagData>;
    user: UserData | null;
    created_at: string | null;
    updated_at: string | null;
};
export type PostFiltersData = {
    search: string | null;
    user_id: number | null;
    created_from: string | null;
    created_to: string | null;
    updated_from: string | null;
    updated_to: string | null;
    sort_by: string | null;
    sort_order: string | null;
};
export type TagData = {
    id: number | null;
    name: string;
    slug: string;
};
export type UserData = {
    id: number;
    name: string;
    email: string;
    created_at: string | null;
    updated_at: string | null;
    image?: {
        id: number;
        url: string;
    } | null;
};
