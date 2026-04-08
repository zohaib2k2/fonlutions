import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({ baseURL: BASE_URL });

// Attach token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear token and redirect to login — but NOT on the login request itself
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLoginRequest = err.config?.url?.includes('/auth/login');
    if (err.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('access_token');
      window.location.href = '/blog/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ────────────────────────────────────────────────

export function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}


export function logout() {
  localStorage.removeItem('access_token');
}

export async function register(username: string, email: string, password: string) {
  const res = await api.post('/auth/register', { username, email, password });
  return res.data;
}

export async function login(username: string, password: string) {
  // Must be sent as form-encoded, NOT JSON
  const body = new URLSearchParams({ username, password });
  const res = await api.post('/auth/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  localStorage.setItem('access_token', res.data.access_token);
  return res.data;
}

// ── Posts ───────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  published: boolean;
  created_at: string;
}

export async function getPosts(): Promise<Post[]> {
  const res = await api.get('/posts/');
  return res.data;
}

export async function getPost(slug: string): Promise<Post> {
  const res = await api.get(`/posts/${slug}`);
  return res.data;
}

export async function createPost(data: {
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
}): Promise<Post> {
  const res = await api.post('/posts/', data);
  return res.data;
}

export async function updatePost(
  slug: string,
  data: { title: string; content: string; excerpt?: string; published: boolean }
): Promise<Post> {
  const res = await api.put(`/posts/${slug}`, data);
  return res.data;
}

export async function deletePost(slug: string): Promise<void> {
  await api.delete(`/posts/${slug}`);
}

// ── Helpers ─────────────────────────────────────────────

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}