import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPost, updatePost, type Post } from '@/lib/api';
import PostForm, { type PostFormData } from './PostForm';

export default function EditPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    getPost(slug)
      .then(setPost)
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(data: PostFormData) {
    if (!slug) return;
    const updated = await updatePost(slug, {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || undefined,
      published: data.published,
    });
    navigate(`/blog/${updated.slug}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 space-y-5 animate-pulse">
          <div className="h-5 bg-white/5 rounded w-1/4 mb-10" />
          <div className="h-8 bg-white/5 rounded w-2/3 mb-8" />
          <div className="rounded-2xl bg-dark-800/60 border border-white/5 p-8 space-y-4">
            <div className="h-11 bg-white/5 rounded" />
            <div className="h-11 bg-white/5 rounded" />
            <div className="h-48 bg-white/5 rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen py-20 text-center">
        <p className="text-red-400 mb-4">{error || 'Post not found.'}</p>
        <Link to="/blog/dashboard" className="text-purple-400 hover:underline">
          ← Back to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to="/blog/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-400 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-purple-400">Editing</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Edit <span className="text-gradient">Post</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm truncate">{post.title}</p>
        </div>

        <div className="rounded-2xl bg-dark-800/60 border border-white/5 p-8">
          <PostForm
            initialData={{
              title: post.title,
              content: post.content,
              excerpt: post.excerpt ?? '',
              published: post.published,
            }}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
          />
        </div>

      </div>
    </main>
  );
}
