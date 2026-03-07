import { useEffect, useRef, useState } from 'react';
import { Check, Award, Users, Zap } from 'lucide-react';
import teamImg from '/images/about-team.jpg';

const features = [
  'Expert team of engineers & developers',
  'Cutting-edge technology stack',
  'Agile development methodology',
  '24/7 technical support',
];

const stats = [
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Users, value: '150+', label: 'Projects Completed' },
  { icon: Zap, value: '50+', label: 'Happy Clients' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // particle canvas reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // particle animation (same approach as Hero)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
    const particles: Particle[] = [];
    const count = 60;
    const connectionDistance = 140;
    const mouseDistance = 180;
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.8,
      });
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
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
        ctx.fillStyle = 'rgba(127,86,217,0.55)';
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
            ctx.strokeStyle = `rgba(127,86,217,${0.18 * (1 - dist / connectionDistance)})`;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* particle canvas (placed behind content) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={teamImg}
                  alt="Our team collaborating"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>

              {/* Floating card */}
              <div
                className={`absolute -bottom-6 -right-6 bg-dark-800 rounded-xl p-6 border border-white/10 shadow-glow transition-all duration-1000 delay-300 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-sm text-gray-400">Years of Excellence</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-purple-500/20 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-lg" />
            </div>
          </div>

          {/* Content Column */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Section label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm text-purple-400">About Us</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Building the{' '}
              <span className="text-gradient">Infrastructure</span> of Tomorrow
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We are a team of passionate engineers, developers, and designers
              dedicated to building cutting-edge technology solutions. From
              full-stack applications to DevOps automation, we deliver excellence
              in every project.
            </p>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 rounded-xl bg-dark-800/50 border border-white/5 transition-all duration-500 hover:border-purple-500/30 hover:bg-dark-800 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                >
                  <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
