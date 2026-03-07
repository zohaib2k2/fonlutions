import  { useState } from 'react';

type Props = {
  onNavigate?: (href: string) => void;
};

const DATA = {
  cyber: {
    title: 'Cyber Security',
    items: [
      'Endpoint Security',
      'Network Security',
      'Vulnerability assessment',
      'Cloud security',
    ],
    logos: [
      // replace these placeholder URLs with real logo URLs (Wikimedia / official press kits / CDN)
      '/images/logos/eset.png',
      '/images/logos/kaspersky.png',
      '/images/logos/trend.png',
      '/images/logos/sophos.png',
      '/images/logos/crowd.png',
    ],
  },
  infra: {
    title: 'IT Infrastructure',
    items: [
      'Structured cabling & switching',
      'Wireless technology',
      'Servers & workstations',
      'Storage solutions',
      'Backup & disaster recovery',
    ],
    logos: [
      '/images/logos/cisco.png',
      '/images/logos/tp-link.png',
      '/images/logos/hikvision.png',
      '/images/logos/aruba.jpeg',
      '/images/logos/zkteco.webp',
    ],
  },
  cloud: {
    title: 'Cloud Solutions',
    items: [
      'Office 365 & email signature',
      'Cloud infrastructure & migration',
      'Backup & storage',
      'Managed cloud services',
      'SaaS integrations',
    ],
    logos: [
      '/images/logos/microsoft.png',
      '/images/logos/exclaimer.png',
      '/images/logos/codetwo.png',
      '/images/logos/aws.png',
    ],
  },
};

export default function TechnologyFlyout({ onNavigate }: Props) {
  const [tab, setTab] = useState<'cyber' | 'infra' | 'cloud'>('cyber');
  const group = DATA[tab];

  return (
    <div className="w-[720px] max-w-full bg-purple-800  p-4 rounded-lg border border-purple-800 text-white">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTab('cyber')}
          className={`flex-1 text-sm text-left px-3 py-2 rounded ${tab === 'cyber' ? 'bg-purple-600/25 ring-1 ring-purple-500/30' : 'hover:bg-white/5'}`}
        >
          Cyber Security
        </button>
        <button
          onClick={() => setTab('infra')}
          className={`flex-1 text-sm text-left px-3 py-2 rounded ${tab === 'infra' ? 'bg-purple-600/25 ring-1 ring-purple-500/30' : 'hover:bg-white/5'}`}
        >
          IT Infrastructure
        </button>
        <button
          onClick={() => setTab('cloud')}
          className={`flex-1 text-sm text-left px-3 py-2 rounded ${tab === 'cloud' ? 'bg-purple-600/25 ring-1 ring-purple-500/30' : 'hover:bg-white/5'}`}
        >
          Cloud Solutions
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* left: list */}
        <div className="col-span-5">
          <div className="text-xs text-gray-300 mb-2 font-medium">{group.title}</div>
          <div className="space-y-2">
            {group.items.map((it) => (
              <button
                key={it}
                onClick={() => {
                  if (onNavigate) onNavigate('#services');
                }}
                className="w-full text-left px-3 py-2 rounded bg-dark-700/40 hover:bg-white/5 transition-colors text-sm"
              >
                {it}
              </button>
            ))}
          </div>
        </div>

        {/* right: logos / showcase */}
        <div className="col-span-7">
          <div className="h-64 rounded-lg border border-white/6 bg-dark-800 p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full">
              {group.logos.map((src, i) => (
                <div key={src + i} className="flex items-center justify-start gap-4">
                  <img
                    src={src}
                    alt={`logo-${i}`}
                    className="h-8 object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => (onNavigate ? onNavigate('#services') : undefined)}
              className="flex-1 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm"
            >
              Explore Services
            </button>
            <button
              onClick={() => (onNavigate ? onNavigate('#contact') : undefined)}
              className="py-2 px-3 rounded border border-white/10 text-white text-sm"
            >
              Talk to us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}