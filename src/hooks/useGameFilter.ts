import { useMemo, useState } from 'react';
import { filterAndSortGames } from '../utils/filters';
import type { Game, SortOption } from '../types/game';

export function useGameFilter(games: Game[]) {
  const [genre, setGenre] = useState('all');
  const [performance, setPerformance] = useState('all');
  const [sort, setSort] = useState<SortOption>('popular');
  const filteredGames = useMemo(() => filterAndSortGames(games, { genre, performance, sort }), [games, genre, performance, sort]);
  return { filteredGames, genre, setGenre, performance, setPerformance, sort, setSort };
}
