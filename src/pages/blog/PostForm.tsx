import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
}

interface Props {
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  submitLabel: string;
}

export default function PostForm({ initialData, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<PostFormData>({
    title: initialData?.title ?? '',
    content: initialData?.content ?? '',
    excerpt: initialData?.excerpt ?? '',
    published: initialData?.published ?? false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: keyof PostFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Title */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Title</label>
        <Input
          type="text"
          placeholder="Your post title"
          value={form.title}
          onChange={set('title')}
          required
          className="bg-dark-900/60 border-white/10 text-white placeholder:text-gray-600 h-12 text-base"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">
          Excerpt <span className="text-gray-600">(optional — shown in the post list)</span>
        </label>
        <Input
          type="text"
          placeholder="A short summary of your post…"
          value={form.excerpt}
          onChange={set('excerpt')}
          className="bg-dark-900/60 border-white/10 text-white placeholder:text-gray-600 h-11"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Content</label>
        <textarea
          placeholder="Write your post here…"
          value={form.content}
          onChange={set('content')}
          required
          rows={16}
          className="w-full rounded-md border border-white/10 bg-dark-900/60 text-white placeholder:text-gray-600 px-3 py-3 text-sm leading-relaxed resize-y outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all"
        />
      </div>

      {/* Published toggle */}
      <div className="flex items-center justify-between rounded-xl bg-dark-900/40 border border-white/5 px-5 py-4">
        <div>
          <p className="text-white text-sm font-medium">Publish post</p>
          <p className="text-gray-500 text-xs mt-0.5">
            {form.published ? 'Visible to everyone' : 'Saved as a draft — not public'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
            form.published ? 'bg-purple-500' : 'bg-white/10'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
              form.published ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 text-base"
      >
        {loading ? 'Saving…' : submitLabel}
      </Button>
    </form>
  );
}
