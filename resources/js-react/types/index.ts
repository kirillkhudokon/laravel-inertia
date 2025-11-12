export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  url: string;
  user_id: number;
  user?: User;
  tags?: Tag[];
  created_at: string;
  updated_at: string;
}

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
  [key: string]: any; // fix me
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