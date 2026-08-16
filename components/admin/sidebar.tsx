import Link from 'next/link';

const sections = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/achievements', label: 'Achievements' },
  { href: '/admin/certifications', label: 'Certifications' },
  { href: '/admin/roadmap', label: 'Roadmap' },
  { href: '/admin/journey', label: 'Journey' },
  { href: '/admin/homepage', label: 'Homepage content' },
  { href: '/admin/social-links', label: 'Social links' },
  { href: '/admin/resume', label: 'Resume' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/settings', label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-border bg-surface p-4">
      <p className="mb-4 px-2 font-display text-sm text-text">Admin</p>
      <nav className="space-y-1">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded-md px-2 py-1.5 text-sm text-muted hover:bg-surface2 hover:text-text"
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
