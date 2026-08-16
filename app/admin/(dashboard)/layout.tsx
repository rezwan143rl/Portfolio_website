import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/admin/sidebar';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // Middleware already gates /admin, but every server-rendered admin page
  // re-checks here too — defense in depth, not reliance on one layer.
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
