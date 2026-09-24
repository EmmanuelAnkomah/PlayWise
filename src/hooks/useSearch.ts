import { useMemo, useState } from 'react';
import type { Game } from '../types/game';

export function useSearch(games: Game[]) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return games;
    return games.filter((game) => `${game.title} ${game.description} ${game.genres.join(' ')}`.toLowerCase().includes(value));
  }, [games, query]);
  return { query, setQuery, results };
}
