import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createPost } from '@/lib/api';
import PostForm, { type PostFormData } from './PostForm';

export default function CreatePost() {
  const navigate = useNavigate();

  async function handleSubmit(data: PostFormData) {
    const post = await createPost({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || undefined,
      published: data.published,
    });
    navigate(`/blog/${post.slug}`);
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
            <span className="text-sm text-purple-400">New Post</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Write a <span className="text-gradient">Post</span>
          </h1>
        </div>

        <div className="rounded-2xl bg-dark-800/60 border border-white/5 p-8">
          <PostForm submitLabel="Publish Post" onSubmit={handleSubmit} />
        </div>

      </div>
    </main>
  );
}
