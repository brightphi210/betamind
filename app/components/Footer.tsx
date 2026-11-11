import Image from 'next/image';
import Link from 'next/link';
import { RiFacebookFill, RiInstagramLine, RiLinkedinFill, RiTwitterXFill } from 'react-icons/ri';
import { GET_STARTED_URL, SOCIALS } from '../lib/links';

const socials = [
  { label: 'X', href: SOCIALS.x, Icon: RiTwitterXFill },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: RiLinkedinFill },
  { label: 'Instagram', href: SOCIALS.instagram, Icon: RiInstagramLine },
  { label: 'Facebook', href: SOCIALS.facebook, Icon: RiFacebookFill },
];

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Explore Events', href: '/events' },
      { label: 'Find Mentors', href: '/become-a-mentor' },
      { label: 'Digital Products', href: '/digital-products' },
      { label: 'Host an Event', href: '/events' },
      { label: 'Become a Mentor', href: '/become-a-mentor' },
    ],
  },
  {
    title: 'Betamind',
    links: [
      { label: 'About Betamind', href: '/about' },
      { label: 'Contact and Support', href: '/support' },
      { label: 'Get started', href: GET_STARTED_URL },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Help & support', href: '/support' },
    ],
  },
];

const linkClass = 'text-sm text-white/80 transition-colors hover:text-[#C8F34D]';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/assets/betamindlogo.png"
                alt="Betamind logo"
                width={120}
                height={32}
                unoptimized
                className="h-auto w-[120px] object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-white/70">
              Where curiosity meets opportunity. Discover people, experiences, and resources that move you forward.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-lg text-[#C8F34D] transition-colors hover:bg-white/10"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-5 text-[11px] font-medium uppercase tracking-wider text-white/40">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('http') ? (
                        <a href={l.href} className={linkClass}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={linkClass}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/70 sm:flex-row sm:items-center">
          <p className="uppercase">© {new Date().getFullYear()} Betamind</p>
          <p className="uppercase">Made for curious minds</p>
        </div>
      </div>

      {/* Giant watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.06]"
      >
        BETAMIND
      </div>
    </footer>
  );
};

export default Footer;