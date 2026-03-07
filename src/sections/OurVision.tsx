import { useEffect, useRef } from 'react';
import { Code, Server, Database } from 'lucide-react';

const items = [
  {
    key: 'cloud',
    title: 'What sets us apart',
    desc: 'We combine development, DevOps and information management expertise with a security-first mindset and scalable cloud practices — tailored to your organisation.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60',
    icon: Code,
  },
  {
    key: 'vision',
    title: 'Our Vision',
    desc: 'To empower organizations through innovative technology solutions that drive growth and efficiency.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60',
    icon: Server,
  },
  {
    key: 'mission',
    title: 'Our Mission',
    desc: 'To deliver high-quality, secure, and scalable technology services that enable our clients to achieve their business goals.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60',
    icon: Database,
  },
];

export default function OurVision() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth || window.innerWidth;
      canvas.height = canvas.clientHeight || Math.max(window.innerHeight * 0.6, 600);
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
    const particles: Particle[] = [];
    const particleCount = 70;
    const connectionDistance = 140;
    const mouseDistance = 180;
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
      });
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    const loop = () => {
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
        if (d < mouseDistance) {
          const f = (mouseDistance - d) / mouseDistance;
          p.vx -= (dx / (d || 1)) * f * 0.02;
          p.vy -= (dy / (d || 1)) * f * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,58,237,0.55)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dx2 = p.x - o.x;
          const dy2 = p.y - o.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(124,58,237,${0.18 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-dark-900">
      {/* decorative background shapes */}
      <div className="absolute -left-20 -top-10 w-[640px] h-[640px] bg-gradient-to-br from-purple-700/8 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[520px] h-[520px] bg-gradient-to-tr from-blue-600/6 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* particle canvas behind content */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Fonlution — Your Trusted Technology Partner
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            We deliver Development, DevOps and Information Management services combined with security and scalable cloud practices — tailored to your organisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((it, idx) => {
            const Icon = it.icon;
            return (
              <div key={it.key} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/3 border-0 backdrop-blur-sm">
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-1 ring-white/8 bg-gradient-to-br from-black/20 to-transparent">
                  <img src={it.img} alt={it.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500 text-white text-xs font-semibold flex items-center justify-center shadow"> {idx + 1} </div>
                </div>

                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">{it.title}</h3>
                <p className="text-gray-300 text-sm">{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}