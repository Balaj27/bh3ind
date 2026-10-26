'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Phone, X } from 'lucide-react';
import type { useContactInquiry } from './contact-form';

export default function ContactChat({ inquiry }: { inquiry: ReturnType<typeof useContactInquiry> }) {
  const [open, setOpen] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const { draft, setDraft, service, setService, submit, status } = inquiry;
  function close() { setOpen(false); launcher.current?.focus(); }

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); launcher.current?.focus(); } };
    const onOutside = (event: PointerEvent) => { if (event.target instanceof Node && !widget.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); };
  }, [open]);

  return <div className="contact-chat" ref={widget}>
    {open && <section className="chat-panel" id="contact-chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <header className="chat-header"><div><strong id="chat-title">BH3 Industries</strong><span>Electrical service enquiries</span></div><button ref={closeButton} type="button" aria-label="Close chat panel" onClick={close}><X size={20} /></button></header>
      <div className="chat-body">
        <div className="chat-greeting"><MessageCircle size={20} /><p>Hi! What can we help you with?</p></div>
        <p className="chat-intro">Tell us about your project. Send an enquiry by email, or call for urgent help.</p>
        <form onSubmit={submit} className="chat-form">
          <div className="chat-services" role="group" aria-label="Service type">{['Residential', 'Commercial', 'Emergency'].map(option => <button key={option} type="button" aria-pressed={service === option} className={service === option ? 'selected' : ''} onClick={() => setService(option)}>{option}</button>)}</div>
          <label>Your name<input name="name" autoComplete="name" placeholder="Full name" value={draft.name} onChange={event => setDraft(previous => ({ ...previous, name: event.target.value }))} required /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="(972) 000-0000" value={draft.phone} onChange={event => setDraft(previous => ({ ...previous, phone: event.target.value }))} required /></label>
          <label>Your message<textarea name="message" placeholder="How can we help?" maxLength={600} value={draft.message} onChange={event => setDraft(previous => ({ ...previous, message: event.target.value }))} required /></label>
          <button className="chat-send" type="submit">Send enquiry <ArrowUpRight size={19} /></button>
          <span className="chat-email-note">Opens your email app to send.</span>
          {status && <p className="chat-status" role="status">{status}</p>}
        </form>
        <a className="chat-call" href="tel:+19727611973"><Phone size={16} /><span>Need help now? <strong>972-761-1973</strong></span><ArrowUpRight size={17} /></a>
      </div>
    </section>}
    <button ref={launcher} className="chat-launcher" type="button" aria-label={open ? 'Close contact chat' : 'Open contact chat'} aria-expanded={open} aria-controls={open ? 'contact-chat-panel' : undefined} onClick={() => open ? close() : setOpen(true)}>{open ? <X size={23} /> : <MessageCircle size={23} />}<span>{open ? 'Close' : 'Let’s talk'}</span></button>
  </div>;
}
