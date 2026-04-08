import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Pencil, Trash2, PenLine, LogOut } from 'lucide-react';
import { getPosts, deletePost, formatDate, logout, type Post } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post permanently?')) return;
    setDeletingSlug(slug);
    try {
      await deletePost(slug);
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch {
      setError('Failed to delete post.');
    } finally {
      setDeletingSlug(null);
    }
  }

  function handleLogout() {
    logout();
    navigate('/blog');
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-400">Admin</span>
            </div>
            <h1 className="text-4xl font-bold text-white">
              Your <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-1">Manage and publish your posts</p>
          </div>

          <div className="flex gap-3">
            <Link to="/blog/create">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 gap-2">
                <PenLine className="w-4 h-4" /> New Post
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-white/10 text-gray-400 hover:text-white hover:bg-white/5 gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 mb-6">
            {error}
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-dark-800/60 border border-white/5 p-6 animate-pulse">
                <div className="h-5 bg-white/5 rounded w-1/2 mb-3" />
                <div className="h-3 bg-white/5 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && !error && (
          <div className="text-center py-24 rounded-2xl border border-dashed border-white/10">
            <p className="text-gray-500 mb-4">No posts yet.</p>
            <Link to="/blog/create">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                Write your first post
              </Button>
            </Link>
          </div>
        )}

        {/* Posts table */}
        {!loading && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-dark-800/60 border border-white/5 px-6 py-4 hover:border-white/10 transition-colors"
              >
                <div className="min-w-0">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <CalendarDays className="w-3 h-3" />
                      {formatDate(post.created_at)}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        post.published
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link to={`/blog/edit/${post.slug}`}>
                    <Button size="sm" variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-1.5">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(post.slug)}
                    disabled={deletingSlug === post.slug}
                    className="gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {deletingSlug === post.slug ? '…' : 'Delete'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
