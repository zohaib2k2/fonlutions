import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CalendarDays, ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { getPost, deletePost, formatDate, isLoggedIn, type Post } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getPost(slug)
      .then(setPost)
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleDelete() {
    if (!slug || !confirm('Delete this post?')) return;
    setDeleting(true);
    try {
      await deletePost(slug);
      navigate('/blog');
    } catch {
      setDeleting(false);
      setError('Failed to delete post.');
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 space-y-4 animate-pulse">
          <div className="h-8 bg-white/5 rounded w-3/4" />
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="space-y-2 pt-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-4 bg-white/5 rounded" />)}
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen py-20 text-center">
        <p className="text-red-400 mb-4">{error || 'Post not found.'}</p>
        <Link to="/blog" className="text-purple-400 hover:underline">← Back to Blog</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-400 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="w-4 h-4" />
            {formatDate(post.created_at)}
          </div>

          {/* Edit / Delete — only shown when logged in */}
          {isLoggedIn() && (
            <div className="flex gap-2">
              <Link to={`/blog/edit/${post.slug}`}>
                <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-1.5">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
                className="gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {deleting ? 'Deleting…' : 'Delete'}
              </Button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-10" />

        {/* Content */}
        <article className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </article>

      </div>
    </main>
  );
}
