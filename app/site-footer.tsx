import { ArrowUpRight, ArrowUp, Phone, Mail, MapPin, ShieldCheck, Clock3, Zap } from 'lucide-react';
import { ElectricalCurrent } from './site-motion';

const communities = ['Mesquite', 'Garland', 'Sunnyvale', 'Seagoville', 'Dallas', 'Balch Springs', 'Forney', 'Terrell'];

export default function SiteFooter() {
  return <footer className="footer footer-rewired">
    <ElectricalCurrent variant="footer" />
    <span className="footer-watermark" aria-hidden="true">BH3</span>
    <div className="container footer-shell">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand" href="#home" aria-label="BH3 Industries home"><img src="/logo.png" alt="BH3 Industries" width="141" height="50" /><span>INDUSTRIES</span></a>
          <p>Licensed electrical service.<br />North Texas.</p>
          <span className="footer-license"><ShieldCheck size={16} /> License No. TECL 31767</span>
          <a className="footer-book" href="#contact">Request service <ArrowUpRight size={17} /></a>
        </div>
        <div className="footer-contact"><h4>Get in touch<span>01</span></h4><a href="tel:+19727611973"><Phone size={16} />972-761-1973</a><a href="mailto:info@bh3ind.com"><Mail size={16} />info@bh3ind.com</a><a href="https://www.google.com/maps/search/4111+US-80+Suite+206+Mesquite+TX+75150" target="_blank" rel="noreferrer"><MapPin size={17} /><span>4111 US-80 Suite 206<br />Mesquite, TX 75150</span></a></div>
        <div className="footer-links"><h4>Explore<span>02</span></h4><a href="#residential">Residential <ArrowUpRight size={13} /></a><a href="#commercial">Commercial <ArrowUpRight size={13} /></a><a href="#emergency">Emergency service <ArrowUpRight size={13} /></a><a href="#about">About us <ArrowUpRight size={13} /></a><a href="#areas">Areas we serve <ArrowUpRight size={13} /></a></div>
        <div className="footer-hours"><div className="hours-card-label"><Zap size={15} /><span>POWER DOESN’T WAIT.</span></div><div className="hours-status"><div><span className="hours-label">AND NEITHER DO WE.</span><strong>24<span>/</span>7</strong></div><span className="hours-icon"><Clock3 size={27} strokeWidth={1.25} /></span></div><p className="hours-note">Every day. Around the clock.</p><a className="footer-emergency" href="tel:+19727611973"><i className="status-dot" /> Emergency support <ArrowUpRight size={14} /></a></div>
      </div>

      <div className="footer-communities"><span><MapPin size={15} /> NORTH TEXAS, CONNECTED.</span><div>{communities.map(city => <a key={city} href="#areas">{city}</a>)}</div></div>
      <div className="footer-bottom"><span>BH3 Industries © 2026 · All Rights Reserved</span><span className="legal-links"><a href="mailto:info@bh3ind.com?subject=Privacy%20Policy%20request">Privacy Policy</a><span> / </span><a href="mailto:info@bh3ind.com?subject=Terms%20of%20Use%20request">Terms of Use</a></span><a className="footer-back-top" href="#home">Back to top <ArrowUp size={15} /></a></div>
    </div>
  </footer>;
}
