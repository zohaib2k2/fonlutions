import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight, PenLine, UserPlus, LogIn } from 'lucide-react';
import { getPosts, formatDate, isLoggedIn, type Post } from '@/lib/api';

export default function BlogHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-purple-400">Our Blog</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Insights &amp; <span className="text-gradient">Ideas</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Thoughts on software, cloud, and the technology we work with every day.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {isLoggedIn() ? (
              <Link
                to="/blog/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                <PenLine className="w-4 h-4" />
                New Post
              </Link>
            ) : (
              <>
                <Link
                  to="/blog/register"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
                <Link
                  to="/blog/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-dark-800/60 border border-white/5 p-6 animate-pulse">
                <div className="h-5 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-1/2 mb-4" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400">{error}</div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20 text-gray-500">No posts yet. Check back soon.</div>
        )}

        {/* Posts list */}
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-dark-800/60 border border-white/5 hover:border-purple-500/30 p-7 transition-all duration-300 hover:-translate-y-0.5"
              >
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {formatDate(post.created_at)}
                </div>
                {post.excerpt && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-sm text-purple-400 group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
