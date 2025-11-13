// Import auto-generated types from Laravel Data
import type { UserData, TagData, PostData } from './generated';

// Re-export with convenient names
export type User = UserData;
export type Tag = TagData;
export type Post = PostData;

export interface Flash {
  success?: string;
  error?: string;
}

export interface Auth {
  user: User | null;
}

export interface PageProps {
  auth: Auth;
  flash: Flash;
  posts?: Post[];
  post?: Post;
  errors?: Record<string, string>;
  tagSuggestions?: Tag[];
  tagQuery?: string;
  [key: string]: any;
}

export interface PostIndexProps extends PageProps {
  posts: Post[];
}

export interface PostShowProps extends PageProps {
  post: Post;
}

export interface PostCreateProps extends PageProps {}

export interface PostEditProps extends PageProps {
  post: Post;
}

export interface PostMyPostsProps extends PageProps {
  posts: Post[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface PostFormData {
  title: string;
  content: string;
}