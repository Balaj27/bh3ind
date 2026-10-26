'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Pause, Play, Zap } from 'lucide-react';

const cities = ['Mesquite', 'Garland', 'Sunnyvale', 'Seagoville', 'Dallas', 'Balch Springs', 'Forney', 'Terrell'];
const desktopStops = [[110, 180], [350, 180], [590, 180], [830, 180], [830, 410], [590, 410], [350, 410], [110, 410]];
const mobileStops = [[140, 150], [460, 150], [460, 350], [140, 350], [140, 550], [460, 550], [460, 750], [140, 750]];
const desktopRoad = 'M110 180 H830 C975 180 975 410 830 410 H110';
const mobileRoad = 'M140 150 H460 C540 150 540 350 460 350 H140 C60 350 60 550 140 550 H460 C540 550 540 750 460 750 H140';

function House({ x, y, tall = false }: { x: number; y: number; tall?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="-30" y={tall ? -90 : -58} width="60" height={tall ? 90 : 58} rx="3" fill="#dce0d2" />
    {!tall && <path d="M-39-58 0-91 39-58Z" fill="#9cae9a" />}
    <rect x="-17" y="-43" width="12" height="17" rx="1" fill="#fff3c8" /><rect x="7" y="-43" width="12" height="17" rx="1" fill="#fff3c8" />
    {tall && <><path d="M-16-72h12v14h-12zM8-72h12v14H8z" fill="#fff3c8" /><path d="M-16-20h12v20h-12zM8-20h12v20H8z" fill="#bac6b4" /></>}
    {!tall && <rect x="-7" y="-20" width="14" height="20" fill="#839580" />}
  </g>;
}

export default function ServiceAreaJourney() {
  const section = useRef<HTMLElement>(null);
  const road = useRef<SVGPathElement>(null);
  const van = useRef<SVGGElement>(null);
  const body = useRef<SVGGElement>(null);
  const logo = useRef<SVGGElement>(null);
  const distance = useRef<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [destination, setDestination] = useState(0);
  const [touring, setTouring] = useState(true);
  const [paused, setPaused] = useState(false);
  const [moving, setMoving] = useState(false);
  const [arrived, setArrived] = useState(true);
  const stops = mobile ? mobileStops : desktopStops;

  useEffect(() => {
    const size = window.matchMedia('(max-width: 800px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateSize = () => { distance.current = null; setMobile(size.matches); };
    const updateMotion = () => setReduced(motion.matches);
    updateSize(); updateMotion();
    size.addEventListener('change', updateSize);
    motion.addEventListener('change', updateMotion);
    let inView = false;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; updateVisibility(); }, { threshold: .15 });
    if (section.current) observer.observe(section.current);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); size.removeEventListener('change', updateSize); motion.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  useEffect(() => {
    const path = road.current;
    if (!path) return;
    const length = path.getTotalLength();
    const [x, y] = stops[destination];
    // Match each destination to its actual position on the curved road.
    let target = 0, nearest = Infinity;
    for (let i = 0; i <= 1600; i++) {
      const d = length * i / 1600;
      const point = path.getPointAtLength(d);
      const delta = (point.x - x) ** 2 + (point.y - y) ** 2;
      if (delta < nearest) { nearest = delta; target = d; }
    }
    const paint = (d: number, direction: number) => {
      const point = path.getPointAtLength(d);
      const ahead = path.getPointAtLength(Math.max(0, Math.min(length, d + direction * 5)));
      const facing = ahead.x === point.x ? direction : ahead.x > point.x ? 1 : -1;
      van.current?.setAttribute('transform', `translate(${point.x} ${point.y - 2})`);
      body.current?.setAttribute('transform', `scale(${facing} 1)`);
      logo.current?.setAttribute('transform', `translate(${facing === 1 ? -58 : -6} -53)`);
    };
    if (distance.current === null) distance.current = target;
    const start = distance.current;
    const direction = target >= start ? 1 : -1;
    paint(start, direction);
    let frame = 0, timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      distance.current = target; paint(target, direction); setMoving(false); setArrived(true);
      if (touring && !paused && !reduced && visible) timer = setTimeout(() => setDestination(value => (value + 1) % cities.length), 2400);
    };
    if (reduced || Math.abs(target - start) < 1) finish();
    else if (visible && !paused) {
      setMoving(true); setArrived(false);
      const duration = Math.max(1700, Math.min(6500, Math.abs(target - start) * 10));
      let started: number | null = null;
      const tick = (now: number) => {
        if (started === null) started = now;
        const progress = Math.min(1, (now - started) / duration);
        const eased = progress * progress * (3 - 2 * progress);
        distance.current = start + (target - start) * eased;
        paint(distance.current, direction);
        if (progress < 1) frame = requestAnimationFrame(tick); else finish();
      };
      frame = requestAnimationFrame(tick);
    } else setMoving(false);
    return () => { cancelAnimationFrame(frame); if (timer) clearTimeout(timer); };
  }, [destination, mobile, paused, reduced, touring, visible, stops]);

  function chooseCity(index: number) { setTouring(false); setPaused(false); setDestination(index); }
  function toggleTour() {
    if (touring && !paused) setPaused(true);
    else { setTouring(true); setPaused(false); }
  }

  return <section id="areas" className="section service-journey" ref={section}>
    <div className="container">
      <header className="journey-heading"><div><div className="eyebrow"><span /> LOCAL SERVICE. NORTH TEXAS PRIDE.</div><h2>YOUR COMMUNITY.<br /><em>OUR NEXT STOP.</em></h2></div><div><p>Dependable electrical service, right where you need it. Proudly serving homes and businesses across North Texas.</p><span className="journey-invitation"><Zap size={17} /> Pick a city. We’ll take the scenic route.</span></div></header>
      <div className={`journey-card ${moving ? 'is-driving' : ''}`}>
        <div className="journey-toolbar"><span><i /> EIGHT COMMUNITIES. ONE LOCAL TEAM.</span><button onClick={toggleTour} disabled={reduced} aria-label={touring && !paused ? 'Pause van tour' : 'Play van tour'}>{touring && !paused && !reduced ? <Pause size={15} /> : <Play size={15} />} {reduced ? 'Reduced motion' : touring && !paused ? 'Pause tour' : 'Play tour'}</button></div>
        <div className="journey-scene">
          <svg className="journey-illustration" viewBox={mobile ? '0 0 600 900' : '0 0 1000 575'} role="group" aria-label="Choose a city on the illustrated BH3 service route">
            <defs><pattern id="journey-grain" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#a9b49c" opacity=".18" /></pattern><filter id="van-shadow" x="-40%" y="-50%" width="180%" height="220%"><feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#192e22" floodOpacity=".2" /></filter><linearGradient id="van-paint" x2="0" y2="1"><stop stopColor="#fff" /><stop offset="1" stopColor="#e3e8e0" /></linearGradient></defs>
            <rect width="100%" height="100%" fill="url(#journey-grain)" />
            <g aria-hidden="true" className="journey-neighborhood">
              {mobile ? <>{[120, 320, 520, 720].map((y, index) => <g key={y} transform={`translate(300 ${y}) scale(.8)`}><House x={0} y={0} tall={index % 2 === 1} /></g>)}</> : <><House x={260} y={145} /><House x={700} y={145} tall /><House x={460} y={400} /><House x={525} y={400} tall /><House x={590} y={400} /></>}
              {(mobile ? [[55,95],[300,425],[300,825]] : [[100,90],[870,90],[135,345],[760,345]]).map(([x,y], i) => <g key={i} transform={`translate(${x} ${y})`}><path d="M0 0v40" stroke="#91a18a" strokeWidth="5" /><ellipse cy="-8" rx="20" ry="30" fill="#afc3a4" /><ellipse cx="-5" cy="-15" rx="13" ry="22" fill="#bed1b3" /></g>)}
            </g>
            <path d={mobile ? mobileRoad : desktopRoad} fill="none" stroke="#d8dece" strokeWidth="83" strokeLinecap="round" />
            <path d={mobile ? mobileRoad : desktopRoad} fill="none" stroke="#34443d" strokeWidth="65" strokeLinecap="round" />
            <path ref={road} d={mobile ? mobileRoad : desktopRoad} fill="none" stroke="#e6e6ce" strokeWidth="2" strokeDasharray="12 15" opacity=".65" />
            {stops.map(([x,y], index) => <g key={cities[index]} className={`journey-stop ${destination === index ? 'is-active' : ''}`} transform={`translate(${x} ${y})`} role="button" tabIndex={0} aria-label={`Visit ${cities[index]}, Texas`} aria-pressed={destination === index} onClick={() => chooseCity(index)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseCity(index); } }}><rect className="stop-hit-area" x={mobile ? (x < 300 ? -20 : -155) : -105} y="33" width={mobile ? 175 : 210} height="88" rx="14" /><path d="M0 35v17" stroke="#a4b298" strokeWidth="2" /><circle className="stop-halo" cy="53" r="15" /><circle cy="53" r="5" className="stop-dot" /><text textAnchor={mobile ? (x < 300 ? "start" : "end") : "middle"} x={mobile ? (x < 300 ? -5 : 5) : 0} y="91">{cities[index]}</text><text className="stop-state" textAnchor={mobile ? (x < 300 ? "start" : "end") : "middle"} x={mobile ? (x < 300 ? -5 : 5) : 0} y="110">TEXAS</text></g>)}
            <g ref={van} transform={`translate(${stops[0][0]} ${stops[0][1] - 2})`} aria-hidden="true">
              <ellipse cx="0" cy="8" rx="83" ry="10" fill="#172920" opacity=".2" />
              <g className="van-suspension">
                <g ref={body} filter="url(#van-shadow)">
                  <path d="M-76-13v-51q0-9 10-9h91q9 0 14 9l21 26 17 6q7 2 7 10v16H-76Z" fill="url(#van-paint)" stroke="#d4dbd2" strokeWidth="1.5" />
                  <path d="M31-62h4l18 25H31Z" fill="#486862" /><path d="M-76-26H75v10H-76Z" fill="#ff482e" />
                  <path d="M-68-77H17M-57-82H7" stroke="#6d7c70" strokeWidth="4" strokeLinecap="round" /><path d="M-58-82v9M4-82v9" stroke="#6d7c70" strokeWidth="3" />
                  <path d="M22-64v48M27-31h7" stroke="#9ea99e" strokeWidth="2" /><rect x="74" y="-28" width="8" height="8" rx="2" fill="#ffe6a0" /><path d="M-79-16h7M77-12h9" stroke="#7e8e80" strokeWidth="5" strokeLinecap="round" />
                  {[-47,54].map(x => <g key={x} transform={`translate(${x} 0)`}><circle r="15" fill="#23352f" /><g className="van-wheel"><circle r="8" fill="#d1d9cd" /><path d="M-7 0H7M0-7V7" stroke="#6d8070" strokeWidth="2" /></g><circle r="3" fill="#ecf0e6" /></g>)}
                </g>
                <g ref={logo} transform="translate(-58 -53)"><image href="/logo.png" width="64" height="23" /><text x="32" y="30" textAnchor="middle" fontSize="5.5" fill="#526457" letterSpacing="2">INDUSTRIES</text></g>
              </g>
            </g>
          </svg>
          <span className="journey-scene-note">A little drive through the places we call home.</span>
        </div>
        <div className="journey-arrival"><div className="journey-arrival-icon"><MapPin size={25} /></div><div><span>{moving || !arrived ? 'ON THE WAY TO' : 'YOUR LOCAL ELECTRICIANS IN'}</span><h3>{cities[destination]}, <em>Texas.</em></h3><p>Residential · Commercial · Emergency</p></div><a href="#contact">Let’s get you connected <ArrowUpRight size={20} /></a></div>
        <div className="journey-caption"><span><i /> Serving all eight communities · Available 24/7</span><span>Illustrated service-area tour</span></div>
      </div>
    </div>
  </section>;
}
