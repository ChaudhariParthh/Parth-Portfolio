import { useEffect, useState } from 'react';
import { fetchRepos, Repo } from '../lib/github';
import { Github, Star, GitFork, BookOpen, Clock, Activity, Terminal, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { profile } from '../data/curated';
import { trackEvent } from '../lib/supabase';

export function LiveGitHub() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { engMode } = useStore();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    const loadRepos = async () => {
      try {
        const { data } = await fetchRepos();
        if (mounted) {
          // Filter out forks by default if needed, but our backend fetches them.
          // @ts-ignore
          const showForks = import.meta.env.VITE_SHOW_FORKS === 'true';
          const filtered = data.filter(r => showForks || !r.fork);
          setRepos(filtered);
        }
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadRepos();
    return () => { mounted = false; };
  }, []);

  const languages = Array.from(new Set(repos.map(r => r.language).filter(Boolean)));
  const topics = Array.from(new Set(repos.flatMap(r => r.topics).filter(Boolean)));

  const filteredRepos = repos.filter(r => {
    if (filter !== 'ALL' && r.language !== filter && !r.topics.includes(filter)) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.description?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);

  if (loading) {
    return (
      <section className="flex flex-col gap-8 min-h-[400px] justify-center items-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        <span className="text-sm font-mono text-text-muted animate-pulse">SYNCING GITHUB...</span>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col gap-4 min-h-[200px] justify-center items-center text-center">
        <Activity size={32} className="text-red-500/50 mb-2" />
        <h3 className="font-bold text-text-primary">Failed to load GitHub data</h3>
        <p className="text-sm text-text-secondary">{error}</p>
      </section>
    );
  }

  return (
    <section id="github" className="flex flex-col gap-12 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-mono tracking-widest text-text-muted">LIVE FROM GITHUB</h2>
        <div className="h-px flex-1 bg-border-subtle" />
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-1 p-6 rounded-2xl flex flex-col gap-2">
          <BookOpen className="text-ai mb-2" size={20} />
          <div className="text-3xl font-bold">{repos.length}</div>
          <div className="text-xs font-mono text-text-muted">ORIGINAL REPOS</div>
        </div>
        <div className="glass-1 p-6 rounded-2xl flex flex-col gap-2">
          <Star className="text-auto mb-2" size={20} />
          <div className="text-3xl font-bold">{totalStars}</div>
          <div className="text-xs font-mono text-text-muted">TOTAL STARS</div>
        </div>
        <div className="glass-1 p-6 rounded-2xl flex flex-col gap-2">
          <GitFork className="text-brand mb-2" size={20} />
          <div className="text-3xl font-bold">{totalForks}</div>
          <div className="text-xs font-mono text-text-muted">TOTAL FORKS</div>
        </div>
        <div className="glass-1 p-6 rounded-2xl flex flex-col gap-2">
          <Terminal className="text-cyber mb-2" size={20} />
          <div className="text-3xl font-bold">{languages.length}</div>
          <div className="text-xs font-mono text-text-muted">LANGUAGES</div>
        </div>
      </div>

      {/* Explorer */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-xl">Repository Explorer</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                placeholder="Search repos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 pr-8 rounded-lg bg-surface border border-border-subtle text-sm focus:outline-none focus:border-brand w-full"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1 active:scale-90 transition-all cursor-pointer"
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg bg-surface border border-border-subtle text-sm focus:outline-none focus:border-brand cursor-pointer"
            >
              <option value="ALL">All Topics & Languages</option>
              {languages.map(l => <option key={l} value={l}>{l}</option>)}
              {topics.slice(0, 10).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.slice(0, 10).map((repo) => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('repo_click', { repo_name: repo.name, language: repo.language || 'none' })}
              className="glass-1 p-6 rounded-2xl flex flex-col gap-3 group hover:glass-2 active:scale-[0.99] transition-all cursor-pointer border border-border-subtle"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Github size={18} className="text-text-muted group-hover:text-brand transition-colors" />
                  <h4 className="font-bold text-text-primary group-hover:text-brand transition-colors">{repo.name}</h4>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
                  {repo.stargazers_count > 0 && <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>}
                  {repo.forks_count > 0 && <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>}
                </div>
              </div>
              
              {repo.description && (
                <p className="text-sm text-text-secondary line-clamp-2">{repo.description}</p>
              )}

              <div className="mt-auto pt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-xs text-text-muted">
                      <span className="w-2 h-2 rounded-full bg-brand/50" />
                      {repo.language}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs font-mono text-text-muted">
                  <Clock size={12} /> {new Date(repo.updated_at).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {engMode && (
                <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border-subtle text-xs font-mono text-text-muted flex flex-col gap-1">
                  <div>ID: {repo.id}</div>
                  <div>TOPICS: {repo.topics.join(', ') || 'none'}</div>
                </div>
              )}
            </a>
          ))}
          
          {filteredRepos.length === 0 && (
            <div className="col-span-1 md:col-span-2 py-12 text-center text-text-muted font-mono text-sm">
              No repositories match the current filters.
            </div>
          )}
        </div>
        
        {filteredRepos.length > 10 && (
          <div className="text-center pt-4">
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noreferrer" 
              onClick={() => trackEvent('github_click', { location: 'live_github_view_all' })}
              className="inline-block px-6 py-3 rounded-full glass-1 text-sm font-medium hover:bg-surface-elevated active:scale-95 transition-all cursor-pointer border border-border-subtle"
            >
              VIEW ALL {repos.length} REPOSITORIES
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
