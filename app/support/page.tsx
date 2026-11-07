'use client'

/**
 * Save as app/contact/page.tsx
 * (imports ../ui, i.e. app/ui.tsx)
 */

import { RiArrowRightUpLine, RiMailLine, RiPhoneLine, RiWhatsappFill } from 'react-icons/ri';
import { B, Eyebrow, H2, LIME, Lime, Reveal, Section, cardClass } from '../components/UI';

const NUMBER_LOCAL = '09041204694';
const NUMBER_INTL = '2349041204694'; // 0904… → +234 904…
const EMAIL = 'betamind123@gmail.com';

const waLink = (text: string) => `https://wa.me/${NUMBER_INTL}?text=${encodeURIComponent(text)}`;

/**
 * QR code for https://wa.me/2349041204694 (error correction M).
 * Each string is one row; "1" = dark module.
 */
const QR_ROWS = [
  '11111110001111110001001111111', '10000010011011111010001000001', '10111010110001010011001011101',
  '10111010111000110110101011101', '10111010110100011001001011101', '10000010101010000000101000001',
  '11111110101010101010101111111', '00000000100110101010000000000', '10111110011010001110101111100',
  '01001000101011110001011110001', '00100110010001111100000110000', '10010101101111010010100101010',
  '01111111100010110110110001100', '01010000010100011101011110001', '01011110001100000010001001100',
  '11110100110000101000001100010', '00110010110010001110110001100', '10011100010111110001001010101',
  '10010011110101111000110110100', '10011000011001010010011010010', '10110111100000110011111110111',
  '00000000101000011011100011111', '11111110000110000011101011100', '10000010111000101010100010001',
  '10111010110010001010111110111', '10111010101001110110010001100', '10111010111100011101001111110',
  '10000010001101110111110101010', '11111110111100010000001111100',
];

const QRCode = () => {
  const n = QR_ROWS.length;
  const q = 4; // quiet zone
  const d = QR_ROWS.map((row, y) => {
    let out = '';
    let x = 0;
    while (x < n) {
      if (row[x] === '1') {
        let w = 1;
        while (x + w < n && row[x + w] === '1') w++;
        out += `M${x + q} ${y + q}h${w}v1h-${w}z`;
        x += w;
      } else x++;
    }
    return out;
  }).join('');

  return (
    <svg
      viewBox={`0 0 ${n + q * 2} ${n + q * 2}`}
      role="img"
      aria-label="QR code: scan to chat with Betamind customer care on WhatsApp"
      shapeRendering="crispEdges"
      className="h-full w-full"
    >
      <rect width="100%" height="100%" fill="#fff" />
      <path d={d} fill="#111" />
    </svg>
  );
};

const topics = [
  { t: "I'm attending an event", d: 'Tickets, registration, reminders and event questions.', msg: "Hello Betamind, I need help with an event I'm attending." },
  { t: "I'm hosting an event", d: 'Creating events, ticketing and attendee communication.', msg: "Hello Betamind, I'd like help with hosting an event." },
  { t: 'Mentorship & products', d: 'Booking mentors, becoming a mentor and digital products.', msg: "Hello Betamind, I have a question about mentorship or digital products." },
];

const ContactPage = () => {
  return (
    <main className="bg-black text-white">
      {/* ============ HERO (dark) ============ */}
      <Section hero shade>
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-5xl font-light leading-[0.98] tracking-tighter sm:text-6xl lg:text-[68px]">
              Talk to a <Lime>real person.</Lime>
            </h1>
            <p className="mt-8 max-w-md text-[17px] leading-relaxed text-white/80">
              Our <B>customer care team</B> is on WhatsApp. Tap the icon to start a chat, or scan the QR code with your phone.
            </p>

            <a
              href={waLink('Hello Betamind, I need some help.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-5 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-6 transition-colors hover:bg-white/10"
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-4xl text-white shadow-[0_0_30px_rgba(37,211,102,0.35)] transition-transform group-hover:scale-105">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
                <RiWhatsappFill className="relative" />
              </span>
              <span>
                <span className="block text-sm font-semibold">Chat on WhatsApp</span>
                <span className="block text-sm text-white/60">{NUMBER_LOCAL}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[300px] rounded-[28px] border-t-2 border-[#C8F34D] bg-white p-5 text-[#111] shadow-2xl">
              <div className="aspect-square w-full overflow-hidden rounded-2xl">
                <QRCode />
              </div>
              <p className="mt-4 text-center text-sm font-semibold">Scan to chat on WhatsApp</p>
              <p className="mt-1 text-center text-xs text-black/60">Point your phone camera at the code</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============ TOPICS (light) ============ */}
      <Section tone="light">
        <Reveal>
          <Eyebrow>How can we help?</Eyebrow>
          <div className="max-w-3xl">
            <H2>Pick a topic and we&apos;ll <Lime>start the chat.</Lime></H2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {topics.map((t, i) => (
            <Reveal key={t.t} delay={i * 120}>
              <a
                href={waLink(t.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass(true)} group flex h-full flex-col justify-between p-7 transition-shadow hover:shadow-xl`}
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white">
                    <RiWhatsappFill />
                  </span>
                  <h3 className="mt-8 text-2xl font-normal leading-tight tracking-tight">{t.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-black/70">{t.d}</p>
                </div>
                <span className="mt-8 flex items-center gap-2 text-sm font-semibold">
                  Chat with us
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-[#C8F34D]">
                    <RiArrowRightUpLine />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ DETAILS (dark) ============ */}
      <Section>
        <Reveal>
          <Eyebrow>Other ways to reach us</Eyebrow>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: <RiPhoneLine />, label: 'Phone', value: NUMBER_LOCAL, href: `tel:${NUMBER_LOCAL}` },
            { icon: <RiMailLine />, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: <RiWhatsappFill />, label: 'WhatsApp', value: NUMBER_LOCAL, href: waLink('Hello Betamind, I need some help.') },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <a
                href={c.href}
                {...(c.label === 'WhatsApp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.07]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl" style={{ background: 'rgba(200,243,77,0.12)', color: LIME }}>
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-white/50">{c.label}</span>
                  <span className="block truncate text-[15px] font-semibold">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Floating WhatsApp button */}
      <a
        href={waLink('Hello Betamind, I need some help.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with customer care on WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-3xl text-white shadow-xl transition-transform hover:scale-110"
      >
        <RiWhatsappFill />
      </a>
    </main>
  );
};

export default ContactPage;