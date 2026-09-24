import type { Game, SortOption } from '../types/game';

export function filterAndSortGames(
  games: Game[],
  options: { search?: string; genre?: string; performance?: string; sort?: SortOption },
): Game[] {
  const search = options.search?.trim().toLowerCase();
  const filtered = games.filter((game) => {
    const matchesSearch = !search || [game.title, game.description, ...game.genres].join(' ').toLowerCase().includes(search);
    const matchesGenre = !options.genre || options.genre === 'all' || game.genres.includes(options.genre);
    const matchesPerformance = !options.performance || options.performance === 'all' || game.performanceCategory === options.performance;
    return matchesSearch && matchesGenre && matchesPerformance;
  });
  return [...filtered].sort((a, b) => {
    if (options.sort === 'rating') return b.rating - a.rating;
    if (options.sort === 'newest') return b.releaseYear - a.releaseYear;
    if (options.sort === 'alphabetical') return a.title.localeCompare(b.title);
    return b.likes - a.likes;
  });
}
