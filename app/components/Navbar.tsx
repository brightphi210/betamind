'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RiArrowRightLine, RiCloseLine, RiMenu4Fill } from 'react-icons/ri';

/**
 * Every link points at a section id on the home page (see page.tsx).
 * From other pages they resolve to "/#id", so they still work everywhere.
 */
const navLinks = [
  { label: 'Explore', id: 'explore' },
  { label: 'Mentors', id: 'mentors' },
  { label: 'Events', id: 'events' },
  { label: 'Digital Products', id: 'digital-products' },
  { label: 'For Creators', id: 'creators' },
];

const LIME = '#C8F34D';

const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastY = useRef(0);

  const target = hovered ?? active;

  /* Slide the lime pill under the hovered / active link */
  const measure = useCallback(() => {
    const el = target ? itemRefs.current[target] : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, [target]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  /* Scroll progress + hide on scroll down / reveal on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setHidden(y > 240 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-spy: highlight the section currently on screen */
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    // Clear highlight when back in the hero
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, [isHome]);

  /* Lock body scroll while the full-screen menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const go = (e: React.MouseEvent, id: string) => {
    setIsOpen(false);
    if (!isHome) return; // normal navigation to "/#id"
    e.preventDefault();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }, 60);
  };

  return (
    <>
      {/* ============ Floating capsule ============ */}
      <header
        className={`fixed inset-x-0 top-4 z-40 flex justify-center px-4 transition-transform duration-500 ease-out ${hidden && !isOpen ? '-translate-y-[160%]' : 'translate-y-0'
          }`}
      >
        <nav className="relative flex w-full max-w-5xl items-center justify-between overflow-hidden rounded-full border border-white/10 bg-black/55 py-2 pl-6 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0">
            <Image
              src="/assets/betamindlogo.png"
              alt="Betamind logo"
              width={112}
              height={30}
              priority
              unoptimized
              className="h-auto w-[112px] object-contain"
            />
          </Link>

          {/* Links with a sliding lime pill */}
          <div
            ref={trackRef}
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center md:flex"
          >
            <span
              aria-hidden
              className="absolute top-0 h-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                left: pill.left,
                width: pill.width,
                background: LIME,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {navLinks.map((l) => (
              <Link
                key={l.id}
                ref={(el) => {
                  itemRefs.current[l.id] = el;
                }}
                href={`/#${l.id}`}
                onClick={(e) => go(e, l.id)}
                onMouseEnter={() => setHovered(l.id)}
                className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${target === l.id ? 'text-black' : 'text-white/70'
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/login"
              className="rounded-full px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-[#C8F34D]"
            >
              Get Started
              <RiArrowRightLine className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8F34D] text-black md:hidden"
          >
            <RiMenu4Fill className="text-xl" />
          </button>

          {/* Scroll progress line */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{ background: '#ffffff', transform: `scaleX(${progress})` }}
          />
        </nav>
      </header>

      {/* ============ Full-screen mobile menu ============ */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#0b0c0a] px-6 pb-8 pt-6 transition-all duration-500 md:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        style={{ clipPath: isOpen ? 'circle(150% at 90% 6%)' : 'circle(0% at 90% 6%)' }}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/assets/betamindlogo.png"
            alt="Betamind logo"
            width={112}
            height={30}
            unoptimized
            className="h-auto w-[112px] object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black"
          >
            <RiCloseLine className="text-2xl" />
          </button>
        </div>

        <div className="mt-12 flex flex-1 flex-col justify-center">
          {navLinks.map((l, i) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={(e) => go(e, l.id)}
              className="group flex items-baseline gap-4 border-b border-white/10 py-4 transition-all duration-500"
              style={{
                transitionDelay: isOpen ? `${150 + i * 60}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <span className="text-xs tabular-nums text-[#C8F34D]">0{i + 1}</span>
              <span className="text-4xl font-light tracking-tighter text-white transition-colors group-hover:text-[#C8F34D]">
                {l.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-8">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-white/20 py-3.5 text-center font-medium text-white"
          >
            Log in
          </Link>
          <Link
            href="/get-started"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#C8F34D] py-3.5 font-semibold text-black"
          >
            Get Started <RiArrowRightLine />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;