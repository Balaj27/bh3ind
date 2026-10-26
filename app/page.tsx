'use client';

import { useState } from 'react';
import SiteFooter from './site-footer';
import ServiceAreaJourney from './service-area-journey';
import ContactForm, { useContactInquiry } from './contact-form';
import InquiryPopup from './inquiry-popup';
import { SiteMotion, ElectricalCurrent, HeroEnergy } from './site-motion';
import { ArrowUpRight, Phone, MapPin, ShieldCheck, Menu, X, ChevronDown, Zap, House, Building2, Mail, Star } from 'lucide-react';


const reviews = [
  { name: 'Sarah M.', city: 'Mesquite, TX', service: 'Residential service', initials: 'SM', text: 'The team explained everything clearly, showed up on time, and left our home spotless. The whole process was easy from start to finish.' },
  { name: 'David R.', city: 'Garland, TX', service: 'Commercial service', initials: 'DR', text: 'Professional, thorough, and easy to communicate with. They helped us get our electrical issue sorted out with minimal disruption to our business.' },
  { name: 'Michelle T.', city: 'Forney, TX', service: 'Electrical repair', initials: 'MT', text: 'Honest advice, clear pricing, and great attention to detail. We appreciated how they walked us through the work and answered all our questions.' },
];

function GoogleMark() {
  return <svg className="google-mark" viewBox="0 0 24 24" role="img" aria-label="Google">
    <path fill="#4285F4" d="M22.56 12.25c0-.73-.06-1.42-.19-2.09H12v3.96h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.75 3.28-7.95Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.8l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.87 0-5.3-1.94-6.17-4.54H2.15v2.85A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.83 13.96A6.6 6.6 0 0 1 5.48 12c0-.68.12-1.34.35-1.96V7.19H2.15A11 11 0 0 0 1 12c0 1.77.42 3.44 1.15 4.81l3.68-2.85Z" />
    <path fill="#EA4335" d="M12 5.5c1.62 0 3.06.56 4.21 1.64l3.16-3.16A10.56 10.56 0 0 0 12 1a11 11 0 0 0-9.85 6.19l3.68 2.85C6.7 7.44 9.13 5.5 12 5.5Z" />
  </svg>;
}

function CompanyLogos() {
  return <div className="company-strip"><div className="container company-strip-inner">
    <span className="company-strip-label">Trusted By:</span>
    <div className="company-logos" aria-label="Five fictional company logos for layout preview">
      <div className="company-logo northline"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 24V4l22 20V4M3 14l22 10" /></svg><span>NORTHLINE</span></div>
      <div className="company-logo vertex"><svg viewBox="0 0 30 28" aria-hidden="true"><path d="m2 4 13 21L28 4M9 4l6 10 6-10" /></svg><span>vertex<span className="logo-period">.</span></span></div>
      <div className="company-logo lumen"><svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="10" /><path d="M14 0v28M0 14h28" /></svg><span>LUMEN</span></div>
      <div className="company-logo forge"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M3 4h23L15 14h8L3 26Z" /></svg><span>FORGE</span></div>
      <div className="company-logo arclight"><svg viewBox="0 0 30 28" aria-hidden="true"><path d="M2 25 15 3l13 22M8 19h14M11 13h8" /></svg><span>arclight</span></div>
    </div>
  </div></div>;
}
const services = [
  { title: 'Residential', icon: House, image: 'residential.jpg', text: 'Repairs, lighting, panel upgrades, and installations for a safer home.' },
  { title: 'Commercial', icon: Building2, image: 'commercial.jpg', text: 'Electrical repairs, upgrades, and wiring for businesses and construction projects.' },
  { title: 'Emergency', icon: Zap, image: 'electrician.jpg', text: 'Urgent electrical problems? Call our team for help, available 24/7.' },
];

function CallButton({ light = false, children = '972-761-1973' }: { light?: boolean; children?: React.ReactNode }) {
  return <a className={`button ${light ? 'button-light' : 'button-red'}`} href="tel:+19727611973"><Phone size={17} />{children}<ArrowUpRight size={18} /></a>;
}

function FooterLogoColors() {
  return <svg width="0" height="0" aria-hidden="true" focusable="false" className="logo-color-filter">
    <defs><filter id="footer-logo-colors" colorInterpolationFilters="sRGB">
      <feFlood floodColor="white" result="white" />
      <feComposite in="white" in2="SourceAlpha" operator="in" result="base" />
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 -5 0 0 -1" result="accent-mask" />
      <feFlood floodColor="var(--red)" result="orange" />
      <feComposite in="orange" in2="accent-mask" operator="in" result="accent" />
      <feComposite in="accent" in2="SourceAlpha" operator="in" result="colored-accent" />
      <feMerge><feMergeNode in="base" /><feMergeNode in="colored-accent" /></feMerge>
    </filter></defs>
  </svg>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const inquiry = useContactInquiry();
  const { setService } = inquiry;

  return <>
    <SiteMotion />
    <FooterLogoColors />
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={13} /> Proudly serving North Texas</span><span><i className="status-dot" /> Available 24/7 for electrical emergencies <a href="tel:+19727611973">Let’s talk <ArrowUpRight size={13} /></a></span></div></div>
    <header className="header"><div className="container nav-inner">
      <a className="brand" href="#home" aria-label="BH3 Industries home"><img src="/logo.png" alt="BH3 Industries" width="141" height="45" /><span>INDUSTRIES</span></a>
      <nav aria-label="Main navigation" className={mobileOpen ? 'nav-links open' : 'nav-links'}>
        <a className="active" href="#home" onClick={() => setMobileOpen(false)}>Home</a>
        <div className="nav-dropdown"><a href="#services" onClick={() => setMobileOpen(false)}>Services <ChevronDown size={13} /></a><div className="dropdown-content">{services.map(s => <a key={s.title} href={`#${s.title.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{s.title}<ArrowUpRight size={14} /></a>)}</div></div>
        <a href="#areas" onClick={() => setMobileOpen(false)}>Service Area <ChevronDown size={13} /></a>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a><a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </nav>
      <div className="nav-actions"><CallButton /><button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X /> : <Menu />}</button></div>
    </div></header>

    <main>
      <section className="hero" id="home">
        <img className="hero-photo" src="/images/hero-field-engineer.webp" alt="Field engineer testing cabling and equipment inside a network cabinet" fetchPriority="high" />
        <div className="hero-shade" />
        <HeroEnergy />
        <div className="container hero-content"><div className="eyebrow light"><span /> YOUR LOCAL ELECTRICAL EXPERTS</div>
          <h1>TOP-RATED<br /><span>ELECTRICIANS</span><br />IN NORTH TEXAS<span className="heading-dot">.</span></h1>
          <p>Reliable electrical work backed by experience,<br className="desktop-break" /> honesty and dependable service.</p>
          <div className="hero-buttons"><a className="button button-red" href="#contact">Request Service <ArrowUpRight size={20} /></a><a className="hero-phone" href="tel:+19727611973"><span className="phone-ring"><Phone size={20} /></span><span><small>CALL US 24/7</small>972-761-1973</span></a></div>
        </div>
        <CompanyLogos />
      </section>

      <section className="services section" id="services"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span /> WHAT WE DO</div><h2>OUR TOP<br /><em>ELECTRICAL SERVICES</em></h2></div><a className="text-link" href="#contact">Discuss your project <ArrowUpRight size={19} /></a></div>
        <div className="services-grid">{services.map((s, i) => <article className="service-card" id={s.title.toLowerCase()} key={s.title}>
          <a className="service-image" href={s.title === 'Emergency' ? 'tel:+19727611973' : '#contact'} onClick={() => setService(s.title)} aria-label={`Request ${s.title.toLowerCase()} electrical service`}><img src={`/images/${s.image}`} alt={s.title === 'Residential' ? 'Warmly lit residential living room' : s.title === 'Commercial' ? 'Bright modern commercial office' : 'Electrical professional inspecting a control panel'} loading="lazy" /><span className="service-number">0{i + 1}</span>{s.title === 'Emergency' && <span className="availability"><i className="status-dot" /> AVAILABLE 24/7</span>}</a>
          <div className="service-body"><div className="service-title"><s.icon size={24} strokeWidth={1.5} /><h3>{s.title}</h3></div><p>{s.text}</p><a className="service-action" href={s.title === 'Emergency' ? 'tel:+19727611973' : '#contact'} onClick={() => setService(s.title)}>{s.title === 'Emergency' ? 'Call for urgent help' : `Book ${s.title.toLowerCase()} service`}<ArrowUpRight size={18} /></a></div>
        </article>)}</div>
      </div></section>

      <section className="about section" id="about"><div className="container about-grid">
        <div className="about-visual"><div className="about-photo-frame"><img className="about-main" src="/images/about-detail-user.webp" alt="Close-up of electrical wiring and control panel repairs" loading="lazy" /><img className="about-detail" src="/images/about-panel-user.webp" alt="Electrician working inside an electrical distribution panel" loading="lazy" /></div><span className="photo-caption">LOCAL PEOPLE. DEPENDABLE WORK.</span></div>
        <div className="about-copy"><div className="eyebrow"><span /> BH3 INDUSTRIES</div><h2>YOUR RELIABLE<br /><em>ELECTRICAL COMPANY.</em></h2>
          <p>Licensed electrical work for North Texas homes, businesses, and construction projects. From small repairs to major upgrades, we focus on safety and quality.</p>
          <p>Panels, lighting, EV chargers, surge protection, and wiring—handled with clear pricing and straightforward communication.</p>
          <div className="section-actions"><a className="button button-red" href="#contact">Request Service <ArrowUpRight size={18} /></a><a className="text-link" href="tel:+19727611973"><Phone size={17} /> Call our team</a></div>
        </div>
      </div></section>

      <section className="contact section" id="contact"><ElectricalCurrent variant="contact" /><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow light"><span /> LICENSED. LOCAL. AVAILABLE 24/7.</div><h2>LET’S GET<br /><em>YOUR PROJECT</em><br />STARTED.</h2>
        <p>Tell us what you need. We’ll explain your options and pricing before work begins.</p>
        <ul className="contact-benefits"><li><ShieldCheck size={20} /> Licensed electricians</li><li><Zap size={20} /> Clear, upfront pricing</li><li><Phone size={20} /> 24/7 emergency support</li></ul>
        <div className="contact-call"><span className="phone-ring"><Phone size={23} /></span><div><small>GIVE US A CALL. WE’RE HERE TO HELP.</small><a href="tel:+19727611973">972-761-1973 <ArrowUpRight size={24} /></a></div></div>
      </div><ContactForm inquiry={inquiry} /></div></section>

      <section className="neighbors section"><div className="container neighbors-inner">
        <div className="eyebrow"><span /> YOUR NEIGHBORHOOD ELECTRICIANS</div>
        <h2>WHAT YOUR NEIGHBORS<br />ARE <em>SAYING ABOUT US</em></h2>
        <p>Honest service. Clean work. Clear communication.</p>
        <div className="google-reviews-toolbar"><div className="google-reviews-title"><span className="google-wordmark" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span><span>Reviews</span></div><a href="https://www.google.com/maps/search/BH3+Industries+Mesquite+TX" target="_blank" rel="noreferrer">Find us on Google <ArrowUpRight size={17} /></a></div>
        <div className="review-grid google-review-grid">{reviews.map((review, index) => <article className="google-review-card" key={review.name}>
          <div className="google-review-header"><span className={`google-review-avatar avatar-${index}`}>{review.initials}</span><div className="google-review-author"><strong>{review.name}</strong><span>{['2 weeks ago', '1 month ago', '2 months ago'][index]}</span></div><GoogleMark /></div>
          <div className="google-review-rating"><div className="google-review-stars" aria-label="Sample five-star rating">{Array.from({length:5},(_,i)=><Star key={i} size={17} fill="currentColor" strokeWidth={0} />)}</div></div>
          <p className="google-review-text">{review.text}</p>
          <div className="google-review-footer"><MapPin size={13} /><span>{review.city}</span><span className="google-review-service">{review.service}</span></div>
        </article>)}</div>
        <div className="google-reviews-disclosure">Sample reviews for design preview. Live Google reviews are not connected.</div><div className="section-actions reviews-actions"><a className="button button-red" href="#contact">Book Your Service <ArrowUpRight size={18} /></a><a className="text-link" href="tel:+19727611973"><Phone size={17} /> Call 972-761-1973</a></div>
      </div></section>

      <ServiceAreaJourney />

      <section className="cta"><ElectricalCurrent variant="cta" /><div className="container cta-inner"><div className="cta-icon"><Zap size={36} /></div><div><span>LET’S GET YOUR NEXT PROJECT STARTED</span><h2>GOOD WORK STARTS WITH A CALL.</h2></div><CallButton light>Call 972-761-1973</CallButton></div></section>
    </main>

    <SiteFooter />
    <InquiryPopup><ContactForm inquiry={inquiry} titleId="popup-contact-title" /></InquiryPopup>
  </>;
}

