'use client'

/**
 * Save as app/about/page.tsx
 * (imports ../ui, i.e. app/ui.tsx)
 */

import { useEffect, useRef, useState } from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { B, Eyebrow, GhostBtn, H2, LIME, Lime, PrimaryBtn, Reveal, Section, SectionHead, cardClass } from '../components/UI';

// DUMMY team: replace names, roles and photos with your real team
const team = [
  { name: 'Amaka Obi', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
  { name: 'Tunde Bakare', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80' },
  { name: 'Ifeoma Nnadi', role: 'Community Lead', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80' },
  { name: 'Emeka Johnson', role: 'Lead Engineer', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80' },
  { name: 'Sade Williams', role: 'Design Lead', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
  { name: 'Kelechi Okafor', role: 'Partnerships', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
];

const values = [
  { n: '01', t: 'Access', d: 'Empowering growth through affordable, accessible mentorship for everyone.' },
  { n: '02', t: 'Experience', d: 'Learning from people who have been there is one of the fastest ways to move forward.' },
  { n: '03', t: 'Community', d: 'The right room changes things. We help people find it, and help people build it.' },
];

/** Team carousel: arrows, dots, drag/swipe, and a gentle autoplay that pauses on hover */
const TeamCarousel = () => {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [idx, setIdx] = useState(0);

  const step = () => {
    const card = ref.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 20 : 300;
  };
  const scrollBy = (d: number) => ref.current?.scrollBy({ left: d * step(), behavior: 'smooth' });
  const scrollToIdx = (i: number) => ref.current?.scrollTo({ left: i * step(), behavior: 'smooth' });

  const onScroll = () => {
    const el = ref.current;
    if (el) setIdx(Math.min(team.length - 1, Math.round(el.scrollLeft / step())));
  };

  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current;
      if (!el || paused.current) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
      else el.scrollBy({ left: step(), behavior: 'smooth' });
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {team.map((m) => (
          <div
            key={m.name}
            className="group relative h-[400px] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.img} alt={m.name} className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: LIME }}>{m.role}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">{m.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {team.map((m, i) => (
            <button
              key={m.name}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to ${m.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-[#C8F34D]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => scrollBy(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"><RiArrowLeftLine /></button>
          <button onClick={() => scrollBy(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"><RiArrowRightLine /></button>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <main className="bg-black text-white">
      {/* ============ HERO (dark) ============ */}
      <Section hero shade>
        <Reveal className="max-w-3xl">
          <Eyebrow>About Betamind</Eyebrow>
          <h1 className="text-5xl font-light leading-[0.98] tracking-tighter sm:text-6xl lg:text-[72px]">
            Where curiosity meets <Lime>opportunity.</Lime>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-white/80">
            <B>Betamind</B> brings <B>events, mentors and knowledge</B> together in one place, so people spend less time searching and more time doing.
          </p>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">
            We believe <B>growth should be affordable and accessible</B>, and that the right room, the right person or the right resource can change what happens next.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PrimaryBtn href="/#explore">Explore Betamind</PrimaryBtn>
            <GhostBtn href="/contact">Contact us</GhostBtn>
          </div>
        </Reveal>
      </Section>

      {/* ============ WHAT WE BELIEVE (light) ============ */}
      <Section tone="light">
        <Reveal>
          <Eyebrow>What we believe</Eyebrow>
          <div className="max-w-3xl">
            <H2>Good things happen when people are <Lime>connected.</Lime></H2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 120}>
              <div className={`${cardClass(true)} h-full p-7`}>
                <p className="mb-10 text-sm font-semibold text-black/50">{v.n}</p>
                <h3 className="text-3xl font-normal tracking-tighter">{v.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/70">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ TEAM (dark) ============ */}
      <Section>
        <SectionHead eyebrow="The team" title={<>The people behind <Lime>Betamind.</Lime></>}>
          <p>A team that cares about making the right room easier to find, whether you are attending, mentoring or creating.</p>
        </SectionHead>
        <Reveal className="mt-14">
          <TeamCarousel />
        </Reveal>
      </Section>

      {/* ============ CTA (light) ============ */}
      <Section tone="light">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center"><Eyebrow>Get in touch</Eyebrow></div>
          <H2>Have a question? <Lime>Talk to us.</Lime></H2>
          <p className="mx-auto mt-6 max-w-md text-black/70">
            Whether you are <B>attending</B>, <B>hosting</B> or <B>mentoring</B>, our customer care team is a message away.
          </p>
          <div className="mt-10 flex justify-center"><PrimaryBtn href="/contact">Contact us</PrimaryBtn></div>
        </Reveal>
      </Section>
    </main>
  );
};

export default AboutPage;