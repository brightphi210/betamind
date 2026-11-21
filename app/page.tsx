'use client'

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, FormEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCalendarLine,
  RiCheckLine,
  RiMapPinLine,
  RiSearchLine,
} from 'react-icons/ri';
import {
  B,
  Eyebrow,
  GhostBtn,
  Glow,
  H2,
  LIME,
  Lime,
  Modal,
  PrimaryBtn,
  Reveal,
  Section,
  SectionHead,
  WhiteBtn,
  cardClass,
} from './components/UI';
import { GET_STARTED_URL } from './lib/links';

/** Swap this for your own community photo, e.g. '/assets/community.png' */
const COMMUNITY_BG = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80';

/* ----------------------------------------------------------------
   Data (dummy where marked)
---------------------------------------------------------------- */

const opportunityCards = [
  { tag: 'Experiences', title: 'Discover events worth attending.', href: '#events', img: '/assets/sec2a.png', big: true },
  { tag: 'People', title: "Learn from those who've been there.", href: '#mentors', img: '/assets/sec2b.png', big: false },
  { tag: 'Knowledge', title: 'Find resources worth keeping.', href: '#digital-products', img: '/assets/sec2c.png', big: false },
];

// DUMMY events
const eventList = [
  {
    cat: 'Creative', title: 'The Creative Economy Summit', date: 'Nov 21, 2026 · 10:00 AM', loc: 'Lagos, Nigeria', by: 'Future Africa Collective', price: '₦12,000',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80',
    desc: 'A day of talks and conversations with people building culture, products and possibilities across the creative economy.',
    expect: ['Keynotes and panel conversations', 'Networking with creators and founders', 'Time for questions and follow-up conversations'],
  },
  {
    cat: 'Career', title: 'Building Your Personal Brand', date: 'Nov 28, 2026 · 6:00 PM', loc: 'Online', by: 'The Growth Studio', price: 'Free',
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=80',
    desc: 'A practical session on how to show up with clarity, tell your story well and be remembered for the right reasons.',
    expect: ['A step-by-step brand clarity framework', 'Live Q&A with the host', 'Take-home exercises'],
  },
  {
    cat: 'Business', title: 'Founders & Innovators Meetup', date: 'Dec 5, 2026 · 4:00 PM', loc: 'Abuja, Nigeria', by: 'StartNorth', price: '₦8,500',
    img: '/assets/sec2a.png',
    desc: 'An evening for founders and early builders to share what is working, what is not, and who can help.',
    expect: ['Lightning talks from founders', 'Structured networking', 'Open conversation with investors and mentors'],
  },
  {
    cat: 'Technology', title: 'Design Systems Masterclass', date: 'Dec 12, 2026 · 2:00 PM', loc: 'Online', by: 'Pixel Lagos', price: '₦5,000',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80',
    desc: 'Learn how to build and maintain a design system that keeps products consistent as teams grow.',
    expect: ['Foundations: tokens, components, documentation', 'A live walkthrough of a real system', 'Q&A and resources to keep'],
  },
  {
    cat: 'Personal Growth', title: 'Mindset & Momentum Workshop', date: 'Dec 19, 2026 · 11:00 AM', loc: 'Port Harcourt, Nigeria', by: 'Rise Collective', price: 'Free',
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=80',
    desc: 'A hands-on workshop on building habits and focus, so good intentions turn into steady progress.',
    expect: ['Guided reflection exercises', 'Habit-building tools you can start using today', 'A supportive group setting'],
  },
  {
    cat: 'Business', title: 'Small Business Growth Clinic', date: 'Jan 9, 2027 · 10:00 AM', loc: 'Online', by: 'Venture Hub', price: '₦3,000',
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=80',
    desc: 'A working session for owners who want clearer pricing, steadier sales and a simple plan for the next quarter.',
    expect: ['Pricing and offer review', 'Live case studies', 'A one-page growth plan to take away'],
  },
  {
    cat: 'Technology', title: 'Intro to Product Management', date: 'Jan 16, 2027 · 3:00 PM', loc: 'Lagos, Nigeria', by: 'ProductCamp NG', price: 'Free',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80',
    desc: 'A beginner-friendly session on what product managers do and how to start moving into the role.',
    expect: ['The product lifecycle explained', 'Real examples from local teams', 'Q&A with working PMs'],
  },
  {
    cat: 'Creative', title: 'Storytelling for Filmmakers', date: 'Jan 23, 2027 · 1:00 PM', loc: 'Port Harcourt, Nigeria', by: 'Frame Collective', price: '₦6,000',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80',
    desc: 'Learn how to shape an idea into a short film people remember, from first draft to final cut.',
    expect: ['Story structure basics', 'Scene-building exercises', 'Feedback from working producers'],
  },
];
type EventItem = (typeof eventList)[number];

const eventCategories = ['All Events', 'Business', 'Technology', 'Creative', 'Career', 'Personal Growth'];

// DUMMY mentors
const mentors = [
  {
    n: '01', field: 'Creative Direction', name: 'Amara Nwosu', role: 'Brand Strategist',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
    bio: 'Helps founders and creatives build brands with substance, from positioning and voice to the visual systems that carry them.',
    tags: ['Brand strategy', 'Positioning', 'Creative direction'],
  },
  {
    n: '02', field: 'Design & Technology', name: 'Tobi Adebayo', role: 'Product Designer',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    bio: 'Designs digital products people actually enjoy using, and coaches newer designers on craft, process and career growth.',
    tags: ['Product design', 'UX research', 'Portfolio reviews'],
  },
  {
    n: '03', field: 'Film & Storytelling', name: 'Kelechi Okafor', role: 'Creative Producer',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: 'Produces film and branded stories, and mentors people who want to turn ideas into finished work.',
    tags: ['Production', 'Storytelling', 'Project planning'],
  },
  {
    n: '04', field: 'Marketing', name: 'Ngozi Eze', role: 'Growth Marketer',
    img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&q=80',
    bio: 'Builds marketing that grows steadily, and helps small teams choose the channels and habits worth their time.',
    tags: ['Growth', 'Content', 'Audience building'],
  },
];
type Mentor = (typeof mentors)[number];

const books = [
  { type: 'E-BOOK', title: 'The Quiet Advantage', sub: 'A field guide to building a brand with substance.', bg: '#223329', fg: '#EDEBDD', offset: false },
  { type: 'WORKBOOK', title: 'Make the Move', sub: 'A practical career clarity workbook.', bg: '#D4694A', fg: '#2a1308', offset: true },
  { type: 'PLAYBOOK', title: 'Ideas Into Action', sub: "A product builder's practical manual.", bg: '#202233', fg: '#EDEBDD', offset: false },
  { type: 'GUIDE', title: 'Creative Practice', sub: 'Make better work, more consistently.', bg: '#DAE3A5', fg: '#1d2310', offset: true },
];

const testimonials: { q: ReactNode; name: string; role: string }[] = [
  {
    q: <>Betamind made learning feel less like searching and more like <B>finding the right room at the right time</B>.</>,
    name: 'Zainab Bello', role: 'Aspiring Product Designer',
  },
  {
    q: <>I came looking for direction and found people whose experience helped me <B>make my next move with confidence</B>.</>,
    name: 'Daniel Mensah', role: 'Creative Entrepreneur',
  },
  {
    q: <>Sharing what I know became a <B>meaningful way to connect</B> with curious people who were ready to grow.</>,
    name: 'Chiamaka Eze', role: 'Brand Strategist',
  },
];

const mentorshipCards: { n: string; t: string; d: ReactNode; tags: string[] }[] = [
  {
    n: '01 · One-on-one',
    t: 'Your questions. Their experience.',
    d: <>A conversation <B>focused on your growth</B>.</>,
    tags: ['Affordable sessions', 'Personalized guidance', 'Experienced professionals', 'Flexible booking'],
  },
  {
    n: '02 · Group mentorship',
    t: 'Learn better, together.',
    d: <>Learn alongside others, <B>exchange perspectives</B> and benefit from the <B>experience of a mentor</B>.</>,
    tags: ['Expert-led sessions', 'Shared learning', 'Multiple participants', 'Accessible pricing'],
  },
];

/* ----------------------------------------------------------------
   Events section (dark) + light modal
---------------------------------------------------------------- */

const EventDetail = ({ e }: { e: EventItem }) => (
  <div className="text-black">
    <div className="relative h-56 sm:h-64">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={e.img} alt={e.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-6 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">{e.price}</span>
    </div>

    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold uppercase tracking-[0.15em] text-black/60">{e.cat}</span>
        <span className="text-black/40">Illustrative event</span>
      </div>
      <h3 className="mt-3 text-3xl font-normal leading-tight tracking-tight">{e.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-black/70">{e.desc}</p>

      <div className="mt-6 grid gap-3 rounded-2xl bg-black/[0.04] p-4 text-sm text-black/70 sm:grid-cols-2">
        <p className="flex items-center gap-3"><RiCalendarLine className="text-lg" /> {e.date}</p>
        <p className="flex items-center gap-3"><RiMapPinLine className="text-lg" /> {e.loc}</p>
        <p className="sm:col-span-2">Hosted by <strong className="font-semibold text-black">{e.by}</strong></p>
      </div>

      <h4 className="mt-7 text-sm font-semibold uppercase tracking-wide text-black/60">What to expect</h4>
      <ul className="mt-3 space-y-2.5 text-[15px] text-black/75">
        {e.expect.map((x) => (
          <li key={x} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8F34D] text-xs text-black"><RiCheckLine /></span>
            {x}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryBtn href={GET_STARTED_URL}>Register for this event</PrimaryBtn>
      </div>
    </div>
  </div>
);

const EventsSection = () => {
  const [active, setActive] = useState('All Events');
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const shown = active === 'All Events' ? eventList : eventList.filter((e) => e.cat === active);

  // One full "page" per click (4 cards on desktop, 2 on tablet, 1 on mobile). 20px = gap-5
  const scrollCards = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth + 20), behavior: 'smooth' });
  };

  return (
    <Section id="events">
      <Reveal>
        <Eyebrow>Events &amp; experiences</Eyebrow>
        <h2 className="text-4xl font-normal leading-[1.02] tracking-tighter sm:text-5xl lg:text-[64px]">
          Make your next <br className="hidden sm:block" />
          outing count.
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-xl space-y-4 text-[16px] leading-relaxed text-white/70">
          <p>Not every event deserves a space on your calendar. <B>Find the ones that do.</B></p>
          <p>From <B>industry conferences</B> and <B>business workshops</B> to <B>webinars</B>, <B>masterclasses</B> and <B>networking experiences</B>, Betamind makes it easier to <B>find what&apos;s happening</B> and <B>get involved</B>.</p>
        </div>
        <div><PrimaryBtn href="/events">Find Your Next Event</PrimaryBtn></div>
      </Reveal>

      <Reveal delay={150} className="mt-10 flex items-center justify-between gap-4">
        <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {eventCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${active === c ? 'bg-white text-black' : 'bg-white/[0.07] text-white/70 hover:bg-white/15'
                }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-3 sm:flex">
          <button onClick={() => scrollCards(-1)} aria-label="Previous events" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.07] transition-colors hover:bg-white/15">
            <RiArrowLeftLine className="text-lg" />
          </button>
          <button onClick={() => scrollCards(1)} aria-label="Next events" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.07] transition-colors hover:bg-white/15">
            <RiArrowRightLine className="text-lg" />
          </button>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-6">
        <div
          key={active}
          ref={scroller}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((e) => (
            <button
              key={e.title}
              type="button"
              onClick={() => { setSelected(e); setOpen(true); }}
              className="group relative h-[420px] w-[86%] shrink-0 snap-start overflow-hidden rounded-[28px] text-left text-white sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={e.img} alt={e.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                {e.cat}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black">
                {e.price}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-2xl font-medium leading-[1.1] tracking-tight">{e.title}</h3>
                <p className="mt-3 flex items-center gap-2 text-[13px] text-white/75">
                  <RiCalendarLine className="shrink-0" /> {e.date}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[13px] text-white/75">
                  <RiMapPinLine className="shrink-0" /> {e.loc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="truncate text-xs text-white/55">By {e.by}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                    <RiArrowRightUpLine />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      <Modal open={open} onClose={() => setOpen(false)} light label="Event details">
        {selected && <EventDetail e={selected} />}
      </Modal>
    </Section>
  );
};

/* ----------------------------------------------------------------
   Mentors section (light, 4 per row) + dark modal
---------------------------------------------------------------- */

const MentorDetail = ({ m }: { m: Mentor }) => (
  <div className="grid text-white md:grid-cols-[0.85fr_1.15fr]">
    <div className="relative h-72 md:h-auto md:min-h-[460px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m.img} alt={m.name} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f100e] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f100e]/60" />
    </div>

    <div className="p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: LIME }}>{m.n} · {m.field}</p>
      <h3 className="mt-2 text-3xl font-semibold tracking-tight">{m.name}</h3>
      <p className="text-white/60">{m.role}</p>
      <p className="mt-5 text-[15px] leading-relaxed text-white/75">{m.bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {m.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">{t}</span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm font-semibold">One-on-one</p>
          <p className="mt-1 text-xs text-white/60">A conversation focused on your growth.</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm font-semibold">Group mentorship</p>
          <p className="mt-1 text-xs text-white/60">Learn alongside others with an expert guiding the session.</p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <PrimaryBtn href={GET_STARTED_URL}>Book a session</PrimaryBtn>
        {/* Plain link: this modal is dark, but it renders inside a light section's context */}
        <Link
          href="/become-a-mentor"
          className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Become a mentor
        </Link>
      </div>
      <p className="mt-5 text-[11px] text-white/30">Sample profile</p>
    </div>
  </div>
);

const MentorsSection = () => {
  const [selected, setSelected] = useState<Mentor | null>(null);
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollCards = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Section id="mentors" tone="light">
      <SectionHead eyebrow="Featured mentors" title={<>People worth <Lime>learning</Lime> from.</>}>
        <p>You don&apos;t have to figure everything out on your own.</p>
        <p>Get access to <B>experienced professionals</B> who can share <B>practical knowledge</B>, offer guidance and help you approach your next challenge with greater clarity.</p>
      </SectionHead>

      <Reveal className="mt-10">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {mentors.map((m) => (
            <button
              key={m.n}
              type="button"
              onClick={() => { setSelected(m); setOpen(true); }}
              className="group relative h-[380px] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl text-left text-white sm:w-[46%] lg:w-[calc((100%-3.75rem)/4)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.name} className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] font-semibold" style={{ color: LIME }}>{m.n} · {m.field}</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{m.name}</h3>
                <p className="text-sm text-white/60">{m.role}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-semibold" style={{ color: LIME }}>
                  View Profile <RiArrowRightUpLine className="text-base text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-3 lg:hidden">
          <button onClick={() => scrollCards(-1)} aria-label="Previous mentors" className="flex h-11 w-11 items-center justify-center rounded-full bg-black/10"><RiArrowLeftLine /></button>
          <button onClick={() => scrollCards(1)} aria-label="Next mentors" className="flex h-11 w-11 items-center justify-center rounded-full bg-black/10"><RiArrowRightLine /></button>
        </div>
      </Reveal>

      <Modal open={open} onClose={() => setOpen(false)} label="Mentor profile">
        {selected && <MentorDetail m={selected} />}
      </Modal>
    </Section>
  );
};

/* ================================================================
   WAITLIST MODAL  ← TEMPORARY
   Opens as soon as the site loads and can't be closed (no X button,
   no Escape, no click-outside). To remove it later, delete this whole
   block and the single <WaitlistModal /> line inside <main> in Page.
   (You can also drop the `useEffect`, `CSSProperties`, `FormEvent`,
   `createPortal` and the Ri icon imports used only here if nothing
   else uses them.)
================================================================ */

/**
 * Waitlist API (POST, JSON body):
 *   { email, name, phone_number }
 * phone_number is sent in international format, e.g. "+2348031234567".
 */
const WAITLIST_URL = 'https://api.betaminds.online/api/v1/waitlist/join/';

type WaitlistField = 'fullName' | 'email' | 'confirmEmail' | 'phone';

/* ───────── Validation helpers ───────── */

type Country = {
  iso: string;
  name: string;
  dial: string;
  /** min/max length of the national number (no country code, no leading 0) */
  min: number;
  max: number;
  /** optional stricter pattern for the national number */
  pattern?: RegExp;
  example: string;
};

const COUNTRIES: Country[] = [
  { iso: 'NG', name: 'Nigeria', dial: '+234', min: 10, max: 10, pattern: /^[789]\d{9}$/, example: '803 123 4567' },
  { iso: 'GH', name: 'Ghana', dial: '+233', min: 9, max: 9, pattern: /^[235]\d{8}$/, example: '24 123 4567' },
  { iso: 'KE', name: 'Kenya', dial: '+254', min: 9, max: 9, pattern: /^[17]\d{8}$/, example: '712 345 678' },
  { iso: 'ZA', name: 'South Africa', dial: '+27', min: 9, max: 9, pattern: /^[1-8]\d{8}$/, example: '82 123 4567' },
  { iso: 'US', name: 'United States', dial: '+1', min: 10, max: 10, pattern: /^[2-9]\d{9}$/, example: '415 555 0123' },
  { iso: 'CA', name: 'Canada', dial: '+1', min: 10, max: 10, pattern: /^[2-9]\d{9}$/, example: '416 555 0123' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44', min: 9, max: 10, example: '7400 123456' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971', min: 9, max: 9, example: '50 123 4567' },
  { iso: 'IN', name: 'India', dial: '+91', min: 10, max: 10, pattern: /^[6-9]\d{9}$/, example: '98765 43210' },

  // Africa
  { iso: 'AO', name: 'Angola', dial: '+244', min: 9, max: 9, example: '923 123 456' },
  { iso: 'BJ', name: 'Benin', dial: '+229', min: 8, max: 10, example: '01 90 12 34 56' },
  { iso: 'BW', name: 'Botswana', dial: '+267', min: 7, max: 8, example: '71 234 567' },
  { iso: 'BF', name: 'Burkina Faso', dial: '+226', min: 8, max: 8, example: '70 12 34 56' },
  { iso: 'CM', name: 'Cameroon', dial: '+237', min: 9, max: 9, example: '6 71 23 45 67' },
  { iso: 'CI', name: "Côte d'Ivoire", dial: '+225', min: 10, max: 10, example: '01 23 45 67 89' },
  { iso: 'DZ', name: 'Algeria', dial: '+213', min: 9, max: 9, example: '551 23 45 67' },
  { iso: 'EG', name: 'Egypt', dial: '+20', min: 10, max: 10, example: '100 123 4567' },
  { iso: 'ET', name: 'Ethiopia', dial: '+251', min: 9, max: 9, example: '91 123 4567' },
  { iso: 'GM', name: 'Gambia', dial: '+220', min: 7, max: 7, example: '301 2345' },
  { iso: 'LR', name: 'Liberia', dial: '+231', min: 7, max: 9, example: '77 012 3456' },
  { iso: 'MA', name: 'Morocco', dial: '+212', min: 9, max: 9, example: '612 345 678' },
  { iso: 'ML', name: 'Mali', dial: '+223', min: 8, max: 8, example: '65 01 23 45' },
  { iso: 'MZ', name: 'Mozambique', dial: '+258', min: 9, max: 9, example: '82 123 4567' },
  { iso: 'NA', name: 'Namibia', dial: '+264', min: 9, max: 9, example: '81 123 4567' },
  { iso: 'NE', name: 'Niger', dial: '+227', min: 8, max: 8, example: '93 12 34 56' },
  { iso: 'RW', name: 'Rwanda', dial: '+250', min: 9, max: 9, example: '788 123 456' },
  { iso: 'SD', name: 'Sudan', dial: '+249', min: 9, max: 9, example: '91 123 1234' },
  { iso: 'SL', name: 'Sierra Leone', dial: '+232', min: 8, max: 8, example: '25 123456' },
  { iso: 'SN', name: 'Senegal', dial: '+221', min: 9, max: 9, example: '77 123 45 67' },
  { iso: 'TG', name: 'Togo', dial: '+228', min: 8, max: 8, example: '90 12 34 56' },
  { iso: 'TN', name: 'Tunisia', dial: '+216', min: 8, max: 8, example: '20 123 456' },
  { iso: 'TZ', name: 'Tanzania', dial: '+255', min: 9, max: 9, example: '712 345 678' },
  { iso: 'UG', name: 'Uganda', dial: '+256', min: 9, max: 9, example: '712 345 678' },
  { iso: 'ZM', name: 'Zambia', dial: '+260', min: 9, max: 9, example: '95 123 4567' },
  { iso: 'ZW', name: 'Zimbabwe', dial: '+263', min: 9, max: 10, example: '71 234 5678' },

  // Europe
  { iso: 'BE', name: 'Belgium', dial: '+32', min: 8, max: 9, example: '470 12 34 56' },
  { iso: 'CH', name: 'Switzerland', dial: '+41', min: 9, max: 9, example: '78 123 45 67' },
  { iso: 'DE', name: 'Germany', dial: '+49', min: 10, max: 11, example: '1512 3456789' },
  { iso: 'ES', name: 'Spain', dial: '+34', min: 9, max: 9, example: '612 34 56 78' },
  { iso: 'FR', name: 'France', dial: '+33', min: 9, max: 9, example: '6 12 34 56 78' },
  { iso: 'IE', name: 'Ireland', dial: '+353', min: 8, max: 9, example: '85 123 4567' },
  { iso: 'IT', name: 'Italy', dial: '+39', min: 9, max: 10, example: '312 345 6789' },
  { iso: 'NL', name: 'Netherlands', dial: '+31', min: 9, max: 9, example: '6 12345678' },
  { iso: 'NO', name: 'Norway', dial: '+47', min: 8, max: 8, example: '412 34 567' },
  { iso: 'PT', name: 'Portugal', dial: '+351', min: 9, max: 9, example: '912 345 678' },
  { iso: 'SE', name: 'Sweden', dial: '+46', min: 7, max: 9, example: '70 123 45 67' },

  // Middle East, Asia & Pacific
  { iso: 'AU', name: 'Australia', dial: '+61', min: 9, max: 9, example: '412 345 678' },
  { iso: 'BD', name: 'Bangladesh', dial: '+880', min: 10, max: 10, example: '1812 345678' },
  { iso: 'CN', name: 'China', dial: '+86', min: 11, max: 11, example: '131 2345 6789' },
  { iso: 'ID', name: 'Indonesia', dial: '+62', min: 9, max: 12, example: '812 3456 789' },
  { iso: 'JP', name: 'Japan', dial: '+81', min: 10, max: 10, example: '90 1234 5678' },
  { iso: 'KR', name: 'South Korea', dial: '+82', min: 9, max: 10, example: '10 1234 5678' },
  { iso: 'MY', name: 'Malaysia', dial: '+60', min: 9, max: 10, example: '12 345 6789' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64', min: 8, max: 10, example: '21 123 4567' },
  { iso: 'PH', name: 'Philippines', dial: '+63', min: 10, max: 10, example: '917 123 4567' },
  { iso: 'PK', name: 'Pakistan', dial: '+92', min: 10, max: 10, example: '301 2345678' },
  { iso: 'QA', name: 'Qatar', dial: '+974', min: 8, max: 8, example: '3312 3456' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966', min: 9, max: 9, example: '51 234 5678' },
  { iso: 'SG', name: 'Singapore', dial: '+65', min: 8, max: 8, example: '8123 4567' },
  { iso: 'TR', name: 'Türkiye', dial: '+90', min: 10, max: 10, example: '501 234 56 78' },

  // Americas
  { iso: 'AR', name: 'Argentina', dial: '+54', min: 10, max: 10, example: '11 2345 6789' },
  { iso: 'BR', name: 'Brazil', dial: '+55', min: 10, max: 11, example: '11 91234 5678' },
  { iso: 'CO', name: 'Colombia', dial: '+57', min: 10, max: 10, example: '321 1234567' },
  { iso: 'MX', name: 'Mexico', dial: '+52', min: 10, max: 10, example: '222 123 4567' },
];

const DEFAULT_COUNTRY = COUNTRIES[0];

const normalizeName = (v: string) => v.trim().replace(/\s+/g, ' ');

// Each part of a name: starts with a letter, then letters, apostrophes, dots or hyphens
const NAME_PART = /^\p{L}[\p{L}'’.-]*$/u;

const validateName = (v: string): string | undefined => {
  const name = normalizeName(v);
  if (!name) return 'Please enter your full name.';
  if (name.length < 6) return 'Full name must be at least 6 characters.';
  const parts = name.split(' ');
  if (parts.length < 2 || parts.filter((p) => p.length >= 2).length < 2) {
    return 'Please enter your first and last name.';
  }
  if (!parts.every((p) => NAME_PART.test(p))) {
    return 'Names can only contain letters, hyphens and apostrophes.';
  }
  return undefined;
};

const EMAIL_RE =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

const validateEmail = (v: string): string | undefined => {
  const email = v.trim();
  if (!email) return 'Please enter your email address.';
  if (email.length > 254 || email.includes('..') || !EMAIL_RE.test(email)) {
    return 'Please enter a valid email address.';
  }
  return undefined;
};

const validateConfirmEmail = (email: string, confirm: string): string | undefined => {
  if (!confirm.trim()) return 'Please confirm your email address.';
  if (email.trim().toLowerCase() !== confirm.trim().toLowerCase()) {
    return 'Email addresses do not match.';
  }
  return undefined;
};

/**
 * Reduces whatever the user typed to just the national number:
 *   "0803 123 4567"      -> "8031234567"
 *   "+234 803 123 4567"  -> "8031234567"
 *   "2348031234567"      -> "8031234567"
 */
const normalizePhone = (raw: string, country: Country): string => {
  const trimmed = raw.trim();
  const dialDigits = country.dial.replace('+', '');
  let digits = trimmed.replace(/\D/g, '');

  if (trimmed.startsWith('00')) digits = digits.slice(2);

  const typedWithPrefix = trimmed.startsWith('+') || trimmed.startsWith('00');
  const looksPrefixed = digits.startsWith(dialDigits) && digits.length === dialDigits.length + country.max;
  if ((typedWithPrefix && digits.startsWith(dialDigits)) || looksPrefixed) {
    digits = digits.slice(dialDigits.length);
  }

  // Drop the local trunk prefix (the leading 0 in 0803...)
  return digits.replace(/^0+/, '');
};

const validatePhone = (raw: string, country: Country): string | undefined => {
  if (!raw.trim()) return 'Please enter your phone number.';
  const national = normalizePhone(raw, country);
  const badLength = national.length < country.min || national.length > country.max;
  const badPattern = country.pattern ? !country.pattern.test(national) : false;
  if (badLength || badPattern) {
    return `Enter a valid ${country.name} phone number, e.g. ${country.example}.`;
  }
  return undefined;
};

/** Full international number, e.g. "+2348031234567" */
const toInternational = (raw: string, country: Country) => `${country.dial}${normalizePhone(raw, country)}`;

/* ───────── API error mapping ───────── */

const API_FIELD_MAP: Record<string, WaitlistField> = {
  name: 'fullName',
  email: 'email',
  phone_number: 'phone',
};

const parseApiError = async (
  res: Response,
): Promise<{ message: string; fields: Partial<Record<WaitlistField, string>> }> => {
  const out: { message: string; fields: Partial<Record<WaitlistField, string>> } = { message: '', fields: {} };
  try {
    const data = await res.json();
    if (typeof data === 'string') {
      out.message = data;
    } else if (data && typeof data === 'object') {
      const source: Record<string, unknown> = {
        ...data,
        ...(data.errors && typeof data.errors === 'object' ? data.errors : {}),
      };
      for (const [key, value] of Object.entries(source)) {
        const text = Array.isArray(value) ? String(value[0] ?? '') : typeof value === 'string' ? value : '';
        if (!text) continue;
        const field = API_FIELD_MAP[key];
        if (field) out.fields[field] = text;
        else if (!out.message && ['detail', 'message', 'error', 'non_field_errors'].includes(key)) out.message = text;
      }
    }
  } catch {
    /* response wasn't JSON */
  }
  if (!out.message && Object.keys(out.fields).length === 0) {
    out.message = 'Something went wrong. Please try again.';
  }
  return out;
};

// 14 little dots that burst out of the success badge
const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = 74 + (i % 3) * 14;
  return {
    x: Math.round(Math.cos(angle) * dist),
    y: Math.round(Math.sin(angle) * dist),
    size: 5 + (i % 3) * 2,
    delay: (i % 5) * 40,
    color: i % 3 === 0 ? '#ffffff' : LIME,
  };
});

/* ───────── Country code dropdown ───────── */

/**
 * Custom dropdown that shows only the dial code on the button (e.g. "+234")
 * and the full country list (name + code, searchable) in the panel.
 * The panel is rendered in a portal so the modal's overflow/transform can't clip it.
 *
 * Mobile fixes:
 *  - the search box is NOT auto-focused on touch devices (the keyboard used to
 *    resize the viewport and close the panel immediately)
 *  - resize events only close the panel when the WIDTH changes (keyboard only changes height)
 *  - scroll events caused by focusing the search box / right after opening are ignored
 *  - inputs are 16px on mobile so iOS Safari doesn't zoom in
 */
const CountrySelect = ({
  value,
  onChange,
  disabled,
  invalid,
}: {
  value: string;
  onChange: (iso: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState<{ left: number; width: number; top?: number; bottom?: number }>({ left: 0, width: 288 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);

  const selected = COUNTRIES.find((c) => c.iso === value) ?? DEFAULT_COUNTRY;

  const q = query.trim().toLowerCase().replace(/^\+/, '');
  const filtered = q
    ? COUNTRIES.filter((c) => c.name.toLowerCase().includes(q) || c.dial.replace('+', '').startsWith(q))
    : COUNTRIES;

  const openPanel = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    const width = Math.min(300, window.innerWidth - 24);
    const left = Math.max(12, Math.min(r.left, window.innerWidth - width - 12));
    const spaceBelow = window.innerHeight - r.bottom;
    // Open upwards when there isn't enough room below
    setPos(
      spaceBelow < 340 && r.top > spaceBelow
        ? { left, width, bottom: window.innerHeight - r.top + 8 }
        : { left, width, top: r.bottom + 8 },
    );
    openedAt.current = Date.now();
    setQuery('');
    setOpen(true);
  };

  const pick = (iso: string) => {
    onChange(iso);
    setOpen(false);
    btnRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    let lastWidth = window.innerWidth;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };

    const onScroll = (e: Event) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      // Ignore scrolls caused by the keyboard / focusing the search box
      if (document.activeElement === searchRef.current) return;
      if (Date.now() - openedAt.current < 500) return;
      setOpen(false);
    };

    const onResize = () => {
      // The mobile keyboard only changes the height. Only close on real width changes (rotation, etc.)
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);

    // Don't auto-focus search on touch devices: it pops the keyboard over the list
    const t = isTouch ? undefined : window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 30);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      if (t) window.clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        disabled={disabled}
        aria-label={`Country code, ${selected.name} ${selected.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-[104px] shrink-0 items-center justify-between gap-1 rounded-xl border bg-white/[0.05] pl-3.5 pr-2.5 text-base font-medium text-white outline-none transition-colors hover:bg-white/[0.08] focus-visible:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70 sm:text-[15px]"
        style={{ borderColor: invalid ? '#f87171' : open ? LIME : 'rgba(255,255,255,0.1)' }}
      >
        <span>{selected.dial}</span>
        <RiArrowDownSLine
          className={`text-xl text-white/50 transition-transform duration-200 ${open ? 'rotate-180 text-white' : ''}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label="Select country code"
            className="wl-dd fixed z-[300] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            style={{ left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-3">
              <RiSearchLine className="shrink-0 text-base text-white/40" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filtered[0]) {
                    e.preventDefault();
                    pick(filtered[0].iso);
                  }
                }}
                placeholder="Search country or code"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/30 sm:text-sm"
              />
            </div>

            <ul className="max-h-56 overflow-y-auto p-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-white/40">No country found</li>}
              {filtered.map((c) => {
                const isSel = c.iso === selected.iso;
                return (
                  <li key={c.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSel}
                      onClick={() => pick(c.iso)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${isSel ? 'bg-white/[0.07] text-white' : 'text-white/80'
                        }`}
                    >
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="shrink-0 tabular-nums text-white/50">{c.dial}</span>
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center" style={{ color: LIME }}>
                        {isSel && <RiCheckLine className="text-base" />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
};

// text-base on mobile (16px) prevents iOS Safari from zooming in on focus
const waitlistInput =
  'w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-white/30 focus:bg-white/[0.08] sm:text-[15px]';

const WaitlistModal = () => {
  const [form, setForm] = useState<Record<WaitlistField, string>>({ fullName: '', email: '', confirmEmail: '', phone: '' });
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY.iso);
  const [errors, setErrors] = useState<Partial<Record<WaitlistField, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [visible, setVisible] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const country = COUNTRIES.find((c) => c.iso === countryIso) ?? DEFAULT_COUNTRY;

  // Fade in on load, lock page scroll while the modal is up
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 350);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const setField = (key: WaitlistField, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    // Editing the email makes any "doesn't match" message on the confirm field stale
    if (key === 'email' && errors.confirmEmail) setErrors((e) => ({ ...e, confirmEmail: undefined }));
    if (submitError) setSubmitError('');
  };

  const validateField = (key: WaitlistField, value: string, c: Country = country) => {
    if (key === 'fullName') return validateName(value);
    if (key === 'email') return validateEmail(value);
    if (key === 'confirmEmail') return validateConfirmEmail(form.email, value);
    return validatePhone(value, c);
  };

  // Show the error for a field as soon as the user leaves it (only if they typed something)
  const handleBlur = (key: WaitlistField) => {
    if (!form[key].trim()) return;
    setErrors((e) => {
      const next = { ...e, [key]: validateField(key, form[key]) };
      // If they fix the email after typing the confirmation, re-check the match
      if (key === 'email' && form.confirmEmail.trim()) {
        next.confirmEmail = validateConfirmEmail(form.email, form.confirmEmail);
      }
      return next;
    });
  };

  const handleCountryChange = (iso: string) => {
    setCountryIso(iso);
    setErrors((e) => ({ ...e, phone: undefined }));
    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const next: Partial<Record<WaitlistField, string>> = {
      fullName: validateName(form.fullName),
      email: validateEmail(form.email),
      confirmEmail: validateConfirmEmail(form.email, form.confirmEmail),
      phone: validatePhone(form.phone, country),
    };
    setErrors(next);

    const firstInvalid = (['fullName', 'email', 'confirmEmail', 'phone'] as WaitlistField[]).find((k) => next[k]);
    if (firstInvalid) {
      const ids: Record<WaitlistField, string> = {
        fullName: 'wl-name',
        email: 'wl-email',
        confirmEmail: 'wl-confirm-email',
        phone: 'wl-phone',
      };
      document.getElementById(ids[firstInvalid])?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || !validate()) return;

    setStatus('loading');
    setSubmitError('');

    try {
      const res = await fetch(WAITLIST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          name: normalizeName(form.fullName),
          phone_number: toInternational(form.phone, country),
        }),
      });

      if (!res.ok) {
        const { message, fields } = await parseApiError(res);
        setStatus('idle');
        if (Object.keys(fields).length) setErrors((prev) => ({ ...prev, ...fields }));
        setSubmitError(message);
        return;
      }

      setStatus('success');
    } catch {
      // Network failure or CORS block
      setStatus('idle');
      setSubmitError('Could not reach the server. Check your connection and try again.');
    }
  };

  const firstName = normalizeName(form.fullName).split(' ')[0] || 'there';
  const phoneIsValid = !!form.phone.trim() && !validatePhone(form.phone, country);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 pt-24 transition-opacity duration-500 sm:pt-28"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        opacity: visible ? 1 : 0,
      }}
    // No onClick / onKeyDown close handlers on purpose: this modal can't be dismissed
    >
      {/* Simple navbar (same capsule style as the real one). Not clickable: the waitlist blocks the site */}
      <header
        className="absolute inset-x-0 top-4 flex justify-center px-4 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-16px)' }}
      >
        <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-black/55 py-2 pl-6 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <Image
            src="/assets/betamindlogo.png"
            alt="Betamind logo"
            width={112}
            height={30}
            priority
            unoptimized
            className="h-auto w-[112px] object-contain"
          />
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-black" style={{ background: LIME }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/60 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
            </span>
            Waitlist open
          </span>
        </nav>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Join the Betamind waitlist"
        className="relative max-h-[calc(100vh-7rem)] w-full max-w-md overflow-y-auto rounded-[20px] border border-white/5 bg-black/80 p-6 shadow-2xl transition-all duration-500 supports-[height:100dvh]:max-h-[calc(100dvh-7rem)] sm:p-8 lg:max-w-xl lg:p-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* soft lime glow behind the card content */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: LIME }}
        />

        {status === 'success' ? (
          /* ───────── Success state ───────── */
          <div className="wl-fade-up relative flex flex-col items-center py-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              {/* expanding rings */}
              <span className="wl-ring absolute inset-0 rounded-full" style={{ border: `2px solid ${LIME}` }} />
              <span className="wl-ring wl-ring-2 absolute inset-0 rounded-full" style={{ border: `2px solid ${LIME}` }} />

              {/* burst dots */}
              {BURST.map((d, i) => (
                <span
                  key={i}
                  className="wl-burst absolute left-1/2 top-1/2 rounded-full"
                  style={
                    {
                      width: d.size,
                      height: d.size,
                      marginLeft: -d.size / 2,
                      marginTop: -d.size / 2,
                      background: d.color,
                      animationDelay: `${300 + d.delay}ms`,
                      '--x': `${d.x}px`,
                      '--y': `${d.y}px`,
                    } as CSSProperties
                  }
                />
              ))}

              {/* badge + drawn check */}
              <span
                className="wl-pop relative flex h-24 w-24 items-center justify-center rounded-full"
                style={{ background: LIME, boxShadow: `0 0 50px ${LIME}66` }}
              >
                <svg viewBox="0 0 52 52" className="h-12 w-12" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                  <path className="wl-check" d="M14 27l8 8 16-17" />
                </svg>
              </span>
            </div>

            <h3 className="wl-fade-up mt-8 text-3xl font-semibold tracking-tight" style={{ animationDelay: '450ms' }}>
              You&apos;re on the list, {firstName}!
            </h3>
            <p className="wl-fade-up mt-3 max-w-xs text-[15px] leading-relaxed text-white/65" style={{ animationDelay: '600ms' }}>
              Thanks for joining the Betamind waitlist. We&apos;ll reach out to <span className="font-medium text-white">{form.email.trim().toLowerCase()}</span> as
              soon as we&apos;re ready for you.
            </p>

            <div
              className="wl-fade-up mt-7 inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-xs font-medium text-white/70"
              style={{ animationDelay: '750ms' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: LIME }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: LIME }} />
              </span>
              Early access, coming soon
            </div>
          </div>
        ) : (
          /* ───────── Form state ───────── */
          <div className="relative">
            <Eyebrow>Waitlist</Eyebrow>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
              Be first in the <Lime>room</Lime>.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/65">
              Join the Betamind waitlist and we&apos;ll let you know the moment we open the doors.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
              <div>
                <label htmlFor="wl-name" className="mb-1.5 block text-xs font-medium text-white/60">Full name</label>
                <input
                  ref={firstFieldRef}
                  id="wl-name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={form.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  placeholder="e.g. Amara Nwosu"
                  disabled={status === 'loading'}
                  aria-invalid={!!errors.fullName}
                  className={waitlistInput}
                  style={{ borderColor: errors.fullName ? '#f87171' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="wl-email" className="mb-1.5 block text-xs font-medium text-white/60">Email</label>
                <input
                  id="wl-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@example.com"
                  disabled={status === 'loading'}
                  aria-invalid={!!errors.email}
                  className={waitlistInput}
                  style={{ borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="wl-confirm-email" className="mb-1.5 block text-xs font-medium text-white/60">Confirm email</label>
                <input
                  id="wl-confirm-email"
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={254}
                  value={form.confirmEmail}
                  onChange={(e) => setField('confirmEmail', e.target.value)}
                  onBlur={() => handleBlur('confirmEmail')}
                  placeholder="Re-enter your email"
                  disabled={status === 'loading'}
                  aria-invalid={!!errors.confirmEmail}
                  className={waitlistInput}
                  style={{ borderColor: errors.confirmEmail ? '#f87171' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.confirmEmail && <p className="mt-1.5 text-xs text-red-400">{errors.confirmEmail}</p>}
              </div>

              <div>
                <label htmlFor="wl-phone" className="mb-1.5 block text-xs font-medium text-white/60">Phone number</label>
                <div className="flex gap-2">
                  <CountrySelect
                    value={countryIso}
                    onChange={handleCountryChange}
                    disabled={status === 'loading'}
                    invalid={!!errors.phone}
                  />
                  <input
                    id="wl-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    maxLength={20}
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value.replace(/[^\d+\s()-]/g, ''))}
                    onBlur={() => handleBlur('phone')}
                    placeholder={country.example}
                    disabled={status === 'loading'}
                    aria-invalid={!!errors.phone}
                    className={waitlistInput}
                    style={{ borderColor: errors.phone ? '#f87171' : 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                ) : phoneIsValid ? (
                  <p className="mt-1.5 text-xs text-white/40">We&apos;ll save this as {toInternational(form.phone, country)}</p>
                ) : null}
              </div>

              {submitError && (
                <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs text-red-300">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-black transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    Joining...
                  </>
                ) : (
                  'Join the waitlist'
                )}
              </button>

              <p className="text-center text-[11px] text-white/35">No spam. We&apos;ll only contact you about Betamind.</p>
            </form>
          </div>
        )}
      </div>

      {/* Animations for the success UI + country dropdown */}
      <style>{`
        @keyframes wl-pop { 0% { transform: scale(0); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes wl-draw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
        @keyframes wl-ring { 0% { transform: scale(0.7); opacity: 0.7; } 100% { transform: scale(1.7); opacity: 0; } }
        @keyframes wl-burst { 0% { transform: translate(0,0) scale(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: translate(var(--x), var(--y)) scale(1); opacity: 0; } }
        @keyframes wl-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wl-dd-in { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .wl-pop { animation: wl-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .wl-check { stroke-dasharray: 40; stroke-dashoffset: 40; animation: wl-draw 500ms 350ms ease-out forwards; }
        .wl-ring { animation: wl-ring 1.8s 300ms ease-out infinite; }
        .wl-ring-2 { animation-delay: 1.1s; }
        .wl-burst { opacity: 0; animation: wl-burst 900ms ease-out both; }
        .wl-fade-up { opacity: 0; animation: wl-fade-up 600ms ease-out forwards; }
        .wl-dd { animation: wl-dd-in 160ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .wl-pop, .wl-check, .wl-ring, .wl-burst, .wl-fade-up, .wl-dd { animation: none !important; opacity: 1; stroke-dashoffset: 0; }
          .wl-ring, .wl-burst { display: none; }
        }
      `}</style>
    </div>
  );
};

/* ----------------------------------------------------------------
   Page
   Order: hero (dark) → light → dark → light → dark → light → dark → light
          → testimonials (dark) → light CTA → footer (dark)
---------------------------------------------------------------- */

const Page = () => {
  return (
    <main className="bg-black text-white">
      {/* TEMPORARY: waitlist modal. Remove this line (and the WaitlistModal block above) when your app launches */}
      <WaitlistModal />

      {/* ============ 1. HERO (dark) ============ */}
      <section className="relative overflow-hidden bg-black px-5 pb-12 pt-28 sm:px-8 md:pt-32 lg:px-10">
        <Glow at="bottom" />
        <div className="relative z-10 mx-auto grid max-w-[1080px] items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          <Reveal>
            <Eyebrow>Discover · Connect · Grow</Eyebrow>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl lg:text-[72px]">
              The right room <Lime>changes</Lime> things.
            </h1>
            <p className="mt-7 max-w-md text-[17px] leading-snug text-white/70">
              Find <B>events worth attending</B>, <B>people worth learning from</B> and <B>resources worth your time</B>, all in <B>one place</B>.
            </p>
            <div className="mt-10">
              <WhiteBtn href={GET_STARTED_URL}>Get started</WhiteBtn>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Image
              src="/assets/hero.png"
              width={1200}
              height={1000}
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              alt="People connecting at a Betamind event"
              className="h-auto w-full object-contain"
            />
          </Reveal>
        </div>
      </section>

      {/* ============ 2. A WORLD OF OPPORTUNITIES (light) ============ */}
      <Section id="explore" tone="light">
        <SectionHead
          eyebrow="A world of opportunities"
          title={<>There&apos;s more than one way to <Lime>move</Lime> forward.</>}
        >
          <p>Sometimes, progress begins with <B>attending the right event</B>. Sometimes, it&apos;s a <B>conversation with someone who&apos;s been there before</B>. And sometimes, it&apos;s finding <B>the resource that gives you a fresh perspective</B>.</p>
          <p>Betamind puts these experiences <B>in one place</B>, so you spend <B>less time searching and more time doing</B>.</p>
        </SectionHead>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-2">
          {opportunityCards.map((c, i) => (
            <Reveal key={c.tag} delay={i * 100} className={c.big ? 'lg:row-span-2' : ''}>
              <Link
                href={c.href}
                className={`group relative block h-full overflow-hidden rounded-3xl border-t-2 border-[#C8F34D] bg-neutral-900 text-white ${c.big ? 'min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]' : 'min-h-[260px]'
                  }`}
              >
                <Image
                  src={c.img}
                  alt={c.tag}
                  fill
                  sizes={c.big ? '(min-width: 1024px) 620px, 100vw' : '(min-width: 1024px) 420px, 100vw'}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase" style={{ color: LIME }}>{c.tag}</p>
                    <h3 className="max-w-xs text-2xl font-semibold leading-[1.05] tracking-tighter md:text-3xl">{c.title}</h3>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                    <RiArrowRightUpLine />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 3. EVENTS (dark) ============ */}
      <EventsSection />

      {/* ============ 4. FOR EVENT ORGANIZERS (light) ============ */}
      <Section id="organizers" tone="light">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <Eyebrow>For event organizers</Eyebrow>
            <H2>
              Don&apos;t just fill seats. Get <Lime>people</Lime> through the door
            </H2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-black/75">
              A registration is a promise to attend. <B>Help people keep it.</B>
            </p>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-black/75">
              Betamind takes the pressure off manual follow-ups with <B>automated email and WhatsApp communication</B> that keeps your attendees informed before your event.
            </p>
            <div className="mt-8"><PrimaryBtn href="/events">Host Your Event</PrimaryBtn></div>
          </Reveal>

          <Reveal delay={150}>
            <Image
              src="/assets/phone.png"
              alt="Betamind WhatsApp and email reminders on phone"
              width={1000}
              height={900}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="h-auto w-full object-contain"
            />
          </Reveal>
        </div>
      </Section>

      {/* ============ 5. MENTORSHIP (dark) ============ */}
      <Section id="mentorship">
        <SectionHead eyebrow="Mentorship" title={<>Experience is better when it&apos;s <Lime>shared</Lime>.</>}>
          <p>You don&apos;t have to figure everything out on your own.</p>
          <p>Get access to <B>experienced professionals</B> who can share <B>practical knowledge</B>, offer guidance and help you approach your next challenge with greater clarity.</p>
          <p>Whether you prefer <B>personal guidance</B> or <B>learning alongside others</B>, there&apos;s a mentorship experience for you.</p>
        </SectionHead>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {mentorshipCards.map((c, i) => (
            <Reveal key={c.n} delay={i * 120}>
              <div className={`${cardClass(false)} h-full p-7 md:p-9`}>
                <p className="mb-10 text-sm font-semibold uppercase text-white/70">{c.n}</p>
                <h3 className="text-3xl font-normal leading-[1.05] tracking-tighter md:text-4xl">{c.t}</h3>
                <p className="mt-4 max-w-md text-white/80">{c.d}</p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {c.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 6. FEATURED MENTORS (light) ============ */}
      <MentorsSection />

      {/* ============ 7. KNOWLEDGE MARKETPLACE (dark) ============ */}
      <Section id="digital-products">
        <Reveal>
          <Eyebrow>The knowledge marketplace</Eyebrow>
          <div className="max-w-3xl">
            <H2>Good <Lime>knowledge</Lime> deserves to be within reach.</H2>
          </div>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-white/70">
            <p>Some lessons come through experience. Others come in <B>a book, a guide or a resource</B> that helps you <B>see things differently</B>.</p>
            <p>Explore <B>practical digital resources</B> created by experienced mentors. Find materials you can <B>learn from, return to and put into practice</B>.</p>
          </div>
          <div className="mt-8"><PrimaryBtn href="/digital-products">Explore Digital Products</PrimaryBtn></div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {books.map((b, i) => (
            <Reveal key={i} delay={i * 100} className={b.offset ? 'lg:mt-10' : ''}>
              <Link href="/digital-products" className="block">
                <div className="flex aspect-square flex-col justify-between rounded-2xl p-5 shadow-sm sm:p-6" style={{ background: b.bg, color: b.fg }}>
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest opacity-70">{b.type}</p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold leading-none sm:text-3xl">{b.title}</h3>
                  </div>
                  <div>
                    <p className="text-[11px] opacity-80">{b.sub}</p>
                    <p className="mt-3 text-[9px] tracking-widest opacity-50">BETAMIND EDITIONS · 2026</p>
                  </div>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase" style={{ color: LIME }}>E-Book</p>
                <h4 className="mt-1 text-base font-semibold sm:text-lg">{b.title}</h4>
                <p className="text-sm text-white/60">By Amara Okafor</p>
                <p className="mt-3 border-t border-white/10 pt-3 text-xl font-bold sm:text-2xl">₦6,500</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ 8. CREATE WITH BETAMIND (light) ============ */}
      <Section id="creators" tone="light">
        <SectionHead
          eyebrow="Create with Betamind"
          title={<>What you know can take <Lime>someone</Lime> further.</>}
        >
          <p>Your <B>experience, expertise and ideas</B> have value. Betamind gives you a place to put them to work.</p>
          <p>Whether you want to <B>bring people together</B>, <B>guide someone through their journey</B> or <B>package your knowledge into valuable resources</B>, there&apos;s room to create.</p>
        </SectionHead>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className={`${cardClass(true)} h-full p-7 md:p-9`}>
              <p className="mb-8 text-sm font-semibold uppercase text-black/60">For everyone</p>
              <h3 className="text-4xl font-light leading-[1.05] tracking-tighter md:text-5xl">Bring people together.</h3>
              <p className="mt-5 max-w-md text-black/70">Have something worth bringing people together for? <B>Create an event</B>, <B>set your ticket prices</B>, <B>manage registrations</B> and reach people interested in what you have to offer.</p>
              <div className="mt-8"><GhostBtn href="/events">Start Hosting</GhostBtn></div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className={`${cardClass(true)} h-full p-7 md:p-9`}>
              <p className="mb-8 text-sm font-semibold uppercase text-black/60">For approved mentors</p>
              <h3 className="text-4xl font-light leading-[1.05] tracking-tighter md:text-5xl">Turn your experience into impact.</h3>
              <p className="mt-5 max-w-md text-black/70">Share what you&apos;ve learned. Offer <B>one-on-one or group mentorship</B>, create <B>educational resources</B> and <B>earn from your expertise</B>.</p>
              <p className="mt-4 max-w-md text-black/70">Mentorship and digital product selling are available to <B>approved mentors</B>.</p>
              <div className="mt-8"><PrimaryBtn href="/become-a-mentor">Become a Mentor</PrimaryBtn></div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============ 9. TESTIMONIALS (dark, image + overlay) ============ */}
      <section className="relative overflow-hidden px-5 py-14 sm:px-8 md:py-16 lg:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={COMMUNITY_BG} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        <div className="relative z-10 mx-auto max-w-[1080px] text-center">
          <Reveal>
            <div className="flex justify-center"><Eyebrow>Resources for your next step</Eyebrow></div>
            <h2 className="mx-auto max-w-3xl text-4xl font-light leading-[1.05] tracking-tighter sm:text-5xl lg:text-[56px]">
              Growth feels different when you&apos;re <Lime>not doing it alone.</Lime>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/80">
              Find the people who understand what you&apos;re building, <B>share what they&apos;ve learned</B>, and make the journey feel possible.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="h-full rounded-t-3xl rounded-b-2xl border border-t-2 border-white/5 border-t-[#C8F34D] bg-black/60 p-6 backdrop-blur-md">
                  <span className="text-3xl font-bold leading-none" style={{ color: LIME }}>&ldquo;</span>
                  <p className="mt-4 min-h-[84px] text-white/90">{t.q}</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((d) => <span key={d} className="h-2.5 w-2.5 rounded-full bg-white" />)}
            </div>
            <div className="mt-8 flex justify-center"><PrimaryBtn href={GET_STARTED_URL}>Join the community</PrimaryBtn></div>
          </Reveal>
        </div>
      </section>

      {/* ============ 10. FINAL CTA (light) ============ */}
      <Section tone="light">
        <div className="relative py-6 md:py-10">
          <span aria-hidden className="pointer-events-none absolute -left-4 top-0 select-none text-[11vw] font-extrabold leading-none tracking-tighter text-black/[0.05] lg:text-[130px]">MEET</span>
          <span aria-hidden className="pointer-events-none absolute -right-4 top-16 select-none text-[11vw] font-extrabold leading-none tracking-tighter text-black/[0.05] lg:text-[130px]">LEARN</span>
          <span aria-hidden className="pointer-events-none absolute -bottom-6 left-0 select-none text-[11vw] font-extrabold leading-none tracking-tighter text-black/[0.05] lg:text-[130px]">CREATE</span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eventList[1].img} alt="" aria-hidden className="absolute left-2 top-10 hidden h-28 w-24 -rotate-6 rounded-xl object-cover md:block" />
          <div aria-hidden className="absolute right-4 top-0 hidden h-32 w-24 rotate-6 rounded-lg bg-[#223329] p-2.5 font-serif text-[10px] leading-tight text-[#EDEBDD] md:block">
            <span className="block font-sans text-[6px] tracking-widest opacity-70">E-BOOK</span>
            The Quiet Advantage
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mentors[0].img} alt="" aria-hidden className="absolute bottom-0 right-8 hidden h-32 w-28 rotate-6 rounded-xl object-cover md:block" />

          <Reveal className="relative mx-auto max-w-2xl text-center">
            <div className="flex justify-center"><Eyebrow>Your next step is here</Eyebrow></div>
            <H2>
              Something worth <Lime>discovering</Lime> is waiting.
            </H2>
            <p className="mx-auto mt-5 max-w-sm text-black/70">
              <B>An event to attend. A person to learn from. Knowledge to put to work.</B> Or an opportunity to create.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryBtn href={GET_STARTED_URL}>Get started</PrimaryBtn>
              <GhostBtn href="/events">Host an Event</GhostBtn>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

export default Page;