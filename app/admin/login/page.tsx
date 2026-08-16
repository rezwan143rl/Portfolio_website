import { LoginForm } from '@/components/admin/login-form';

export const metadata = { title: 'Admin sign in' };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Admin</p>
        <h1 className="mt-2 font-display text-xl text-text">Sign in</h1>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
