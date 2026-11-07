'use client'

/**
 * Shared building blocks for the Betamind pages (home, about, contact).
 * Put this file in the same folder as the home page.tsx (e.g. app/ui.tsx).
 */

import Link from 'next/link';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiArrowRightLine, RiCloseLine } from 'react-icons/ri';

export const LIME = '#C8F34D';
/** Accent used on light backgrounds, where lime would be unreadable */
export const LIME_DARK = '#5f7f00';

/* ---------------- tone (dark / light section) ---------------- */

const ToneCtx = createContext(false); // true = light section
export const useLight = () => useContext(ToneCtx);

/* ---------------- scroll reveal ---------------- */

export const Reveal = ({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${className}`}
        >
            {children}
        </div>
    );
};

/* ---------------- typography ---------------- */

export const Eyebrow = ({ children }: { children: React.ReactNode }) => {
    const light = useLight();
    return (
        <div
            className={`mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-tight ${light ? 'text-black/60' : 'text-white/70'
                }`}
        >
            {children}
        </div>
    );
};

/** Bold highlight inside body copy */
export const B = ({ children }: { children: React.ReactNode }) => {
    const light = useLight();
    return <strong className={`font-semibold ${light ? 'text-black' : 'text-white'}`}>{children}</strong>;
};

export const Lime = ({ children }: { children: React.ReactNode }) => {
    const light = useLight();
    return <span style={{ color: light ? LIME_DARK : LIME }}>{children}</span>;
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
    const light = useLight();
    return (
        <h2
            className={`text-4xl leading-[1.05] tracking-tighter sm:text-5xl lg:text-[56px] ${light ? 'font-normal text-[#111]' : 'font-light text-white'
                }`}
        >
            {children}
        </h2>
    );
};

/* ---------------- buttons (text-sm, padding never above 3) ---------------- */

type BtnProps = {
    href?: string;
    onClick?: () => void;
    target?: string;
    children: React.ReactNode;
};

const base = 'group inline-flex items-center gap-3 rounded-full py-1 pl-3 pr-1 text-sm font-semibold transition-colors';

const Arrow = ({ cls }: { cls: string }) => (
    <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5 ${cls}`}
    >
        <RiArrowRightLine />
    </span>
);

const BtnShell = ({
    href,
    onClick,
    target,
    className,
    children,
}: BtnProps & { className: string }) =>
    href ? (
        <Link
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className={className}
        >
            {children}
        </Link>
    ) : (
        <button type="button" onClick={onClick} className={className}>
            {children}
        </button>
    );

export const PrimaryBtn = (p: BtnProps) => (
    <BtnShell {...p} className={`${base} bg-[#C8F34D] text-black hover:bg-[#d6ff5c]`}>
        {p.children}
        <Arrow cls="bg-black text-[#C8F34D]" />
    </BtnShell>
);

export const GhostBtn = (p: BtnProps) => {
    const light = useLight();
    return (
        <BtnShell
            {...p}
            className={`${base} border ${light ? 'border-black/15 text-black hover:bg-black/5' : 'border-white/20 text-white hover:bg-white/10'
                }`}
        >
            {p.children}
            <Arrow cls={light ? 'bg-black/5' : 'bg-white/10'} />
        </BtnShell>
    );
};

/* ---------------- decorative backgrounds ---------------- */

/** Round green glow. Put one at the bottom of a section and one at the top of the next to form a single circle. */
export const Glow = ({ at }: { at: 'top' | 'bottom' }) => (
    <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 h-[600px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-[#4b5f1a]/60 blur-[130px] ${at === 'top' ? '-top-[300px]' : '-bottom-[300px]'
            }`}
    />
);

export const Rings = () => (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-72 h-[900px] w-[900px] rounded-full border border-white/[0.06]" />
        <div className="absolute -right-10 -top-56 h-[1200px] w-[1200px] rounded-full border border-white/[0.05]" />
        <div className="absolute right-24 -top-40 h-[1500px] w-[1500px] rounded-full border border-white/[0.04]" />
    </div>
);

/* ---------------- section ---------------- */

/**
 * tone  : 'dark' (default) or 'light' background
 * shade : very dark charcoal with rings (dark tone only)
 * hero  : extra top padding so content clears the floating navbar
 */
export const Section = ({
    id,
    tone = 'dark',
    shade = false,
    glowTop = false,
    hero = false,
    children,
    className = '',
}: {
    id?: string;
    tone?: 'dark' | 'light';
    shade?: boolean;
    glowTop?: boolean;
    hero?: boolean;
    children: React.ReactNode;
    className?: string;
}) => {
    const light = tone === 'light';
    const pad = hero ? 'pb-20 pt-32 md:pb-24 md:pt-36' : 'py-14 md:py-16';
    const bg = light ? 'bg-[#f1f1ee] text-[#111]' : shade ? 'bg-[#0a0b09] text-white' : 'text-white';
    return (
        <section id={id} className={`relative overflow-hidden px-5 sm:px-8 lg:px-10 ${pad} ${bg} ${className}`}>
            {shade && !light && <Rings />}
            {glowTop && <Glow at="top" />}
            <ToneCtx.Provider value={light}>
                <div className="relative z-10 mx-auto max-w-[1080px]">{children}</div>
            </ToneCtx.Provider>
        </section>
    );
};

/** Heading on the left, supporting copy on the right */
export const SectionHead = ({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: React.ReactNode;
    children: React.ReactNode;
}) => {
    const light = useLight();
    return (
        <div className="grid items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
                <H2>{title}</H2>
            </Reveal>
            <Reveal
                delay={120}
                className={`space-y-4 text-[15px] leading-relaxed ${light ? 'text-black/70' : 'text-white/75'}`}
            >
                {children}
            </Reveal>
        </div>
    );
};

/** Card with a lime top edge */
export const cardClass = (light: boolean) =>
    light
        ? 'rounded-t-[32px] rounded-b-2xl border border-t-2 border-black/5 border-t-[#8fb800] bg-white'
        : 'rounded-t-[32px] rounded-b-2xl border border-t-2 border-white/5 border-t-[#C8F34D] bg-gradient-to-b from-[#0d0d0d] to-black';

/* ---------------- modal (animated in and out) ---------------- */

/**
 * Keeps itself mounted while the closing animation plays.
 * Render the details from state that is NOT cleared on close.
 */
export const Modal = ({
    open,
    onClose,
    light = false,
    label,
    children,
}: {
    open: boolean;
    onClose: () => void;
    light?: boolean;
    label: string;
    children: React.ReactNode;
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
            const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
            return () => cancelAnimationFrame(id);
        }
        setVisible(false);
        const t = setTimeout(() => setMounted(false), 350);
        return () => clearTimeout(t);
    }, [open]);

    useEffect(() => {
        if (!mounted) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [mounted, onClose]);

    if (!mounted) return null;

    // Portal: transformed ancestors (scroll reveals) would otherwise break position: fixed
    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
        >
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <div
                className={`relative w-full max-w-3xl overflow-hidden rounded-t-3xl shadow-2xl transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-3xl ${light ? 'bg-white text-[#111]' : 'bg-[#0f100e] text-white'
                    } ${visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-12 scale-95 opacity-0'}`}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-xl transition-transform hover:scale-105 ${light ? 'bg-white/90 text-black shadow' : 'bg-black/60 text-white backdrop-blur'
                        }`}
                >
                    <RiCloseLine />
                </button>
                <div className="max-h-[90vh] overflow-y-auto">{children}</div>
            </div>
        </div>,
        document.body
    );
};