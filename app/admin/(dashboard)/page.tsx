import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';

async function getCounts() {
  try {
    const supabase = createClient();
    const tables = [
      'projects',
      'skills',
      'achievements',
      'certifications',
      'roadmap_items',
      'journey_entries',
    ] as const;

    const results = await Promise.all(
      tables.map((table) => supabase.from(table).select('*', { count: 'exact', head: true }))
    );

    return Object.fromEntries(tables.map((table, i) => [table, results[i].count ?? 0]));
  } catch {
    return {
      projects: 0,
      skills: 0,
      achievements: 0,
      certifications: 0,
      roadmap_items: 0,
      journey_entries: 0,
    };
  }
}

const labels: Record<string, string> = {
  projects: 'Projects',
  skills: 'Skills',
  achievements: 'Achievements',
  certifications: 'Certifications',
  roadmap_items: 'Roadmap items',
  journey_entries: 'Journey entries',
};

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="font-display text-2xl text-text">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Object.entries(counts).map(([key, value]) => (
          <Card key={key}>
            <p className="font-mono text-3xl text-signal">{value}</p>
            <CardDescription className="mt-1">{labels[key]}</CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}
