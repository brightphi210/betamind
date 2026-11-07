import type { ReactNode } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { GET_STARTED_URL } from '../lib/links';
import { Eyebrow, GhostBtn, Glow, PrimaryBtn, Reveal } from './UI'; // adjust path if needed

export type InfoPageProps = {
    eyebrow: string;
    title: ReactNode;
    intro: string;
    audience: string;
    stepsTitle: ReactNode;
    steps: { t: string; d: string }[];
    criteriaTitle: ReactNode;
    criteriaIntro: string;
    criteria: string[];
    perksTitle: ReactNode;
    perks: { t: string; d: string }[];
    ctaTitle: ReactNode;
    ctaText: string;
    secondary?: { label: string; href: string };
};

const Band = ({ light, children }: { light?: boolean; children: ReactNode }) => (
    <section className={`px-5 py-14 sm:px-8 md:py-16 lg:px-10 ${light ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <div className="mx-auto max-w-[1080px]">{children}</div>
    </section>
);

const InfoPage = (p: InfoPageProps) => (
    <main className="bg-black text-white">
        {/* HERO (dark) */}
        <section className="relative overflow-hidden bg-black px-5 pb-16 pt-32 sm:px-8 md:pt-36 lg:px-10">
            <Glow at="bottom" />
            <div className="relative z-10 mx-auto max-w-[1080px]">
                <Reveal>
                    <Eyebrow>{p.eyebrow}</Eyebrow>
                    <h1 className="max-w-3xl text-5xl font-light leading-[0.98] tracking-tighter sm:text-6xl lg:text-[72px]">{p.title}</h1>
                    <p className="mt-6 max-w-xl text-[17px] leading-snug text-white/80">{p.intro}</p>
                    <span className="mt-6 inline-block rounded-full border border-[#C8F34D]/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C8F34D]">
                        {p.audience}
                    </span>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <PrimaryBtn href={GET_STARTED_URL}>Get started</PrimaryBtn>
                        {p.secondary && <GhostBtn href={p.secondary.href}>{p.secondary.label}</GhostBtn>}
                    </div>
                </Reveal>
            </div>
        </section>

        {/* HOW IT WORKS (white) */}
        <Band light>
            <Reveal>
                <h2 className="max-w-2xl text-4xl font-normal leading-[1.05] tracking-tighter sm:text-5xl">{p.stepsTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {p.steps.map((s, i) => (
                    <Reveal key={s.t} delay={i * 80}>
                        <div className="h-full rounded-3xl bg-black/[0.04] p-6">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8F34D] text-sm font-semibold text-black">{i + 1}</span>
                            <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.t}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-black/70">{s.d}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Band>

        {/* CRITERIA (black) */}
        <Band>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
                <Reveal>
                    <h2 className="text-4xl font-light leading-[1.05] tracking-tighter sm:text-5xl">{p.criteriaTitle}</h2>
                    <p className="mt-5 max-w-md text-white/70">{p.criteriaIntro}</p>
                </Reveal>
                <Reveal delay={100}>
                    <ul className="space-y-3">
                        {p.criteria.map((c) => (
                            <li key={c} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-[15px] text-white/85">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C8F34D] text-xs text-black"><RiCheckLine /></span>
                                {c}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </Band>

        {/* PERKS (white) */}
        <Band light>
            <Reveal>
                <h2 className="max-w-2xl text-4xl font-normal leading-[1.05] tracking-tighter sm:text-5xl">{p.perksTitle}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
                {p.perks.map((x, i) => (
                    <Reveal key={x.t} delay={i * 80}>
                        <div className="h-full rounded-3xl border border-black/10 border-t-2 border-t-[#C8F34D] p-6">
                            <h3 className="text-xl font-semibold tracking-tight">{x.t}</h3>
                            <p className="mt-2 text-[15px] leading-relaxed text-black/70">{x.d}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Band>

        {/* CTA (black) */}
        <Band>
            <Reveal className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-light leading-[1.05] tracking-tighter sm:text-5xl">{p.ctaTitle}</h2>
                <p className="mx-auto mt-5 max-w-md text-white/80">{p.ctaText}</p>
                <div className="mt-8 flex justify-center"><PrimaryBtn href={GET_STARTED_URL}>Get started</PrimaryBtn></div>
            </Reveal>
        </Band>
    </main>
);

export default InfoPage;