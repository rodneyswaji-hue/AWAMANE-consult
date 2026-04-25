import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  interest: string;
  message: string;
}

const initialData: FormData = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  interest: 'general',
  message: '',
};

export default function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!data.name.trim()) next.name = 'Please enter your name';
    if (!data.email.trim()) next.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Please enter a valid email';
    if (!data.message.trim()) next.message = 'Please tell us a little about your needs';
    else if (data.message.trim().length < 10) next.message = 'Please write at least a few words';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // TODO: wire up to Formspree, your own endpoint, or an email service.
      // For v1, we simulate a successful submit so the UX is testable.
      await new Promise((r) => setTimeout(r, 900));
      setStatus('success');
      setData(initialData);
    } catch {
      setStatus('error');
    }
  };

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  if (status === 'success') {
    return (
      <div className="p-10 rounded-[var(--radius-xl)] bg-[var(--color-forest-50)] border border-[var(--color-forest-300)] text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-forest-600)] text-[var(--color-cream)] flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-[var(--font-display)] text-[var(--color-ink)]">Thank you — we'll be in touch.</h3>
        <p className="mt-4 text-[var(--color-charcoal)]/80 leading-relaxed max-w-md mx-auto">
          Your message has been received. We typically respond within one working day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-medium text-[var(--color-forest-700)] hover:text-[var(--color-earth-500)] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass =
    'w-full px-4 py-3 rounded-lg bg-white border border-[var(--color-sand)] focus:border-[var(--color-forest-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest-200)] transition-all text-[var(--color-ink)] placeholder:text-[var(--color-charcoal)]/40';
  const errorClass = '!border-red-400 focus:!border-red-500 focus:!ring-red-100';
  const labelClass = 'block text-sm font-medium text-[var(--color-ink)] mb-2';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-[var(--color-earth-500)]">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            className={`${fieldClass} ${errors.name ? errorClass : ''}`}
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && <p id="name-err" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[var(--color-earth-500)]">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            className={`${fieldClass} ${errors.email ? errorClass : ''}`}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && <p id="email-err" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={fieldClass}
            placeholder="+254 700 000 000"
          />
        </div>

        <div>
          <label htmlFor="organization" className={labelClass}>Organization</label>
          <input
            id="organization"
            type="text"
            value={data.organization}
            onChange={(e) => update('organization', e.target.value)}
            className={fieldClass}
            placeholder="Farm, NGO, company (optional)"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={labelClass}>I'm interested in</label>
        <select
          id="interest"
          value={data.interest}
          onChange={(e) => update('interest', e.target.value)}
          className={fieldClass}
        >
          <option value="general">General enquiry</option>
          <option value="crops">Crops & soil management</option>
          <option value="livestock">Livestock production</option>
          <option value="water">Water & land management</option>
          <option value="training">Training or workshops</option>
          <option value="partnership">Partnership / programme collaboration</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your needs <span className="text-[var(--color-earth-500)]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          className={`${fieldClass} resize-y ${errors.message ? errorClass : ''}`}
          placeholder="Your farm, your goals, and what you'd like help with..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-err' : undefined}
        />
        {errors.message && <p id="message-err" className="mt-1.5 text-xs text-red-600">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          Something went wrong sending your message. Please try again, or email us directly.
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>
        <p className="mt-4 text-xs text-[var(--color-charcoal)]/60">
          We'll only use your details to respond to your enquiry. We never share contact information.
        </p>
      </div>
    </form>
  );
}
