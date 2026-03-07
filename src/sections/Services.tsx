import { useEffect, useRef, useState } from 'react';
import { Code, Cloud, Camera, Database, ArrowRight, LucideCloudCog } from 'lucide-react';
import fullstackImg from '/images/service-fullstack.jpg';
import devopsImg from '/images/service-devops.jpg';
import cctvImg from '/images/service-cctv.jpg';
import webscrapingImg from '/images/service-webscraping.jpg';
import cloudServiceImg from '/images/cloud-service.jpeg';
import { GiServerRack } from "react-icons/gi";
import { FiUploadCloud } from "react-icons/fi";


const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description:
      'End-to-end web and mobile application development using modern frameworks like React, Node.js, and Python. We build scalable, performant solutions tailored to your business needs.',
    features: ['React & Next.js', 'Node.js & Python', 'Mobile Apps', 'API Development'],
    image: fullstackImg,
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'DevOps Solutions',
    description:
      'Streamline your development pipeline with CI/CD automation, infrastructure as code, and cloud-native solutions. We help you deploy faster and more reliably.',
    features: ['CI/CD Pipelines', 'Docker & Kubernetes', 'AWS/Azure/GCP', 'Monitoring'],
    image: devopsImg,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiUploadCloud,
    title: 'Cloud Services',
    description: "Empower your business with scalable cloud infrastructure and services. We provide cloud architecture design, migration, and management to help you leverage the full potential of the cloud.",
    features: ['Cloud Architecture', 'Migration Services', 'Managed Cloud', 'Cost Optimization'],
    image: cloudServiceImg,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: LucideCloudCog,
    title: 'Cloud Consulting',
    description:
      'Expert guidance on cloud strategy, architecture, and migration. We help you leverage the power of the cloud to drive innovation and efficiency.',
    features: ['Cloud Strategy', 'Architecture Design', 'Migration Planning', 'Cost Optimization'],
    image: devopsImg,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GiServerRack,
    title: 'Operation Services',
    description:
      'Comprehensive operational support and management services to ensure your systems run smoothly and efficiently.',
    features: ['System Monitoring', 'Incident Management', 'Performance Optimization', '24/7 Support'],
    image: cctvImg,
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Camera,
    title: 'CCTV Installation',
    description:
      'Professional security camera installation and monitoring systems for businesses. Protect your assets with state-of-the-art surveillance technology.',
    features: ['HD Cameras', 'Remote Monitoring', 'Cloud Storage', '24/7 Support'],
    image: cctvImg,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Web Scraping',
    description:
      'Extract valuable data from websites efficiently and ethically. We build custom scraping solutions that deliver structured data for your business intelligence.',
    features: ['Data Extraction', 'API Integration', 'Automated Scheduling', 'Data Cleaning'],
    image: webscrapingImg,
    color: 'from-orange-500 to-amber-500',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // particle canvas reference (same animation used in Hero)
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

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* particle canvas (behind content) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm text-purple-400">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Services That Drive{' '}
            <span className="text-gradient">Results</span>
          </h2>
          <p className="text-lg text-gray-400">
            From concept to deployment, we provide comprehensive technology
            services that help your business thrive in the digital age.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-dark-900/40 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-90' : 'opacity-95'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative p-8 lg:p-10 min-h-[400px] flex flex-col">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-glow`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group/link"
                >
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Hover border effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none ${
                  hoveredIndex === index
                    ? 'border-purple-500/50 shadow-glow'
                    : 'border-transparent'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
