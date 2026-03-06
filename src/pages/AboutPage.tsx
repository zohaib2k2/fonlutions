import React from 'react';
import Process from '@/sections/Process';


export default function AboutPage() {
  return (
    <main id="about" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
            About <span className="text-gradient">Fonlutions</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-5ssxl">
            We design and build digital products that solve real business problems.
            Our approach balances user empathy, technical craftsmanship and measurable outcomes.
            
            Our systematic process ensures we deeply understand your users, validate ideas quickly and deliver high‑quality solutions that drive growth and impact.
            We employ SCRUM methodologies to maintain agility and transparency, ensuring your project stays on track and adapts to evolving needs.


          </p>
        </header>

        {/* Strategy */}
        <section id="strategy" className="mb-4">
            <Process />
        </section>

        {/* Team */}
        <section id="team">
          <h2 className="text-2xl font-semibold text-white mb-6">Meet the Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card - Zohaib */}
            <div className="team-card group p-8 rounded-2xl bg-dark-800 border border-white/5 will-change-transform">
              <div className="flex items-center gap-6">
                <div className="team-avatar w-32 h-32 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center ring-1 ring-white/5">
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Zohaib - Founder & Product Lead"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                <div>
                  <div className="text-2xl font-semibold text-white group-hover:text-purple-500 transition-colors duration-300">Zohaib</div>
                  <div className="text-sm text-gray-400">Founder & Product Lead</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-300">
                Leads product strategy and design. Combines user research with practical execution to deliver high‑impact experiences.
              </p>
            </div>

            {/* Card - Muneeb */}
            <div className="team-card group p-8 rounded-2xl bg-dark-800 border border-white/5 will-change-transform">
              <div className="flex items-center gap-6">
                <div className="team-avatar w-32 h-32 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center ring-1 ring-white/5">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Muneeb - Engineering Lead"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                <div>
                  <div className="text-2xl font-semibold text-white group-hover:text-purple-500 transition-colors duration-300">Muneeb</div>
                  <div className="text-sm text-gray-400">Engineering Lead</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-300">
                Oversees architecture and development. Focused on scalable systems, quality engineering and reliable delivery.
              </p>
            </div>

            {/* Card - Faizan */}
            <div className="team-card group p-8 rounded-2xl bg-dark-800 border border-white/5 will-change-transform">
              <div className="flex items-center gap-6">
                <div className="team-avatar w-32 h-32 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center ring-1 ring-white/5">
                  <img
                    src="https://randomuser.me/api/portraits/men/76.jpg"
                    alt="Faizan - Design & Growth"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

                <div>
                  <div className="text-2xl font-semibold text-white group-hover:text-purple-500 transition-colors duration-300">Faizan</div>
                  <div className="text-sm text-gray-400">Design & Growth</div>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-300">
                Crafts interfaces and growth experiments. Bridges design with data to improve user engagement and retention.
              </p>
            </div>
          </div>

          <style>{`
            .team-card {
              transition: transform 280ms cubic-bezier(.2,.9,.2,1), box-shadow 280ms ease, border-color 280ms ease;
              transform-origin: 50% 50%;
              will-change: transform;
            }
            .team-card:hover {
              transform: perspective(1000px) rotateX(-4deg) rotateY(6deg) scale(1.04);
              box-shadow: 0 20px 50px rgba(2,6,23,0.6), 0 0 0 6px rgba(124,58,237,0.06);
              border-color: rgba(124,58,237,0.25);
            }
            .team-card:active { transform: scale(0.995); }

            .team-avatar {
              transition: transform 280ms cubic-bezier(.2,.9,.2,1);
            }
            .team-card:hover .team-avatar {
              transform: translateZ(20px) scale(1.02);
              box-shadow: 0 8px 30px rgba(2,6,23,0.45);
            }

            /* subtle reduce on small screens */
            @media (max-width: 640px) {
              .team-card { transform: none !important; box-shadow: none !important; }
              .team-avatar { transform: none !important; }
            }
          `}</style>
        </section>
      </div>
    </main>
  );
}