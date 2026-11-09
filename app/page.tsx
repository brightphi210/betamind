'use client'

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCalendarLine,
  RiCheckLine,
  RiMapPinLine,
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

/* ----------------------------------------------------------------
   Page
   Order: hero (dark) → light → dark → light → dark → light → dark → light
          → testimonials (dark) → light CTA → footer (dark)
---------------------------------------------------------------- */

const Page = () => {
  return (
    <main className="bg-black text-white">
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