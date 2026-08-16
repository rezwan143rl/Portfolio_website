interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

// Simple in-memory cache — fine for a single-instance deploy on Vercel's
// free tier. Each entry lives for 1 hour so profile/repo lookups don't
// burn through GitHub's unauthenticated (or PAT) rate limit.
const cache = new Map<string, { data: unknown; expires: number }>();
const TTL_MS = 60 * 60 * 1000;

async function githubFetch<T>(path: string): Promise<T | null> {
  const cached = cache.get(path);
  if (cached && cached.expires > Date.now()) return cached.data as T;

  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as T;
  cache.set(path, { data, expires: Date.now() + TTL_MS });
  return data;
}

export async function getGithubRepo(fullName: string): Promise<GithubRepo | null> {
  return githubFetch<GithubRepo>(`/repos/${fullName}`);
}

export async function getGithubProfileRepos(username: string): Promise<GithubRepo[]> {
  const repos = await githubFetch<GithubRepo[]>(
    `/users/${username}/repos?sort=updated&per_page=6`
  );
  return repos ?? [];
}
