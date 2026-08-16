'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'HOME' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/journey', label: 'Journey' },
  { href: '/resume', label: 'Resume' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-display text-sm font-medium tracking-wide text-text"
        >
          <img
            src="/logo.png"
            alt="Rezwan Ahmed"
            className="h-7 w-7 object-contain"
          />
          <span>REZWAN AHMED</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 font-mono text-xs uppercase tracking-wide text-muted transition-colors hover:text-text"
              >
                <span className={cn(active && 'text-signal')}>
                  {link.label}
                </span>

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

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-text md:hidden"
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav className="border-t border-border bg-bg md:hidden">
          <div className="mx-auto max-w-5xl px-6 py-3">
            {links.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block border-b border-border/50 py-3 font-mono text-xs uppercase tracking-widest transition-colors last:border-b-0',
                    active
                      ? 'text-signal'
                      : 'text-muted hover:text-text'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}