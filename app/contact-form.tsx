'use client';

import { useId, useState } from 'react';
import { ArrowUpRight, Building2, House, ShieldCheck, Zap } from 'lucide-react';

const serviceOptions = [{ title: 'Residential', icon: House }, { title: 'Commercial', icon: Building2 }, { title: 'Emergency', icon: Zap }];
const emptyDraft = { name: '', phone: '', email: '', address: '', message: '' };

export function useContactInquiry() {
  const [service, setService] = useState('Residential');
  const [draft, setDraft] = useState(emptyDraft);
  const [status, setStatus] = useState('');
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = `Name: ${draft.name}\nPhone: ${draft.phone}\nEmail: ${draft.email}\nAddress: ${draft.address}\nService: ${service}\n\n${draft.message}`;
    window.location.href = `mailto:info@bh3ind.com?subject=${encodeURIComponent(`Electrical service inquiry — ${service}`)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email draft is ready. Send it in your email app to complete your request, or call 972-761-1973.');
  }
  return { service, setService, draft, setDraft, status, submit };
}

export default function ContactForm({ inquiry, titleId }: { inquiry: ReturnType<typeof useContactInquiry>; titleId?: string }) {
  const id = useId();
  const { service, setService, draft, setDraft, status, submit } = inquiry;
  const change = (field: keyof typeof emptyDraft, value: string) => setDraft(previous => ({ ...previous, [field]: value }));
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">LET’S GET STARTED</span><h3 id={titleId}>How can we help?</h3><p>Send a service request by email.</p></div>
    <span className="service-selector-label" id={`${id}-service`}>Service type</span>
    <div className="service-selector" role="group" aria-labelledby={`${id}-service`}>{serviceOptions.map(option => <button key={option.title} type="button" onClick={() => setService(option.title)} aria-pressed={service === option.title} className={service === option.title ? 'selected' : ''}><option.icon size={19} strokeWidth={1.5} aria-hidden="true" /><span>{option.title}</span></button>)}</div>
    <div className="form-grid">
      <label>Name<input name="name" placeholder="Your full name" autoComplete="name" value={draft.name} onChange={event => change('name', event.target.value)} required /></label>
      <label>Phone<input name="phone" placeholder="(972) 000-0000" type="tel" autoComplete="tel" value={draft.phone} onChange={event => change('phone', event.target.value)} required /></label>
      <label>Email<input name="email" placeholder="you@example.com" type="email" autoComplete="email" value={draft.email} onChange={event => change('email', event.target.value)} required /></label>
      <label>Address<input name="address" placeholder="Your property address" autoComplete="street-address" value={draft.address} onChange={event => change('address', event.target.value)} required /></label>
    </div>
    <label>How can we help?<textarea name="message" placeholder="Tell us what you have in mind..." maxLength={600} value={draft.message} onChange={event => change('message', event.target.value)} required /></label>
    <div className="form-counter">{draft.message.length}/600 characters</div>
    <button className="button button-red submit" type="submit">Request service <ArrowUpRight size={20} aria-hidden="true" /></button>
    <small className="form-footnote"><ShieldCheck size={13} /> Opens your email app to complete your request.</small>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}
