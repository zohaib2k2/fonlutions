import { useEffect, useRef } from 'react';
import mearske_logo from '/images/clients/maersk.png';
import glovo_logo from '/images/clients/glovo.png';
import luckycart_logo from '/images/clients/lucky_cart.png';
import unilever_logo from '/images/logos/unilever_logo.svg';
import huawve_logo from '/images/logos/huawei-logo.png';
import de_witte_tulip_logo from '/images/clients/logo-de-witte-tulip-transparent.png';

const brands = [
  { name: 'de witte tulip', file: de_witte_tulip_logo },
  { name: 'Huawve', file: huawve_logo },
  { name: 'Unilever', file: unilever_logo },
  { name: 'LuckyCart', file: luckycart_logo },
  { name: 'Glovo', file: glovo_logo },
  { name: 'Maersk', file: mearske_logo },
  
];

export default function OurClients() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const particleCount = 60;
    const connectionDistance = 150;
    const mouseDistance = 200;
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < particleCount; i++) {
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
        ctx.fillStyle = 'rgba(127,86,217,0.45)';
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
            ctx.strokeStyle = `rgba(127,86,217,${0.14 * (1 - dist / connectionDistance)})`;
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
    <section id="clients" className="py-20 lg:py-28 relative overflow-hidden">
      {/* particle canvas behind content */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-lg text-gray-400">
            Explore some of our recent work that showcases our expertise and
            commitment to excellence.
          </p>
        </div>
        {/* Make the client slider a bit larger so that its visible */}

        <div className="relative overflow-hidden w-full h-full rounded-2xl border border-white/5 bg-dark-800 p-6">
          <div
            className="clients-marquee whitespace-nowrap w-full h-fulls flex items-center gap-8"
            role="list"
            aria-label="Client logos"
          >
            {/* duplicate list for seamless loop */}
            {Array.from({ length: 2 }).map((_, r) =>
              brands.map((b, i) => (
                <div
                  key={`${b.name}-${r}-${i}`}
                  role="listitem"
                  className="inline-flex h-36 items-center gap-6 px-4 py-3 rounded-xl bg-dark-700/60 hover:bg-dark-700/80 transition-colors duration-250"
                >
                  {/* make de witte tulip logo bigger only */}
                  <div className="w-40 h-20 flex items-center justify-center">
                    <img
                      src={b.file}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      className={`max-h-16 object-contain ${b.name === 'de witte tulip' ? 'h-28 w-auto' : ''}`}
                      onError={(e) => {
                        // hide broken image gracefully
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="min-w-[110px]">
                    <div className="text-sm font-semibold text-white">{b.name}</div>
                    <div className="text-xs text-gray-300">Client</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <style>{`
            .clients-marquee { animation: clients-marquee-anim 20s linear infinite; }
            .clients-marquee:hover { animation-play-state: paused; }
            @keyframes clients-marquee-anim { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .clients-marquee > * { flex: 0 0 auto; }
            @media (max-width: 640px) {
              .clients-marquee { gap: 12px; }
              .clients-marquee img { max-height: 36px; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}