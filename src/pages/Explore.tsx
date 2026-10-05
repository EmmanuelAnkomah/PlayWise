import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { games } from '../data/games';
import { filterAndSortGames } from '../utils/filters';
import type { SortOption } from '../types/game';
import { VaultHero } from '../components/library/VaultHero';
import { VaultFilters } from '../components/library/VaultFilters';
import { VaultGameWall } from '../components/library/VaultGameWall';

export function Explore() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState(params.get('genre') ?? 'all');
  const [tier, setTier] = useState('all');
  const [sort, setSort] = useState<SortOption>('alphabetical');
  const libraryGames = useMemo(() => games.filter((game) => game.available !== false), []);
  const genres = useMemo(() => [...new Set(libraryGames.flatMap((game) => game.genres))].sort(), [libraryGames]);
  const filteredGames = useMemo(() => filterAndSortGames(libraryGames, { search: query, genre, performance: tier, sort }), [libraryGames, query, genre, tier, sort]);
  const poster = 'https://i.pinimg.com/1200x/41/99/c6/4199c60f73a83a9da167527286004f25.jpg';

  return <main className="vault-page">
    <VaultHero query={query} onQueryChange={setQuery} poster={poster} />
    <div className="vault-main">
      <section className="vault-stats" aria-label="Library statistics"><div><b>{libraryGames.length}</b><span>PC games</span></div><div><b>3</b><span>hardware tiers</span></div><div><b>{genres.length}</b><span>genres</span></div><div><b>01</b><span>PlayWise vault</span></div></section>
      <VaultFilters genre={genre} tier={tier} sort={sort} genres={genres} onGenre={setGenre} onTier={setTier} onSort={setSort} />
      <VaultGameWall games={filteredGames} />
      <section className="vault-upcoming" aria-label="More games coming soon"><span aria-hidden="true">...</span><p>More worlds are coming soon.</p></section>
      <section className="vault-request-cta"><h2>Tell us what you<br />want to <em>play.</em></h2><p>Send the title and your PC details. We’ll check what works and help you get ready.</p><Link to="/request-installation">Request a game <span>↗</span></Link></section>
    </div>
  </main>;
}
