'use client';

import { useState } from 'react';
import ServiceNetwork from './service-network';
import { ArrowUpRight, Phone, MapPin, ShieldCheck, Menu, X, ChevronDown, Check, Zap, House, Building2, Mail, Send, Star, Quote, Clock3 } from 'lucide-react';

const cities = ['Mesquite', 'Garland', 'Sunnyvale', 'Seagoville', 'Dallas', 'Balch Springs', 'Forney', 'Terrell'];
const reviews = [
  { name: 'Sarah M.', city: 'Mesquite, TX', service: 'Residential service', initials: 'SM', text: 'The team explained everything clearly, showed up on time, and left our home spotless. The whole process was easy from start to finish.' },
  { name: 'David R.', city: 'Garland, TX', service: 'Commercial service', initials: 'DR', text: 'Professional, thorough, and easy to communicate with. They helped us get our electrical issue sorted out with minimal disruption to our business.' },
  { name: 'Michelle T.', city: 'Forney, TX', service: 'Electrical repair', initials: 'MT', text: 'Honest advice, clear pricing, and great attention to detail. We appreciated how they walked us through the work and answered all our questions.' },
];

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
  { title: 'Residential', icon: House, image: 'residential.jpg', text: 'Count on us for safe electrical repairs, upgrades, lighting, panel work, and new installations that keep your home powered and protected.', tags: 'Repairs · Lighting · Panel upgrades' },
  { title: 'Commercial', icon: Building2, image: 'commercial.jpg', text: 'We help offices, retail spaces, restaurants, warehouses, and other businesses with professional electrical service and repairs.', tags: 'Offices · Retail · Construction' },
  { title: 'Emergency', icon: Zap, image: 'electrician.jpg', text: 'Electrical problems can happen at the worst times. Our team is available 24/7 to help with urgent issues and keep your property safe.', tags: '24/7 support · Urgent repairs' },
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
  const [selectedCity, setSelectedCity] = useState('Mesquite');
  const [service, setService] = useState('Residential');
  const [formStatus, setFormStatus] = useState('');
  const [messageLength, setMessageLength] = useState(0);

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nAddress: ${data.get('address')}\nService: ${service}\n\n${data.get('message')}`;
    window.location.href = `mailto:info@bh3ind.com?subject=${encodeURIComponent(`Electrical service inquiry — ${service}`)}&body=${encodeURIComponent(body)}`;
    setFormStatus('Your email draft is ready in your email app. Send it to complete your request, or call 972-761-1973.');
  }

  return <>
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
        <img className="hero-photo" src="/images/hero.jpg" alt="Contemporary home with architectural detailing and a landscaped pool" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="container hero-content"><div className="eyebrow light"><span /> YOUR LOCAL ELECTRICAL EXPERTS</div>
          <h1>TOP-RATED<br /><span>ELECTRICIANS</span><br />IN NORTH TEXAS<span className="heading-dot">.</span></h1>
          <p>Reliable electrical work backed by experience,<br className="desktop-break" /> honesty and dependable service.</p>
          <div className="hero-buttons"><a className="button button-red" href="#contact">Contact Us <ArrowUpRight size={20} /></a><a className="hero-phone" href="tel:+19727611973"><span className="phone-ring"><Phone size={20} /></span><span><small>LET’S GET TO WORK</small>972-761-1973</span></a></div>
        </div>
        <div className="hero-note"><span className="note-icon"><Zap size={21} fill="currentColor" /></span><div>Good work. Clear communication.<br /><strong>Power you can count on.</strong></div></div>
        <CompanyLogos />
      </section>

      <section className="services section" id="services"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span /> WHAT WE DO</div><h2>OUR TOP<br /><em>ELECTRICAL SERVICES</em></h2></div><p>From your home to your business,<br />we keep your world powered.</p></div>
        <div className="services-grid">{services.map((s, i) => <article className="service-card" id={s.title.toLowerCase()} key={s.title}>
          <a className="service-image" href={s.title === 'Emergency' ? 'tel:+19727611973' : '#contact'} onClick={() => setService(s.title)} aria-label={`Request ${s.title.toLowerCase()} electrical service`}><img src={`/images/${s.image}`} alt={s.title === 'Residential' ? 'Warmly lit residential living room' : s.title === 'Commercial' ? 'Bright modern commercial office' : 'Electrical professional inspecting a control panel'} loading="lazy" /><span className="service-number">0{i + 1}</span>{s.title === 'Emergency' && <span className="availability"><i className="status-dot" /> AVAILABLE 24/7</span>}</a>
          <div className="service-body"><div className="service-title"><s.icon size={24} strokeWidth={1.5} /><h3>{s.title}</h3><a href={s.title === 'Emergency' ? 'tel:+19727611973' : '#contact'} onClick={() => setService(s.title)} aria-label={`Get ${s.title} service`}><ArrowUpRight size={23} /></a></div><p>{s.text}</p><div className="service-tags">{s.tags}</div></div>
        </article>)}</div>
      </div></section>

      <section className="about section" id="about"><div className="container about-grid">
        <div className="about-visual"><img className="about-main" src="/images/electrician.jpg" alt="Electrician working carefully on an electrical control cabinet" loading="lazy" /><img className="about-detail" src="/images/detail.jpg" alt="Tools and craftsmanship for electrical installations" loading="lazy" /><div className="quality-seal"><ShieldCheck size={29} /><strong>QUALITY<br />IN EVERY WIRE</strong><span>BH3 INDUSTRIES</span></div><span className="photo-caption">LOCAL PEOPLE. DEPENDABLE WORK.</span></div>
        <div className="about-copy"><div className="eyebrow"><span /> BUILT ON TRUST. WIRED FOR QUALITY.</div><h2>YOUR RELIABLE<br /><em>ELECTRICAL COMPANY.</em><br />COMMITTED TO<br />QUALITY WORK.</h2>
          <p>At BH3 Industries, we provide licensed electrical services for homeowners, businesses, multifamily properties, and construction projects throughout North Texas. Whether you need help with a small repair, a larger electrical upgrade, or a project that needs to meet code the first time, our team is ready to help.</p>
          <p>We handle a wide range of electrical services, including electrical repairs, troubleshooting, panel upgrades, breaker replacements, lighting installation, EV charger installation, surge protection, smoke detectors, commercial electrical work, multifamily service, and construction wiring. No matter the size of the job, we focus on safe work, clear communication, and dependable results.</p>
          <p>Our goal is simple: make electrical service easier and less stressful for our customers. We show up ready to work, explain what needs to be done, and provide clear pricing before the job begins. From emergency service calls to planned upgrades and construction projects, BH3 Industries is here to keep your property powered, protected, and working the way it should.</p>
          <a className="text-link" href="#contact">Let’s talk about your project <ArrowUpRight size={19} /></a>
        </div>
      </div></section>

      <section className="contact section" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow light"><span /> THE RIGHT TEAM. THE RIGHT CONNECTION.</div><h2>WHY CHOOSE<br /><em>BH3 INDUSTRIES</em><br />AS YOUR LICENSED<br />ELECTRICIAN?</h2>
        <p>BH3 Industries brings hands-on electrical experience, licensed workmanship, and a strong focus on safety to every job. We understand how important your electrical system is to your home, business, or property, so we take every project seriously. Whether we are replacing a panel, troubleshooting an issue, wiring a remodel, or helping with a commercial project, our work is built around doing the job right.</p>
        <p>When you choose BH3 Industries, you get a team that values honest service, clean work, and clear communication. We take the time to understand the issue, walk you through your options, and recommend practical solutions that make sense for your property. Our team works hard to keep the process simple from start to finish, with no confusion, no pressure, and no shortcuts.</p>
        <div className="contact-call"><span className="phone-ring"><Phone size={23} /></span><div><small>GIVE US A CALL. WE’RE HERE TO HELP.</small><a href="tel:+19727611973">972-761-1973 <ArrowUpRight size={24} /></a></div></div>
      </div><form className="contact-form" onSubmit={submitInquiry}><div className="form-heading"><span className="eyebrow">LET’S GET STARTED</span><h3>How can we help?</h3><p>Tell us a little about your project.</p></div><div className="service-selector" aria-label="Select service type">{services.map(s => <button key={s.title} type="button" onClick={() => setService(s.title)} aria-pressed={service === s.title} className={service === s.title ? 'selected' : ''}>{s.title}</button>)}</div><div className="form-grid"><label>Name<input name="name" placeholder="Your full name" autoComplete="name" required /></label><label>Phone<input name="phone" placeholder="(972) 000-0000" type="tel" autoComplete="tel" required /></label><label>Email<input name="email" placeholder="you@example.com" type="email" autoComplete="email" required /></label><label>Address<input name="address" placeholder="Your property address" autoComplete="street-address" required /></label></div><label>How can we help?<textarea name="message" placeholder="Tell us what you have in mind..." maxLength={600} onChange={e => setMessageLength(e.target.value.length)} required /></label><div className="form-counter">{messageLength} of 600 max characters</div><button className="button button-red submit" type="submit">Submit <Send size={17} /></button><small className="form-footnote"><ShieldCheck size={13} /> Opens your email app to complete your request.</small>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form></div></section>

      <section className="neighbors section"><div className="container neighbors-inner">
        <div className="eyebrow"><span /> YOUR NEIGHBORHOOD ELECTRICIANS</div>
        <h2>WHAT YOUR NEIGHBORS<br />ARE <em>SAYING ABOUT US</em></h2>
        <p>Honest service. Clean work. Clear communication.</p>
        <div className="review-grid">{reviews.map(review => <article className="review-card" key={review.name}>
          <div className="review-card-top"><div className="review-stars" aria-label="Sample five-star rating">{Array.from({length:5},(_,i)=><Star key={i} size={15} fill="currentColor" strokeWidth={0} />)}</div><Quote size={27} strokeWidth={1.4} /></div>
          <blockquote>{review.text}</blockquote>
          <div className="review-person"><span className="review-avatar">{review.initials}</span><div><strong>{review.name}</strong><span>{review.city}</span></div><span className="review-service">{review.service}</span></div>
        </article>)}</div>
        <div className="review-bottom"><span className="placeholder-note">Sample reviews for design preview.</span><a className="text-link" href="https://www.google.com/maps/search/BH3+Industries+Mesquite+TX" target="_blank" rel="noreferrer">Find us on Google <ArrowUpRight size={18} /></a></div>
      </div></section>

      <section className="areas section" id="areas"><div className="container areas-grid"><div className="areas-copy"><div className="eyebrow"><span /> LOCAL SERVICE. NORTH TEXAS PRIDE.</div><h2>YOUR COMMUNITY.<br />OUR COMMITMENT.<br /><em>AREAS WE SERVE.</em></h2><p>Dependable electrical service, right where you need it. Proudly serving homes and businesses across North Texas.</p><div className="city-grid">{cities.map(city => <button className={selectedCity === city ? 'city active' : 'city'} key={city} onClick={() => setSelectedCity(city)} aria-pressed={selectedCity === city}><MapPin size={16} />{city}, TX{selectedCity === city ? <Check size={15} /> : <ArrowUpRight size={15} />}</button>)}</div></div>
        <ServiceNetwork selectedCity={selectedCity} onSelect={setSelectedCity} />
      </div></section>

      <section className="cta"><div className="container cta-inner"><div className="cta-icon"><Zap size={36} /></div><div><span>LET’S GET YOUR NEXT PROJECT STARTED</span><h2>GOOD WORK STARTS WITH A CALL.</h2></div><CallButton light>Call 972-761-1973</CallButton></div></section>
    </main>

    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><img src="/logo.png" alt="BH3 Industries" width="141" height="45" /><span>INDUSTRIES</span></a><p>Reliable electrical work.<br />People you can count on.</p><span className="footer-license"><ShieldCheck size={15} /> License No. TECL 31767</span></div><div><h4>Contact Information</h4><a href="tel:+19727611973"><Phone size={15} />972-761-1973</a><a href="mailto:info@bh3ind.com"><Mail size={15} />info@bh3ind.com</a><a href="https://www.google.com/maps/search/4111+US-80+Suite+206+Mesquite+TX+75150" target="_blank" rel="noreferrer"><MapPin size={16} /><span>4111 US-80 Suite 206<br />Mesquite, TX 75150</span></a></div><div><h4>Useful Links</h4><a href="#residential">Residential</a><a href="#commercial">Commercial</a><a href="#emergency">Emergency Service</a><a href="#about">About Us</a><a href="#areas">Areas We Serve</a></div><div className="footer-hours"><h4>Hours</h4><div className="hours-status"><span className="hours-icon"><Clock3 size={22} strokeWidth={1.5} /></span><div><span className="hours-label">ALWAYS OPEN</span><strong>24<span>/</span>7</strong></div></div><p className="hours-note">Every day. Around the clock.</p><span className="hours-support"><i className="status-dot" /> Emergency support available</span></div><div className="footer-connect"><h4>Follow us</h4><a href="https://www.google.com/maps/search/BH3+Industries+Mesquite+TX" target="_blank" rel="noreferrer">Find us on Google <ArrowUpRight size={15} /></a><span className="footer-available"><i className="status-dot" /> Available when it matters.</span></div></div><div className="footer-bottom"><span>BH3 Industries © 2026 | All Rights Reserved</span><span className="legal-links"><a href="mailto:info@bh3ind.com?subject=Privacy%20Policy%20request">Privacy Policy</a><span> | </span><a href="mailto:info@bh3ind.com?subject=Terms%20of%20Use%20request">Terms of Use</a></span><span>Powered by Vosa Digital</span><a href="#home">Back to top ↑</a></div></div></footer>
  </>;
}

