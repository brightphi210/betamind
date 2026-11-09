import type { ReactNode } from 'react';
import { GET_STARTED_URL } from '../lib/links';
import { Eyebrow, Glow, Reveal, WhiteBtn } from './UI';

export type InfoPageProps = {
    eyebrow: string;
    title: ReactNode;
    intro: ReactNode;
    audience: string;
    points: { t: string; d: string }[];
};

const InfoPage = (p: InfoPageProps) => (
    <main className="bg-black text-white">
        <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-black px-5 pb-16 pt-32 sm:px-8 md:pt-36 lg:px-10">
            <Glow at="bottom" />
            <div className="relative z-10 mx-auto w-full max-w-[1080px]">
                <Reveal>
                    <Eyebrow>{p.eyebrow}</Eyebrow>
                    <h1 className="max-w-3xl text-5xl font-light leading-[0.98] tracking-tighter sm:text-6xl lg:text-[72px]">
                        {p.title}
                    </h1>
                    <p className="mt-6 max-w-xl text-[17px] leading-snug text-white/70">{p.intro}</p>
                    <span className="mt-6 inline-block rounded-full bg-[#C8F34D]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C8F34D]">
                        {p.audience}
                    </span>
                    <div className="mt-10">
                        <WhiteBtn href={GET_STARTED_URL}>Get started</WhiteBtn>
                    </div>
                </Reveal>

                <Reveal delay={150} className="mt-14 grid gap-4 md:grid-cols-3">
                    {p.points.map((x, i) => (
                        <div key={x.t} className="rounded-3xl bg-white/[0.05] p-6">
                            <span className="text-sm font-semibold text-[#C8F34D]">0{i + 1}</span>
                            <h3 className="mt-3 text-lg font-semibold tracking-tight">{x.t}</h3>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{x.d}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    </main>
);

export default InfoPage;