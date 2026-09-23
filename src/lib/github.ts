export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export const fetchRepos = async (): Promise<{ source: string, data: Repo[] }> => {
  const response = await fetch('/api/github/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};

export const fetchReadme = async (repoName: string): Promise<string> => {
  const response = await fetch(`/api/github/readme/${repoName}`);
  if (!response.ok) {
    throw new Error('README not found');
  }
  return response.text();
};
