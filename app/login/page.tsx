import { redirect } from 'next/navigation';

// /login isn't a separate auth system — the one real login route is
// /admin/login (see middleware.ts and app/admin/login). This exists purely
// so a bookmark or muscle-memory visit to /login doesn't 404.
export default function LoginRedirectPage() {
  redirect('/admin/login');
}
