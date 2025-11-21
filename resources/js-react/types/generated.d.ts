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
};
