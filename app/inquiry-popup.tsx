'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const seenKey = 'bh3-contact-popup-seen-v1';
let seenInMemory = false;
function alreadySeen() {
  if (seenInMemory) return true;
  try { if (localStorage.getItem(seenKey)) return true; } catch { /* Storage can be disabled. */ }
  try { return Boolean(sessionStorage.getItem(seenKey)); } catch { return false; }
}
function remember() {
  seenInMemory = true;
  try { localStorage.setItem(seenKey, '1'); } catch { /* Use the session fallback. */ }
  try { sessionStorage.setItem(seenKey, '1'); } catch { /* The memory fallback still prevents repeats. */ }
}

export default function InquiryPopup({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element || alreadySeen()) return;
    const started = Date.now();
    let complete = false;
    let unlock = () => {};
    const close = () => { unlock(); };
    const suppress = () => { if (!complete) { complete = true; remember(); clearInterval(retry); clearTimeout(timer); } };
    const onFormUse = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('#contact .contact-form')) suppress();
    };
    const attempt = () => {
      if (complete || document.hidden || Date.now() - started < 15000) return;
      if (alreadySeen()) { complete = true; clearInterval(retry); clearTimeout(timer); return; }
      const form = document.querySelector('#contact .contact-form');
      const bounds = form?.getBoundingClientRect();
      // Visitors who have already reached the contact form do not need an interruption.
      if ((bounds && bounds.top < window.innerHeight && bounds.bottom > 0) || form?.contains(document.activeElement)) { suppress(); return; }
      if (document.activeElement?.matches('input, textarea, select') || document.querySelector('.nav-links.open')) return;
      element.showModal();
      complete = true;
      remember();
      clearInterval(retry); clearTimeout(timer);
      const root = document.documentElement;
      const previousOverflow = root.style.overflow;
      const previousGutter = root.style.scrollbarGutter;
      root.style.scrollbarGutter = 'stable';
      root.style.overflow = 'hidden';
      unlock = () => { root.style.overflow = previousOverflow; root.style.scrollbarGutter = previousGutter; };
    };
    const timer = window.setTimeout(attempt, 15000);
    const retry = window.setInterval(attempt, 3000);
    element.addEventListener('close', close);
    document.addEventListener('focusin', onFormUse);
    document.addEventListener('submit', onFormUse);
    document.addEventListener('visibilitychange', attempt);
    return () => {
      clearTimeout(timer); clearInterval(retry);
      element.removeEventListener('close', close);
      document.removeEventListener('focusin', onFormUse);
      document.removeEventListener('submit', onFormUse);
      document.removeEventListener('visibilitychange', attempt);
      if (element.open) element.close();
      unlock();
    };
  }, []);

  return <dialog className="inquiry-popup" ref={dialog} aria-labelledby="popup-contact-title" onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
  }}>
    <div className="inquiry-popup-header"><img src="/logo.png" alt="BH3 Industries" width="99" height="35" /><button type="button" autoFocus aria-label="Close contact form" onClick={() => dialog.current?.close()}><X size={21} /></button></div>
    {children}
  </dialog>;
}
