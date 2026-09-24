import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Send } from 'lucide-react';
import type { InstallationRequestPayload } from '../../types/game';
import { WhatsAppButton } from './WhatsAppButton';

const formspreeEndpoint = 'https://formspree.io/f/xrpbbydg';

type FormErrors = Partial<Record<keyof InstallationRequestPayload, string>>;

const emptyForm = (gameTitle: string): InstallationRequestPayload => ({
  fullName: '',
  email: '',
  whatsapp: '',
  gameTitle,
  pcSpecifications: '',
  additionalMessage: '',
});

export function InstallationForm({ gameTitle = '', onChange }: { gameTitle?: string; onChange?: (payload: InstallationRequestPayload) => void }) {
  const [form, setForm] = useState<InstallationRequestPayload>(() => emptyForm(gameTitle));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = (key: keyof InstallationRequestPayload, value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== 'idle') setStatus('idle');
    onChange?.(next);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.gameTitle.trim()) next.gameTitle = 'Please select or enter a game.';
    if (!form.fullName.trim()) next.fullName = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.whatsapp.trim()) next.whatsapp = 'Please enter your WhatsApp number.';
    if (!form.pcSpecifications.trim()) next.pcSpecifications = 'Please provide your PC specifications.';
    return next;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          gameTitle: form.gameTitle.trim(),
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          whatsapp: form.whatsapp.trim(),
          pcSpecifications: form.pcSpecifications.trim(),
          message: form.additionalMessage.trim(),
          _subject: `Playwise Installation Request — ${form.gameTitle.trim()}`,
          _replyto: form.email.trim(),
        }),
      });
      if (!response.ok) throw new Error('Formspree request failed');
      const resetForm = emptyForm(gameTitle);
      setForm(resetForm);
      setErrors({});
      setStatus('success');
      onChange?.(resetForm);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <div className="installation-form-state" role="status" aria-live="polite">
      <CheckCircle2 size={28} />
      <p className="eyebrow">REQUEST SENT</p>
      <h3>Your game request has been sent successfully.</h3>
      <p>We’ve received your request and will review the details before getting back to you with the next steps.</p>
      <Link className="pw-button pw-button-secondary" to="/explore">Browse games <ArrowRight size={16} /></Link>
    </div>;
  }

  return <form className="installation-form" onSubmit={submit} noValidate>
    <div className="form-grid">
      <label>Your name<input name="fullName" required autoComplete="name" value={form.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="Enter your full name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />{errors.fullName && <small id="fullName-error" className="form-field-error">{errors.fullName}</small>}</label>
      <label>Email address<input name="email" required type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <small id="email-error" className="form-field-error">{errors.email}</small>}</label>
      <label>WhatsApp number<input name="whatsapp" required type="tel" autoComplete="tel" value={form.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} placeholder="e.g. +233 XX XXX XXXX" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />{errors.whatsapp && <small id="whatsapp-error" className="form-field-error">{errors.whatsapp}</small>}</label>
      <label>Game title<input name="gameTitle" required value={form.gameTitle} onChange={(event) => update('gameTitle', event.target.value)} placeholder="Search or enter a game title" aria-invalid={Boolean(errors.gameTitle)} aria-describedby={errors.gameTitle ? 'gameTitle-error' : undefined} />{errors.gameTitle && <small id="gameTitle-error" className="form-field-error">{errors.gameTitle}</small>}</label>
    </div>
    <label>Your PC specifications<textarea name="pcSpecifications" required value={form.pcSpecifications} onChange={(event) => update('pcSpecifications', event.target.value)} placeholder="CPU, GPU, RAM and Windows version" aria-invalid={Boolean(errors.pcSpecifications)} aria-describedby={errors.pcSpecifications ? 'pcSpecifications-error' : undefined} />{errors.pcSpecifications ? <small id="pcSpecifications-error" className="form-field-error">{errors.pcSpecifications}</small> : <small>This helps us understand your setup and the game you’re requesting.</small>}</label>
    <label>Anything else?<textarea name="message" value={form.additionalMessage} onChange={(event) => update('additionalMessage', event.target.value)} placeholder="Add any details you’d like us to know..." /></label>
    <input className="form-honeypot" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <p className="request-form-note">YOUR DETAILS ARE ONLY USED TO HANDLE THIS REQUEST.</p>
    {status === 'error' && <p className="form-submit-error" role="alert">We couldn’t send your request right now. Please check your connection and try again.</p>}
    <div className="form-actions"><button className="pw-button pw-button-secondary" type="submit" disabled={status === 'sending'}><Send size={17} /> {status === 'sending' ? 'Sending request...' : status === 'error' ? 'Try again' : 'Send installation request'}</button><WhatsAppButton payload={form} label="Continue to WhatsApp" /></div>
  </form>;
}
