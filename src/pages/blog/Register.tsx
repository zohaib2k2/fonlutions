import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/blog/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Try a different username.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">

        <div className="rounded-2xl bg-dark-800/70 border border-white/5 p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-400">Blog Admin</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Create an account</h1>
            <p className="text-gray-400 mt-1 text-sm">Start writing for the Fonlutions blog</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Username</label>
              <Input
                type="text"
                placeholder="your_username"
                value={form.username}
                onChange={set('username')}
                required
                className="bg-dark-900/60 border-white/10 text-white placeholder:text-gray-600 h-11"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
                required
                className="bg-dark-900/60 border-white/10 text-white placeholder:text-gray-600 h-11"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                required
                minLength={6}
                className="bg-dark-900/60 border-white/10 text-white placeholder:text-gray-600 h-11"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/blog/login" className="text-purple-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}
