import type { SocialLink } from '@/lib/types/database';

export function Footer({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg text-text">Let&apos;s build something.</p>
          <p className="mt-1 text-sm text-muted">
            Always open to a good problem or an interesting collaboration.
          </p>
        </div>
        <div className="flex gap-4">
          {socialLinks
            .filter((link) => link.visible)
            .map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-wide text-muted hover:text-signal"
              >
                {link.platform}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
