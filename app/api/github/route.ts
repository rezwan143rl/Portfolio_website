import { NextResponse } from 'next/server';
import { getGithubProfileRepos } from '@/lib/github';

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) {
    return NextResponse.json({ error: 'GITHUB_USERNAME is not configured.' }, { status: 501 });
  }

  const repos = await getGithubProfileRepos(username);
  return NextResponse.json({ repos });
}
