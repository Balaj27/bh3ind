import { ArrowUpRight, Zap } from 'lucide-react';

const connections = [
  { city: 'Mesquite', x: 82, y: 82, wire: 'M252 178H206V82H82' },
  { city: 'Garland', x: 300, y: 48, wire: 'M284 156V48H300' },
  { city: 'Sunnyvale', x: 518, y: 82, wire: 'M348 178H394V82H518' },
  { city: 'Seagoville', x: 518, y: 202, wire: 'M356 202H518' },
  { city: 'Dallas', x: 82, y: 202, wire: 'M244 202H82' },
  { city: 'Balch Springs', x: 82, y: 322, wire: 'M252 226H206V322H82' },
  { city: 'Forney', x: 300, y: 356, wire: 'M316 244V356H300' },
  { city: 'Terrell', x: 518, y: 322, wire: 'M348 226H394V322H518' },
];

export default function ServiceNetwork({ selectedCity, onSelect }: { selectedCity: string; onSelect: (city: string) => void }) {
  return <div className="service-network">
    <div className="network-heading"><span><i className="status-dot" /> THE BH3 CONNECTION</span><span className="network-voltage"><Zap size={12} /> NORTH TEXAS</span></div>
    <div className="network-canvas">
      <svg viewBox="0 0 600 410" className="network-diagram" aria-label="Interactive electrical service network. Select a city to illuminate its wire.">
        <defs>
          <pattern id="circuit-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#7d9383" fillOpacity=".18" /></pattern>
          <radialGradient id="circuit-halo"><stop stopColor="#f3412b" stopOpacity=".13" /><stop offset="1" stopColor="#f3412b" stopOpacity="0" /></radialGradient>
          <filter id="wire-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <rect width="600" height="410" fill="url(#circuit-grid)" />
        <circle cx="300" cy="202" r="170" fill="url(#circuit-halo)" />
        <g className="circuit-detail" fill="none" stroke="#ffffff" strokeOpacity=".04">
          <path d="M0 130H140V30H240M600 130H460V30H360M0 274H140V380H240M600 274H460V380H360" />
          <rect x="224" y="136" width="152" height="130" rx="23" />
          <circle cx="300" cy="202" r="104" strokeDasharray="2 8" />
        </g>
        {connections.map((connection, index) => {
          const active = selectedCity === connection.city;
          return <g className={`network-connection${active ? ' is-active' : ''}`} key={connection.city}>
            <path className="wire-track" d={connection.wire} fill="none" />
            {active && <path className="wire-halo" d={connection.wire} fill="none" filter="url(#wire-glow)" />}
            <path className="wire-current" d={connection.wire} pathLength="100" fill="none" style={{ animationDelay: `${index * -.4}s` }} />
            <g className="network-terminal" role="button" tabIndex={0} aria-label={`Select ${connection.city}, Texas`} aria-pressed={active}
              onClick={() => onSelect(connection.city)}
              onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(connection.city); } }}>
              <rect x={connection.x - 65} y={connection.y - 26} width="130" height="61" rx="8" fill="transparent" />
              <circle className="terminal-ring" cx={connection.x} cy={connection.y} r="13" />
              <circle className="terminal-dot" cx={connection.x} cy={connection.y} r="4" />
              <text x={connection.x} y={connection.y + 30} textAnchor="middle">{connection.city}</text>
            </g>
          </g>;
        })}
        <g className="network-hub">
          <rect x="245" y="157" width="110" height="86" rx="12" fill="#f7f7f2" />
          <path d="M258 152v-7m21 7v-7m21 7v-7m21 7v-7m21 7v-7M258 248v7m21-7v7m21-7v7m21-7v7m21-7v7M240 170h-7m7 21h-7m7 21h-7m7 21h-7M360 170h7m-7 21h7m-7 21h7m-7 21h7" stroke="#84917b" strokeWidth="3" />
          <image href="/logo.png" x="260" y="187" width="80" height="26" />
        </g>
      </svg>
      <div className="network-instruction"><span className="network-spark" /> Select a city. See the connection.</div>
    </div>
    <div className="network-summary">
      <div className="network-summary-icon"><Zap size={23} /></div>
      <div className="network-summary-copy" aria-live="polite"><small>POWERING YOUR NEIGHBORHOOD</small><strong>{selectedCity}, Texas</strong><span>Residential · Commercial · Emergency</span></div>
      <a href="#contact" className="network-contact" aria-label={`Request electrical service in ${selectedCity}`}><ArrowUpRight size={24} /></a>
    </div>
    <div className="network-footer"><span>LOCAL PEOPLE. CONNECTED COMMUNITIES.</span><span><i className="status-dot" /> AVAILABLE 24/7</span></div>
  </div>;
}
