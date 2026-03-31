import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code, Cloud, Camera, Database } from 'lucide-react';
import { LucideCloudCog } from 'lucide-react';
import { GiServerRack } from 'react-icons/gi';
import { FiUploadCloud } from 'react-icons/fi';
import Services from '@/sections/Services';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const serviceHighlights = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    summary: 'End-to-end web & mobile apps with React, Node.js, and Python.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'DevOps Solutions',
    summary: 'CI/CD pipelines, Docker, Kubernetes and cloud-native infrastructure.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiUploadCloud,
    title: 'Cloud Services',
    summary: 'Scalable cloud architecture, migration, and managed services.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: LucideCloudCog,
    title: 'Cloud Consulting',
    summary: 'Expert guidance on cloud strategy, architecture, and cost optimization.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GiServerRack,
    title: 'Operation Services',
    summary: '24/7 system monitoring, incident management and performance tuning.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Camera,
    title: 'CCTV Installation',
    summary: 'Professional HD surveillance systems with remote monitoring.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Web Scraping',
    summary: 'Custom data extraction pipelines and automated scheduling.',
    color: 'from-orange-500 to-amber-500',
  },
];

export default function OurServices() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle canvas (same animation used in Hero / Services)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
    const particles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', handleMouseMove);

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          const f = (200 - d) / 200;
          p.vx -= (dx / (d || 1)) * f * 0.02;
          p.vy -= (dy / (d || 1)) * f * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(127,86,217,0.55)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dist = Math.sqrt((p.x - o.x) ** 2 + (p.y - o.y) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(127,86,217,${0.18 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const timeout = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="relative min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative py-28 lg:py-36 overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-400">Solutions & Services</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our Solutions{' '}
              <span className="text-gradient">&amp; Services</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              We deliver purpose-built solutions across cloud, software, and security —
              combining deep technical expertise with a clear focus on outcomes that
              matter to your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services-detail">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-8 py-3 text-base magnetic-btn">
                  Discover Our Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <Link to="/#contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-3 text-base">
                  Request a Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick-Glance Service Grid ────────────────────── */}
      <section className="py-16 bg-dark-800/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              End-to-End Solutions,{' '}
              <span className="text-gradient">One Trusted Partner</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From infrastructure and software to physical security — our solutions cover every layer of your technology needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceHighlights.map((s, i) => (
              <div
                key={s.title}
                className="group p-6 rounded-2xl bg-dark-800/60 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Services Cards (reuse Services section) ── */}
      <div id="services-detail">
        <Services />
      </div>

      {/* ── CTA Strip ───────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Turn Your Vision Into a{' '}
            <span className="text-gradient">Working Solution</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Share your challenge and we'll craft a tailored solution that fits your goals — no obligation, just a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-10 py-3 text-base magnetic-btn">
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-10 py-3 text-base">
                Meet the Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
