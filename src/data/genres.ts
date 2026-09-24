import type { GenreItem } from '../types/game';

export const genres: GenreItem[] = [
  { id: 'action', name: 'Action', description: 'Fast combat, bigger moments, endless adrenaline.', image: 'https://i.pinimg.com/736x/cc/68/79/cc6879abc0e12d86018e719cc5d7bceb.jpg', popularCount: 34 },
  { id: 'adventure', name: 'Adventure', description: 'Lose yourself in worlds worth exploring.', image: 'https://i.pinimg.com/736x/04/5b/9e/045b9e505a900407008120be81d6d656.jpg', popularCount: 28 },
  { id: 'rpg', name: 'RPG', description: 'Build your legend and shape your story.', image: 'https://i.pinimg.com/736x/e9/1a/e7/e91ae77f9d35c0ab8d09827d4e8af633.jpg', popularCount: 22 },
  { id: 'strategy', name: 'Strategy', description: 'Think ahead. Outsmart everyone.', image: 'https://i.pinimg.com/1200x/b2/60/2f/b2602f7525e012a815fe7b6889dc2ed0.jpg', popularCount: 19 },
  { id: 'racing', name: 'Racing', description: 'Take the wheel and leave them behind.', image: 'https://i.pinimg.com/736x/80/69/10/8069108efa61956d1f3a367ed64579bd.jpg', popularCount: 16 },
  { id: 'sports', name: 'Sports', description: 'Compete, score and make history.', image: 'https://i.pinimg.com/236x/d2/f4/7c/d2f47c6368298e3273314bcb2968ee62.jpg', popularCount: 12 },
];
