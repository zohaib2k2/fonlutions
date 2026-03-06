import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import Homepage from '@/pages/Homepage';
import AboutPage from '@/pages/AboutPage';
/* Layout shares Navigation and Footer across routes */
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
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            {/* Add more page routes here, e.g.:
            */}
                <Route path="about" element={<AboutPage />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
