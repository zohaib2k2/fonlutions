import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import herobg from '/cloud-consulting-v2-upscaled.png';
import devopsImg from '/images/our-devops-solutions2.jpg';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [_isVisible, setIsVisible] = useState(false);

  // Slider state
  const slides = [
    {
      key: 'dev',
      title: 'Our Development Solutions',
      desc: 'End-to-end web & mobile apps using modern frameworks, clean APIs and scalable architectures.',
      image: 'https://ocean12tech.com/wp-content/uploads/2023/11/Software-Development.jpg',
    },
    {
      key: 'devops',
      title: 'Our DevOps Solutions',
      desc: 'CI/CD, infrastructure as code, automated deployments and monitoring to ship reliably at scale.',
      image: devopsImg,
    },
    {
      key: 'ims',
      title: 'Our Information Management Service',
      desc: 'Secure storage, backup & data pipelines that keep your information available, searchable and compliant.',
      image: 'https://static.vecteezy.com/system/resources/previews/027/784/827/non_2x/futuristic-infrastructure-of-a-smart-city-residential-urban-buildings-for-isometric-innovation-flat-design-digital-communication-technology-vector.jpg',
    },
  ];
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  // show animations
  useEffect(() => { setIsVisible(true); }, []);

  // autoplay
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, []);

  // Particle network animation (kept from original)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle { x: number; y: number; vx: number; vy: number; radius: number; }

    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseDistance = 200;
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

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
        if (d < mouseDistance) {
          const f = (mouseDistance - d) / mouseDistance;
          p.vx -= (dx / (d || 1)) * f * 0.02;
          p.vy -= (dy / (d || 1)) * f * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(127,86,217,0.6)';
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
            ctx.strokeStyle = `rgba(127,86,217,${0.2 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goto = (i: number) => {
    setIndex(i % slides.length);
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = window.setInterval(() => setIndex((s) => (s + 1) % slides.length), 5000);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <img src={herobg} alt="Hero background" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900" />
      </div>

      {/* particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* headline at top */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Empowering modern businesses with reliable technology
        </h1>
      </div>

      {/* Slider area */}
      {/* place the slider slightly above */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative">
            {/* slides wrapper - made much larger for hero */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ minHeight: '66vh' }}
            >
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((s, i) => (
                  <div
                    key={s.key}
                    className="w-full flex-shrink-0 px-6 py-8 lg:py-16"
                    aria-hidden={i !== index}
                  >
                    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center h-full">
                      {/* left: text (transparent panel) */}
                      <div className="col-span-7 h-full flex flex-col justify-center">
                        <div className="backdrop-blur-sm bg-white/6 rounded-xl p-8 sm:p-12 border border-white/6 h-full flex flex-col justify-center">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                            <span className="text-sm text-purple-300">Featured</span>
                          </div>

                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                            {s.title}
                          </h2>
                          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
                            {s.desc}
                          </p>

                          <div className="flex gap-4 pt-2">
                            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-4 text-base">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/20 text-white px-6 py-4 text-base" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                              View Work
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* right: image */}
                      <div className="col-span-5 flex items-center justify-center">
                        <div className="w-full rounded-xl overflow-hidden ring-1 ring-white/6">
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-[44vh] lg:h-[56vh] object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* controls */}
            {/* Make the back ground of controls semi-transparent */}
            <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-4">
              <button
                aria-label="Previous slide"
                onClick={() => goto((index - 1 + slides.length) % slides.length)}
                className="p-3 rounded-full border-cyan-500 bg-dark-800/60 text-white hover:bg-dark-800/80"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goto(i)}
                    className={`w-4 h-4 rounded-full ${i === index ? 'bg-purple-400' : 'bg-blue-600s'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                aria-label="Next slide"
                onClick={() => goto((index + 1) % slides.length)}
                className="p-3 rounded-full bg-dark-800/60 text-white hover:bg-dark-800/80"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
    </section>
  );
}
