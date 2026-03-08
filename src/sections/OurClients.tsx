import { useEffect, useRef, useState, useCallback } from 'react';
import mearske_logo from '/images/logos/maersk.png';
import glovo_logo from '/images/clients/glovo.png';
import luckycart_logo from '/images/clients/lucky_cart.png';
import unilever_logo from '/images/logos/unilever_logo.svg';
import huawve_logo from '/images/logos/huawei.png';
import de_witte_tulip_logo from '/images/clients/logo-de-witte-tulip-transparent.png';
import accenture from '/images/logos/accenture.png';
import dpworld from '/images/logos/dpworld.png';
import kelloggs from '/images/logos/kelloggs.png';


const brands = [
  { name: 'de witte tulip', file: de_witte_tulip_logo },
  { name: 'Huawve', file: huawve_logo },
  { name: 'Unilever', file: unilever_logo },
  { name: 'LuckyCart', file: luckycart_logo },
  { name: 'Glovo', file: glovo_logo },
  { name: 'Maersk', file: mearske_logo },
  { name: 'Accenture', file: accenture },
  { name: 'DP World', file: dpworld },
  { name: 'Kelloggs', file: kelloggs },
];

export default function OurClients() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // --- Marquee state (all in refs to avoid re-render jank) ---
  const oneSetWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const AUTO_SPEED = 1.2; // px per frame
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false); // only for cursor style

  // Measure one-set width
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    oneSetWidthRef.current = track.scrollWidth / 2;
  }, []);

  // Write offset to DOM directly (no React re-render)
  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track || oneSetWidthRef.current === 0) return;
    const w = oneSetWidthRef.current;
    let o = offsetRef.current % w;
    if (o > 0) o -= w;
    if (o < -w) o += w;
    offsetRef.current = o;
    track.style.transform = `translateX(${o}px)`;
  }, []);

  // rAF loop — auto-scroll + momentum
  useEffect(() => {
    const loop = () => {
      if (!isDraggingRef.current) {
        if (!isHoveringRef.current) {
          offsetRef.current -= AUTO_SPEED;
        }
        if (Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current;
          velocityRef.current *= 0.92; // friction
        } else {
          velocityRef.current = 0;
        }
      }
      applyOffset();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyOffset]);

  // Measure on mount, resize, image load
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    const imgs = trackRef.current?.querySelectorAll('img') ?? [];
    imgs.forEach((img) => img.addEventListener('load', measure));
    return () => {
      window.removeEventListener('resize', measure);
      imgs.forEach((img) => img.removeEventListener('load', measure));
    };
  }, [measure]);

  // --- Pointer handlers (mouse + touch unified) ---
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current + dx;

    const now = performance.now();
    const dt = now - lastDragTimeRef.current;
    if (dt > 0) {
      // Scale to ~60fps frame velocity
      velocityRef.current = ((e.clientX - lastDragXRef.current) / dt) * 130;
    }
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const onMouseEnter = useCallback(() => { isHoveringRef.current = true; }, []);
  const onMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // --- Particle canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    type Particle = { x: number; y: number; vx: number; vy: number; radius: number };
    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    for (let i = 0; i < 60; i++) {
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

    let pRaf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) {
          const f = (200 - d) / 200;
          p.vx -= (dx / (d || 1)) * f * 0.02;
          p.vy -= (dy / (d || 1)) * f * 0.02;
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(127,86,217,0.45)'; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j];
          const dx2 = p.x - o.x, dy2 = p.y - o.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(127,86,217,${0.14 * (1 - dist / 150)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      pRaf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(pRaf);
    };
  }, []);

  return (
    <section id="clients" className="py-20 lg:py-28 relative overflow-hidden">
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

        <div className="relative bg-transparent overflow-hidden w-full rounded-2xl border border-white/5 bg-dark-800 p-6">
          {/* Left fade edge */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #111118, transparent)' }}
          />
          {/* Right fade edge */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #111118, transparent)' }}
          />

          {/* Draggable wrapper */}
          <div
            className="overflow-hidden"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {/* Track — moved via direct DOM transform, no CSS animation */}
            <div
              ref={trackRef}
              className="flex items-center gap-8 w-max will-change-transform select-none"
            >
              {/* Exactly 2 copies for seamless loop */}
              {[0, 1].map((r) =>
                brands.map((b, i) => (
                  <div
                    key={`${b.name}-${r}-${i}`}
                    role="listitem"
                    className="inline-flex h-36 items-center gap-6 px-4 py-3 rounded-xl hover:bg-dark-700/80 transition-colors duration-100"
                    style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                  >
                    <div className="w-40 h-20 flex items-center justify-center">
                      <img
                        src={b.file}
                        alt={`${b.name} logo`}
                        draggable={false}
                        loading="lazy"
                        className={`max-h-16 object-contain ${b.name === 'de witte tulip' ? 'h-28 w-auto' : ''}`}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    {/* <div className="min-w-[110px]">
                      <div className="text-sm font-semibold text-white">{b.name}</div>
                      <div className="text-xs text-gray-300">Client</div>
                    </div> */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}