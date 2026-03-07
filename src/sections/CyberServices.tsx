import { useEffect, useRef, useState } from 'react';
import { Shield, Server, Database, HardDrive, ArrowRight } from 'lucide-react';
import { BrickWallFire } from 'lucide-react';

const cyberServices = [
	{
		icon: BrickWallFire,
		title: 'Network Security',
		description:
			'Our network security services protect your business from cyber threats and ensure the integrity of your data and systems.',
		features: [
			'Firewall management',
			'Intrusion detection',
			'VPN & remote access',
			'Security audits',
		],
		color: 'from-purple-500 to-pink-500',
		image:
			'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=80', // network cables / equipment
	},
	{
		icon: Shield,
		title: 'Endpoint Security',
		description:
			'At Net Desire, we put best-of-breed technologies into action, so security becomes a business enabler — not an everyday distraction.',
		features: [
			'Anti-malware & EDR',
			'Policy & Compliance',
			'Device hardening',
			'Continuous monitoring',
		],
		color: 'from-purple-500 to-pink-500',
		image:
			'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80', // laptop / workstation
	},
	{
		icon: Server,
		title: 'IT Infrastructure',
		description:
			'As network architectures become more complex, users need network monitoring tools that provide performance data and business intelligence.',
		features: [
			'Network monitoring',
			'Performance analytics',
			'Capacity planning',
			'Managed LAN/WAN',
		],
		color: 'from-blue-500 to-cyan-500',
		image:
			'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80', // server rack / datacenter
	},
	{
		icon: Database,
		title: 'Backup & Storage',
		description:
			'At Net Desire Technologies we understand that capacity growth is a big challenge for IT managers considering implementing an efficient backup & disaster recovery solution.',
		features: [
			'Backup orchestration',
			'Disaster recovery',
			'Snapshot & replication',
			'Archival strategies',
		],
		color: 'from-green-500 to-emerald-500',
		image:
			'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80', // storage / cloud imagery
	},
	{
		icon: HardDrive,
		title: 'Data Center & Cloud',
		description:
			"A data center centralizes an organization’s shared IT operations and equipment for storing, processing, and disseminating data and applications.",
		features: [
			'Hybrid & multi-cloud',
			'Colocation',
			'Migration & optimization',
			'Compliance & governance',
		],
		color: 'from-orange-500 to-amber-500',
		image:
			'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80', // cloud/datacenter skyline
	},
];

export default function CyberServices() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null); // particle canvas ref
	const [isVisible, setIsVisible] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	useEffect(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					obs.disconnect();
				}
			},
			{ threshold: 0.12 }
		);
		if (sectionRef.current) obs.observe(sectionRef.current);
		return () => obs.disconnect();
	}, []);

	// Particle animation (copied from Hero)
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

		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
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

	return (
		<section
			id="cyberservices"
			ref={sectionRef}
			className="relative py-24 lg:py-32 overflow-hidden"
		>
			{/* add canvas */}
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
			{/* Decorations to match Services layout */}
			<div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/4 pointer-events-none" />
			<div className="absolute bottom-20 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div
					className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
					}`}
				>
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
						<span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
						<span className="text-sm text-purple-400">
							Cyber & IT Services
						</span>
					</div>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
						<span className="text-purple-400">Secure & Reliable</span> IT Operations
					</h2>
					<p className="text-lg text-gray-400">
						We protect your digital assets and keep your infrastructure resilient,
						available and compliant.
					</p>
				</div>

				{/* Services grid (layout matching Services.tsx) */}
				<div className="grid md:grid-cols-2 gap-6 lg:gap-8">
					{cyberServices.map((service, index) => (
						<div
							key={service.title}
							className={`group relative rounded-2xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
							style={{ transitionDelay: `${0.15 + index * 0.12}s`, minHeight: 320 }}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							{/* Background image + colored overlay */}
							<div className="absolute inset-0">
								<img
									src={service.image}
									alt={`${service.title} background`}
									loading="lazy"
									className="absolute inset-0 w-full h-full object-cover"
									style={{ filter: 'contrast(.95) saturate(.9)', opacity: 0.6 }}
									onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
								/>

								<div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} style={{ opacity: 0.08 }} />
								<div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,24,39,0.55), rgba(17,24,39,0.85))' }} />

								{/* bluish-purple glow overlay on hover */}
								<div
									className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500`}
									style={{
										background: 'radial-gradient(600px 300px at 20% 30%, rgba(124,58,237,0.16), rgba(79,70,229,0.08) 25%, transparent 60%), radial-gradient(400px 200px at 80% 70%, rgba(59,130,246,0.08), transparent 40%)',
										opacity: hoveredIndex === index ? 1 : 0,
										mixBlendMode: 'screen',
										transform: hoveredIndex === index ? 'scale(1.02)' : undefined,
										transitionDelay: hoveredIndex === index ? '0ms' : undefined,
									}}
								/>
							</div>

							{/* Content */}
							<div className="relative p-8 lg:p-10 flex flex-col h-full">
								<div className="flex items-center gap-6">
									<div
										className={`w-16 h-16 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${service.color} transition-transform duration-500 group-hover:scale-110`}
									>
										<service.icon className="w-8 h-8" />
									</div>

									<div>
										<h3
											className={`text-2xl font-semibold text-white ${
												hoveredIndex === index ? 'text-purple-400' : ''
											}`}
										>
											{service.title}
										</h3>
										<p className="text-sm text-gray-400 mt-1 max-w-xl">
											{service.description}
										</p>
									</div>
								</div>

								<div className="mt-6 flex flex-wrap gap-2">
									{service.features.map((f) => (
										<span
											key={f}
											className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
										>
											{f}
										</span>
									))}
								</div>

								<div className="mt-auto flex items-center justify-between">
									<a
										href="#contact"
										className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
									>
										<span className="text-sm font-medium">Talk to an expert</span>
										<ArrowRight className="w-4 h-4" />
									</a>

									<div
										className={`w-3 h-3 rounded-full ${
											hoveredIndex === index ? 'bg-purple-400' : 'bg-white/5'
										}`}
									/>
								</div>
							</div>

							<div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none ${hoveredIndex === index ? 'border-purple-500/50' : 'border-transparent'}`} style={{ boxShadow: hoveredIndex === index ? '0 30px 80px rgba(124,58,237,0.12)' : undefined }} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}