import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { games } from '../data/games';
import { useGameFilter } from '../hooks/useGameFilter';
import { useSearch } from '../hooks/useSearch';
import { PageContainer } from '../components/layout/PageContainer';
import { SearchBar } from '../components/filters/SearchBar';
import { FilterBar } from '../components/filters/FilterBar';
import { SortControl } from '../components/filters/SortControl';
import { GameGrid } from '../components/games/GameGrid';
import { PageHero } from '../components/layout/PageHero';

export function Explore() {
  const [params] = useSearchParams();
  const search = useSearch(games);
  const filter = useGameFilter(search.results);
  const { setGenre, setPerformance } = filter;
  useEffect(() => {
    const requestedGenre = params.get('genre');
    if (requestedGenre) setGenre(requestedGenre);
    const requestedPerformance = params.get('performance');
    if (requestedPerformance) setPerformance(requestedPerformance);
  }, [params, setGenre, setPerformance]);
  return <PageContainer><PageHero eyebrow="THE LIBRARY" title="Explore games" description="Find your next favorite from our hand-picked collection." image={games[1].backdropImage} /><div className="explore-toolbar"><SearchBar value={search.query} onChange={search.setQuery} /><FilterBar genre={filter.genre} performance={filter.performance} onGenre={filter.setGenre} onPerformance={filter.setPerformance} /><SortControl value={filter.sort} onChange={filter.setSort} /></div><p className="results-count">{filter.filteredGames.length} games found</p><GameGrid games={filter.filteredGames} /></PageContainer>;
}
