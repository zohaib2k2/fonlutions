import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import Homepage from '@/pages/Homepage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/OurServices';
import BlogHome from '@/pages/blog/BlogHome';
import BlogPost from '@/pages/blog/BlogPost';
import Login from '@/pages/blog/Login';
import Register from '@/pages/blog/Register';
import Dashboard from '@/pages/blog/Dashboard';
import CreatePost from '@/pages/blog/CreatePost';
import EditPost from '@/pages/blog/EditPost';
import { isLoggedIn } from '@/lib/api';

/* Shared layout — Navigation + Footer wrap all public routes */
function Layout() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

/* Redirects unauthenticated users to /blog/login */
function ProtectedRoute() {
  if (!isLoggedIn()) return <Navigate to="/blog/login" replace />;
  return <Outlet />;
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-dark-900 overflow-x-hidden">
        {/* Background grid pattern */}
        <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none" />

        {/* Floating gradient orbs */}
        <div className="fixed top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="fixed bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <Routes>
          {/* ── Main site ─────────────────────────────── */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />

            {/* ── Blog (public) ────────────────────────── */}
            <Route path="blog" element={<BlogHome />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="blog/login" element={<Login />} />
            <Route path="blog/register" element={<Register />} />

            {/* ── Blog (protected) ─────────────────────── */}
            <Route element={<ProtectedRoute />}>
              <Route path="blog/dashboard" element={<Dashboard />} />
              <Route path="blog/create" element={<CreatePost />} />
              <Route path="blog/edit/:slug" element={<EditPost />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
