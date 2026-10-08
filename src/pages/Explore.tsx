import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { libraryGames } from '../data/games';
import { filterAndSortGames } from '../utils/filters';
import type { SortOption } from '../types/game';
import { VaultHero } from '../components/library/VaultHero';
import { VaultFilters } from '../components/library/VaultFilters';
import { VaultGameWall } from '../components/library/VaultGameWall';
import { siteConfig } from '../config/siteConfig';

export function Explore() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(params.get('genre') ?? 'all');
  const [tier, setTier] = useState(params.get('performance') ?? 'all');
  const [sort, setSort] = useState<SortOption>('alphabetical');
  const genres = useMemo(() => [...new Set(libraryGames.flatMap((game) => game.genres))].sort(), []);
  const filteredGames = useMemo(() => filterAndSortGames(libraryGames, { search: query, genre, performance: tier, sort }), [query, genre, tier, sort]);
  return <main className="vault-page">
    <VaultHero poster={siteConfig.libraryBanner} />
    <div className="vault-main">
      <section className="vault-stats" aria-label="Library statistics"><div><b>{libraryGames.length}</b><span>PC games</span></div><div><b>3</b><span>hardware tiers</span></div><div><b>{genres.length}</b><span>genres</span></div><div><b>01</b><span>PlayWise vault</span></div></section>
      <VaultFilters genre={genre} tier={tier} sort={sort} genres={genres} onGenre={setGenre} onTier={setTier} onSort={setSort} query={query} onQueryChange={setQuery} />
      <VaultGameWall games={filteredGames} />
      <section className="vault-upcoming" aria-label="More games coming soon"><span aria-hidden="true">...</span><p>More worlds are coming soon.</p></section>
      <section className="vault-request-cta"><h2>Tell us what you<br />want to <em>play.</em></h2><p>Send the title and your PC details. We’ll check what works and help you get ready.</p><Link to="/request-installation">Request a game <span>↗</span></Link></section>
    </div>
  </main>;
}
