import type { Game, SortOption } from '../types/game';

export function filterAndSortGames(
  games: Game[],
  options: { search?: string; genre?: string; performance?: string; sort?: SortOption },
): Game[] {
  const search = options.search?.trim().toLowerCase();
  const filtered = games.filter((game) => {
    const matchesSearch = !search || [game.title, game.description, game.franchise ?? '', ...game.genres].join(' ').toLowerCase().includes(search);
    const matchesGenre = !options.genre || options.genre === 'all' || game.genres.includes(options.genre);
    const matchesPerformance = !options.performance || options.performance === 'all' || game.performanceCategory === options.performance;
    return matchesSearch && matchesGenre && matchesPerformance;
  });
  return [...filtered].sort((a, b) => {
    if (options.sort === 'featured') return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.releaseYear - a.releaseYear;
    if (options.sort === 'newest') return b.releaseYear - a.releaseYear;
    if (options.sort === 'alphabetical') return a.title.localeCompare(b.title);
    if (options.sort === 'genre') return gameGenre(a).localeCompare(gameGenre(b)) || a.title.localeCompare(b.title);
    if (options.sort === 'hardware') return tierWeight(a.performanceCategory) - tierWeight(b.performanceCategory) || a.title.localeCompare(b.title);
    return 0;
  });
}

const gameGenre = (game: Game) => game.genres[0] ?? '';
const tierWeight = (tier: Game['performanceCategory']) => ({ 'low-end': 0, 'mid-range': 1, 'high-end': 2 })[tier];
