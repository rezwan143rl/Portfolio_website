'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/journey', label: 'Journey' },
  { href: '/resume', label: 'Resume' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-sm font-medium tracking-wide text-text">
          REZWAN Ahmed
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-text"
              >
                <span className={cn(active && 'text-signal')}>{link.label}</span>
                <span
                  className={cn(
                    'absolute -bottom-[1px] left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100',
                    active && 'scale-x-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
