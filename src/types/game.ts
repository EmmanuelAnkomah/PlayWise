export type PerformanceTier = 'low-end' | 'mid-range' | 'high-end';

export interface HardwareRequirements {
  operatingSystem: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
  directX?: string;
  additionalNotes?: string;
}

export interface Game {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  genres: string[];
  performanceCategory: PerformanceTier;
  releaseYear: number;
  rating: number; // 0.0 to 5.0
  likes: number;
  coverImage: string;
  backdropImage: string;
  screenshots: string[];
  video?: string;
  featured?: boolean;
  trending?: boolean;
  developer?: string;
  publisher?: string;
  franchise?: string;
  sizeEstimate?: string;
  badge?: string;
  status?: string;
  platform?: string;
  trendRank?: string;
  /** False keeps announced / non-PC titles out of the installable Game Vault. */
  available?: boolean;
  /** Vendor requirement text is being checked before it is presented as a specification. */
  requirementsVerified?: boolean;
  vaultSize?: 'standard' | 'wide' | 'tall';
  minimumRequirements: HardwareRequirements;
  recommendedRequirements?: HardwareRequirements;
}

export interface GenreItem {
  id: string;
  name: string;
  description: string;
  image: string;
  popularCount: number;
}

export type SortOption = 'featured' | 'newest' | 'alphabetical' | 'genre' | 'hardware';

export interface InstallationRequestPayload {
  fullName: string;
  email: string;
  whatsapp: string;
  gameTitle: string;
  gameId?: string;
  pcSpecifications: string;
  additionalMessage?: string;
}
