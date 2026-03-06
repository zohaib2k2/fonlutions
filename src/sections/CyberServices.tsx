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

	return (
		<section
			id="cyberservices"
			ref={sectionRef}
			className="relative py-24 lg:py-32 overflow-hidden"
		>
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