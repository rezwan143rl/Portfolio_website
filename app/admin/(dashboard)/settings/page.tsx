import { createClient } from '@/lib/supabase/server';
import { Card, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from './actions';

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const envChecks = [
    { label: 'GITHUB_USERNAME', set: !!process.env.GITHUB_USERNAME },
    { label: 'GITHUB_TOKEN', set: !!process.env.GITHUB_TOKEN },
    { label: 'NEXT_PUBLIC_SITE_URL', set: !!process.env.NEXT_PUBLIC_SITE_URL, value: process.env.NEXT_PUBLIC_SITE_URL },
  ];

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl text-text">Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Content settings (hero copy, resume) live under Homepage content and Resume — this page
        covers account and environment-level configuration instead, since there&apos;s nothing
        left in the database schema to expose here without duplicating those pages.
      </p>

      <Card className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Account</p>
        <CardDescription className="mt-2">Signed in as {user?.email ?? 'unknown'}</CardDescription>
        <form action={signOut} className="mt-4">
          <Button type="submit" variant="secondary" size="sm">Sign out</Button>
        </form>
      </Card>

      <Card className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Environment</p>
        <div className="mt-3 space-y-2">
          {envChecks.map((check) => (
            <div key={check.label} className="flex items-center justify-between text-sm">
              <span className="font-mono text-xs text-muted">{check.label}</span>
              <span className={check.set ? 'text-signal' : 'text-muted'}>
                {check.set ? (check.value ?? 'set') : 'not set'}
              </span>
            </div>
          ))}
        </div>
        <CardDescription className="mt-3">
          These are set in .env.local (or your hosting provider&apos;s environment variables), not
          from this dashboard — they configure optional features like GitHub repo display, not
          site content.
        </CardDescription>
      </Card>
    </div>
  );
}
