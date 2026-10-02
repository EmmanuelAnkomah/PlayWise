import { games } from './games';

type LoaderImage = { src: string; alt: string; span?: 'wide' | 'tall' | 'square' | 'feature' };

const suppliedLoaderImages: LoaderImage[] = [
  { src: 'https://i.pinimg.com/1200x/29/61/c4/2961c4d649ed9695da3074bb16794a06.jpg', alt: 'Playwise featured game artwork', span: 'feature' },
  { src: 'https://i.pinimg.com/736x/0b/43/42/0b4342bfbfde4e1e7498d0539d00c13e.jpg', alt: 'Playwise game artwork' },
  { src: 'https://i.pinimg.com/736x/5d/f7/3b/5df73bd28a5715d30e7089560451ce45.jpg', alt: 'Playwise featured game artwork', span: 'feature' },
  { src: 'https://i.pinimg.com/1200x/55/43/11/554311d7b3b0b7a6e893a3fadc385cb1.jpg', alt: 'Playwise game artwork' },
];

const existingGameImages: LoaderImage[] = games.flatMap((game) => [
  { src: game.coverImage, alt: `${game.title} artwork` },
  ...game.screenshots.slice(0, 2).map((src) => ({ src, alt: `${game.title} scene` })),
]);

export const loaderGalleryImages = [...suppliedLoaderImages, ...existingGameImages];
