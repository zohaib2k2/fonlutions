
import mearske_logo from '/images/clients/maersk.png';
import glovo_logo from '/images/clients/glovo.png';
import luckycart_logo from '/images/clients/lucky_cart.png';
import unilever_logo from '/images/clients/unilever.png';
import huawve_logo from '/images/clients/huawve.png';
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
  return (
    <section id="clients" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-lg text-gray-400">
            Explore some of our recent work that showcases our expertise and
            commitment to excellence.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800 p-6">
          <div
            className="clients-marquee whitespace-nowrap flex items-center gap-8"
            role="list"
            aria-label="Client logos"
          >
            {/* duplicate list for seamless loop */}
            {Array.from({ length: 2 }).map((_, r) =>
              brands.map((b, i) => (
                <div
                  key={`${b.name}-${r}-${i}`}
                  role="listitem"
                  className="inline-flex items-center gap-4 px-4 py-3 rounded-xl bg-dark-700/60 hover:bg-dark-700/80 transition-colors duration-250"
                >
                {/* make de witte tulip logo bigger only */}
                  <div className="w-28 h-12 flex items-center justify-center">
                    <img
                      src={b.file}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      className={`max-h-10 object-contain ${b.name === 'de witte tulip' ? 'h-25 w-30' : ''}`}
                      onError={(e) => {
                        // hide broken image gracefully
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="min-w-[90px]">
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