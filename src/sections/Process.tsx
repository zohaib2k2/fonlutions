import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Code, Rocket } from 'lucide-react';

const steps = [
	{
		number: '01',
		icon: Search,
		title: 'Discovery',
		description:
			'We start by understanding your business goals, target audience, and project requirements through in-depth consultations.',
		color: 'purple',
	},
	{
		number: '02',
		icon: MapPin,
		title: 'Strategy',
		description:
			'Our team creates a comprehensive roadmap with clear milestones, tech stack recommendations, and project timelines.',
		color: 'blue',
	},
	{
		number: '03',
		icon: Code,
		title: 'Development',
		description:
			'We build your solution using agile methodologies, ensuring regular updates and iterative improvements throughout.',
		color: 'pink',
	},
	{
		number: '04',
		icon: Rocket,
		title: 'Deployment',
		description:
			'After thorough testing, we deploy your solution to production and provide ongoing support and maintenance.',
		color: 'green',
	},
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
	purple: {
		bg: 'bg-purple-500/20',
		text: 'text-purple-400',
		border: 'border-purple-500/30',
	},
	blue: {
		bg: 'bg-blue-500/20',
		text: 'text-blue-400',
		border: 'border-blue-500/30',
	},
	pink: {
		bg: 'bg-pink-500/20',
		text: 'text-pink-400',
		border: 'border-pink-500/30',
	},
	green: {
		bg: 'bg-green-500/20',
		text: 'text-green-400',
		border: 'border-green-500/30',
	},
};

export default function Process() {
	const sectionRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	// Particle canvas animation (same as Hero)
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
			{ threshold: 0.2 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// Auto-advance active step
	useEffect(() => {
		if (!isVisible) return;

		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % steps.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [isVisible]);

	return (
		<section
			id="process"
			ref={sectionRef}
			className="relative py-24 lg:py-32 overflow-hidden"
		>
			{/* particle canvas (behind content) */}
			<canvas
				ref={canvasRef}
				className="absolute inset-0 -z-10 w-full h-full"
			/>

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
						<span className="text-sm text-purple-400">Our Process</span>
					</div>
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						How We <span className="text-gradient">Work</span>
					</h2>
					<p className="text-lg text-gray-400">
						Our proven four-step process ensures every project is delivered on
						time, within budget, and exceeds expectations.
					</p>
				</div>

				{/* Process Steps */}
				<div className="relative">
					{/* Connection line - desktop */}
					<div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20" />

					{/* Progress line */}
					<div
						className="hidden lg:block absolute top-24 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
						style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
					/>

					<div className="grid lg:grid-cols-4 gap-8">
						{steps.map((step, index) => {
							const colors = colorMap[step.color];
							const isActive = index <= activeStep;

							return (
								<div
									key={step.number}
									className={`relative transition-all duration-700 ${
										isVisible
											? 'opacity-100 translate-y-0'
											: 'opacity-0 translate-y-12'
									}`}
									style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
									onMouseEnter={() => setActiveStep(index)}
								>
									{/* Step number - desktop */}
									<div className="hidden lg:flex justify-center mb-8">
										<div
											className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
												isActive
													? `${colors.bg} ${colors.text} border-2 ${colors.border}`
													: 'bg-dark-800 text-gray-500 border-2 border-white/10'
											}`}
										>
											{step.number}
											{isActive && (
												<div
													className={`absolute inset-0 rounded-full ${colors.bg} animate-ping opacity-30`}
												/>
											)}
										</div>
									</div>

									{/* Content card */}
									<div
										className={`relative p-6 rounded-2xl border transition-all duration-500 ${
											isActive
												? `bg-dark-800/80 ${colors.border} shadow-glow`
												: 'bg-dark-800/40 border-white/5'
										}`}
									>
										{/* Mobile step number */}
										<div className="lg:hidden flex items-center gap-3 mb-4">
											<div
												className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
													isActive
														? `${colors.bg} ${colors.text}`
														: 'bg-dark-700 text-gray-500'
												}`}
											>
												{step.number}
											</div>
											<div
												className={`w-12 h-0.5 ${
													isActive ? 'bg-purple-500/50' : 'bg-white/10'
												}`}
											/>
										</div>

										{/* Icon */}
										<div
											className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 transition-transform duration-500 ${
												isActive ? 'scale-110' : ''
											}`}
										>
											<step.icon className={`w-6 h-6 ${colors.text}`} />
										</div>

										{/* Title */}
										<h3 className="text-xl font-bold text-white mb-3">
											{step.title}
										</h3>

										{/* Description */}
										<p className="text-gray-400 text-sm leading-relaxed">
											{step.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Bottom CTA */}
				<div
					className={`text-center mt-16 transition-all duration-1000 delay-700 ${
						isVisible
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-8'
					}`}
				>
					<p className="text-gray-400 mb-4">Ready to start your project?</p>
					<a
						href="#contact"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all magnetic-btn"
					>
						Get in Touch
					</a>
				</div>
			</div>
		</section>
	);
}
