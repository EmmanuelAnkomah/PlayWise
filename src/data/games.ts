import type { Game, HardwareRequirements } from '../types/game';

const req = (processor: string, memory: string, graphics: string, storage = '70 GB available space', operatingSystem = 'Windows 10 64-bit', directX = 'Version 12', additionalNotes?: string): HardwareRequirements => ({
  operatingSystem, processor, memory, graphics, storage, directX, additionalNotes,
});
const art = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
const externalArt = (url: string) => url;

const showcaseGames: Game[] = [
  {
    id: '007-first-light', title: '007 First Light', tagline: 'The world is not enough.',
    description: 'A new James Bond origin story built around cinematic action, stealth and globe-spanning espionage.',
    longDescription: 'Step into the early years of James Bond in a cinematic action adventure filled with high-stakes missions, stealth and espionage.',
    genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2026, rating: 4.7, likes: 876,
    coverImage: externalArt('https://sm.pcmag.com/pcmag_me/photo/default/6p9lgt_g4rq.jpg'), backdropImage: art('photo-1531297484001-80022131f5a1'),
    screenshots: [art('photo-1550745165-9bc0b252726f')], trending: true, developer: 'IO Interactive', sizeEstimate: 'TBA', badge: 'AVAILABLE ON PC', status: 'AVAILABLE ON PC', platform: 'PC', trendRank: '02',
    minimumRequirements: req('Intel Core i5 / AMD Ryzen 5', '16 GB RAM', 'GTX 1660 / RX 5600 XT', 'TBA', 'Windows 10/11 64-bit', 'Version 12'),
  },
  {
    id: 'forza-horizon-6', title: 'Forza Horizon 6', tagline: 'Race across Japan.',
    description: 'Open-world racing across Japan featuring 550+ real-world cars, dense urban environments, scenic countryside, customization and multiplayer.',
    longDescription: 'Open-world racing across Japan featuring 550+ real-world cars, dense urban environments, scenic countryside, car customization, multiplayer and extensive EventLab creation tools.',
    genres: ['racing', 'sports'], performanceCategory: 'high-end', releaseYear: 2026, rating: 4.8, likes: 982,
    coverImage: externalArt('https://images.squarespace-cdn.com/content/v1/5c95f8d416b640656eb7765a/1769109600663-PX9QS40SY9M4Y9JGHI7L/Forza+Horizon+6.png?format=2500w'), backdropImage: art('photo-1511994477422-b69e44bd4ea9'),
    screenshots: [art('photo-1492144534655-ae79c964c9d7')], featured: true, developer: 'Playground Games', sizeEstimate: '160 GB', badge: 'FEATURED',
    minimumRequirements: req('Intel Core i5-8400 / AMD Ryzen 5 1600', '16 GB RAM', 'NVIDIA GTX 1650 / AMD RX 6500 XT / Intel Arc A380', '~160 GB SSD required', 'Windows 10 22H2 (19045) or newer', 'Version 12', '4 GB VRAM class. Target: 1080p, Low, 60 FPS.'),
  },
  {
    id: 'the-last-of-us-part-ii-remastered', title: 'The Last of Us Part II Remastered', tagline: 'Every choice has a cost.',
    description: 'A cinematic third-person action-adventure featuring intense combat, exploration and a detailed post-apocalyptic world.',
    longDescription: 'A cinematic third-person action-adventure featuring intense combat, exploration and a detailed post-apocalyptic world. The PC version requires an SSD and 16 GB RAM even at minimum settings.',
    genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2025, rating: 4.7, likes: 1250,
    coverImage: externalArt('https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2531310/94b5d8b3165a6fe592e406054b08a2dd24e2f848/capsule_616x353.jpg?t=1750959180'), backdropImage: art('photo-1531297484001-80022131f5a'),
    screenshots: [art('photo-1560253023-3ec5d502959f'), art('photo-1612287230202-1ff1d85d1bdf')], featured: true, developer: 'Naughty Dog', publisher: 'PlayStation', sizeEstimate: '150 GB SSD', badge: 'HIGH-END',
    minimumRequirements: req('Intel Core i3-8100 / AMD Ryzen 3 1300X', '16 GB RAM', 'NVIDIA GTX 1650 4GB / AMD RX 5500 XT 4GB', '150 GB SSD', 'Windows 10/11 64-bit', 'Version 12', 'Target: 720p, Low, approximately 30 FPS.'),
    recommendedRequirements: req('Intel Core i5-8600 / Ryzen 5 3600', '16 GB RAM', 'RTX 3060 8GB / RX 5700', '150 GB SSD', 'Windows 10/11 64-bit', 'Version 12', 'Target: 1080p, Medium, approximately 60 FPS.'),
  },
  {
    id: 'gta-vi', title: 'GTA VI', tagline: 'Welcome to Vice City.',
    description: 'Return to Vice City for the next evolution of the Grand Theft Auto series.',
    longDescription: 'A new crime saga set in the neon-soaked state of Leonida, bringing the biggest and most immersive Grand Theft Auto experience yet.',
    genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2026, rating: 4.9, likes: 2400,
    coverImage: externalArt('https://i.ebayimg.com/images/g/Cv4AAeSwP19qWjJE/s-l1600.webp'), backdropImage: art('photo-1519608487953-e999c86e7455'),
    screenshots: [art('photo-1535223289827-42f1e9919769')], trending: true, developer: 'Rockstar Games', sizeEstimate: 'TBA', status: 'COMING NOVEMBER 19, 2026 · CONSOLE ONLY', trendRank: '01',
    minimumRequirements: req('TBA', 'TBA', 'TBA', 'TBA', 'TBA', 'TBA'), available: false,
  },
  {
    id: 'marvels-wolverine', title: "Marvel's Wolverine", tagline: 'The best there is.',
    description: 'A standalone Marvel action adventure starring Wolverine in a brutal, cinematic journey.',
    longDescription: 'Unleash Wolverine in a story-driven action adventure from Insomniac Games, built around visceral combat and a powerful original story.',
    genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2026, rating: 4.8, likes: 1980,
    coverImage: externalArt('https://cdn.marvel.com/content/2x/marvelswolverine_lob_crd_02.webp'), backdropImage: art('photo-1542751371-adc38448a05e'),
    screenshots: [art('photo-1550745165-9bc0b252726f')], trending: true, developer: 'Insomniac Games', sizeEstimate: 'TBA', status: 'AVAILABLE NOW', trendRank: '03',
    minimumRequirements: req('TBA', 'TBA', 'TBA', 'TBA', 'TBA', 'TBA'), available: false,
  },
  {
    id: 'resident-evil-requiem', title: 'Resident Evil Requiem', tagline: 'Survival has a new face.',
    description: 'A modern survival-horror experience combining investigation, puzzles, resource management and intense combat.',
    longDescription: 'A modern survival-horror experience combining investigation, puzzles, resource management and intense combat, with both first-person and third-person perspectives.',
    genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2026, rating: 4.8, likes: 2100,
    coverImage: externalArt('https://gamegpu.com/images/1_2026/GAMES/Resident%20Evil%20Requiem%20zheka/H6FrTeEZnENziKeUCU4FYA_upscayl_2x_upscayl-standard-4x_ggpu.webp'), backdropImage: art('photo-1550745165-9bc0b252726f'),
    screenshots: [art('photo-1603481546238-487240415921')], featured: true, developer: 'Capcom', sizeEstimate: '70 GB SSD', badge: 'HIGH-END',
    minimumRequirements: req('Intel Core i5-8500 / AMD Ryzen 5 3500', '16 GB RAM', 'NVIDIA GTX 1660 6GB / AMD RX 5500 XT 8GB', '70 GB SSD required', 'Windows 11 64-bit', 'Version 12', 'Target: 1080p output using upscaling, native 640p, approximately 30 FPS.'),
  },
  {
    id: 'forza-horizon-5', title: 'Forza Horizon 5', tagline: 'Your ultimate horizon awaits.', description: 'Race across the vibrant landscapes of Mexico in the ultimate open-world driving experience.',
    genres: ['racing', 'sports'], performanceCategory: 'mid-range', releaseYear: 2021, rating: 4.6, likes: 876,
    coverImage: art('photo-1503736334956-4c8f8e92946d'), backdropImage: art('photo-1511994477422-b69e44bd4ea9'),
    screenshots: [art('photo-1492144534655-ae79c964c9d7')], developer: 'Playground Games', sizeEstimate: '110 GB',
    minimumRequirements: req('Intel Core i5-4460 / Ryzen 3 1200', '8 GB RAM', 'GTX 970 / RX 470'),
    recommendedRequirements: req('Intel Core i5-8400 / Ryzen 5 1500X', '16 GB RAM', 'GTX 1070 / RX 590'),
  },
  {
    id: 'stardew-valley', title: 'Stardew Valley', tagline: 'A little place in the valley.', description: 'Turn an overgrown field into a thriving farm and build a life on your own terms.',
    genres: ['adventure', 'rpg'], performanceCategory: 'low-end', releaseYear: 2016, rating: 4.8, likes: 1450,
    coverImage: art('photo-1497250681960-ef046c08a56e'), backdropImage: art('photo-1500534623283-312aade485b7'),
    screenshots: [art('photo-1473445361085-b9a07f55608b')], developer: 'ConcernedApe', sizeEstimate: '500 MB',
    minimumRequirements: req('2 GHz processor', '2 GB RAM', '256 MB video memory', '500 MB available space'),
  },
  {
    id: 'baldurs-gate-3', title: "Baldur's Gate 3", tagline: 'Gather your party.', description: 'Forge a tale of fellowship and betrayal in a next-generation roleplaying adventure.',
    genres: ['rpg', 'strategy', 'adventure'], performanceCategory: 'high-end', releaseYear: 2023, rating: 4.9, likes: 1130,
    coverImage: art('photo-1518709268805-4e9042af9f23'), backdropImage: art('photo-1531297484001-80022131f5a1'),
    screenshots: [art('photo-1579373903781-fd5c0c30c4cd')], developer: 'Larian Studios', sizeEstimate: '150 GB',
    minimumRequirements: req('Intel i5-4690 / AMD FX 8350', '8 GB RAM', 'GTX 970 / RX 480'),
    recommendedRequirements: req('Intel i7-8700K / Ryzen 5 3600', '16 GB RAM', 'RTX 2060 Super / RX 5700 XT'),
  },
  {
    id: 'valorant', title: 'VALORANT', tagline: 'Creativity is your greatest weapon.', description: 'A competitive 5v5 tactical shooter where precise gunplay meets unique abilities.',
    genres: ['action', 'strategy'], performanceCategory: 'low-end', releaseYear: 2020, rating: 4.5, likes: 1890,
    coverImage: art('photo-1542751371-adc38448a05e'), backdropImage: art('photo-1550745165-9bc0b252726f'),
    screenshots: [art('photo-1603481546238-487240415921')], developer: 'Riot Games', sizeEstimate: '30 GB',
    minimumRequirements: req('Intel Core 2 Duo E8400', '4 GB RAM', 'Intel HD 4000'),
  },
  {
    id: 'cyberpunk-2077', title: 'Cyberpunk 2077', tagline: 'Become an urban legend.', description: 'Enter Night City, a megalopolis obsessed with power, glamour and body modification.',
    genres: ['action', 'rpg'], performanceCategory: 'high-end', releaseYear: 2023, rating: 4.6, likes: 998,
    coverImage: art('photo-1519608487953-e999c86e7455'), backdropImage: art('photo-1519608487953-e999c86e7455'),
    screenshots: [art('photo-1535223289827-42f1e9919769')], developer: 'CD Projekt Red', sizeEstimate: '100 GB',
    minimumRequirements: req('Core i7-6700 / Ryzen 5 1600', '12 GB RAM', 'GTX 1060 6GB / RX 580'),
    recommendedRequirements: req('Core i7-12700 / Ryzen 7 7800X3D', '16 GB RAM', 'RTX 2060 Super / RX 5700 XT'),
  },
];

type VaultInput = Pick<Game, 'id' | 'title' | 'genres' | 'performanceCategory' | 'releaseYear'> &
  Partial<Pick<Game, 'tagline' | 'developer' | 'franchise' | 'sizeEstimate' | 'vaultSize'>> & { art: string };

const pendingRequirements = (): HardwareRequirements => req(
  'Verification in progress',
  'Verification in progress',
  'Verification in progress',
  'Ask PlayWise before installation',
  'Windows PC requirements are being checked',
  undefined,
  'PlayWise will confirm the official minimum specification before installation.',
);

const vaultGame = ({ art: artwork, ...game }: VaultInput): Game => ({
  ...game,
  tagline: game.tagline ?? 'Ready when your setup is.',
  description: 'Available to request through PlayWise. Confirm your PC setup and we will guide the installation.',
  longDescription: 'This title is in the PlayWise PC collection. Share your hardware when requesting installation and we will confirm compatibility before getting started.',
  rating: 0,
  likes: 0,
  coverImage: art(artwork),
  backdropImage: art(artwork),
  screenshots: [art(artwork)],
  available: true,
  requirementsVerified: false,
  minimumRequirements: pendingRequirements(),
});

const vaultCatalog: Game[] = [
  vaultGame({ id: 'assassins-creed-black-flag', title: "Assassin's Creed IV Black Flag", genres: ['action', 'adventure', 'stealth'], performanceCategory: 'low-end', releaseYear: 2013, developer: 'Ubisoft', franchise: "Assassin's Creed", art: 'photo-1518709268805-4e9042af9f23', vaultSize: 'tall' }),
  vaultGame({ id: 'assassins-creed-origins', title: "Assassin's Creed Origins", genres: ['action', 'adventure', 'stealth'], performanceCategory: 'mid-range', releaseYear: 2017, developer: 'Ubisoft', franchise: "Assassin's Creed", art: 'photo-1531297484001-80022131f5a1', vaultSize: 'wide' }),
  vaultGame({ id: 'avatar-legends', title: 'Avatar Legends', genres: ['action', 'adventure', 'open-world'], performanceCategory: 'high-end', releaseYear: 2023, franchise: 'Avatar', art: 'photo-1446776811953-b23d57bd21aa', vaultSize: 'wide' }),
  vaultGame({ id: 'detroit-become-human', title: 'Detroit: Become Human', genres: ['adventure'], performanceCategory: 'mid-range', releaseYear: 2019, developer: 'Quantic Dream', art: 'photo-1519608487953-e999c86e7455' }),
  vaultGame({ id: 'euro-truck-simulator-2', title: 'Euro Truck Simulator 2', genres: ['simulation'], performanceCategory: 'low-end', releaseYear: 2012, developer: 'SCS Software', art: 'photo-1471479917193-f00955256257', vaultSize: 'wide' }),
  vaultGame({ id: 'fifa-19', title: 'FIFA 19', genres: ['sports'], performanceCategory: 'low-end', releaseYear: 2018, franchise: 'FIFA / FC', art: 'photo-1461896836934-ffe607ba8211' }),
  vaultGame({ id: 'fifa-22', title: 'FIFA 22', genres: ['sports'], performanceCategory: 'mid-range', releaseYear: 2021, franchise: 'FIFA / FC', art: 'photo-1518604666860-9ed391f76460', vaultSize: 'tall' }),
  vaultGame({ id: 'fc-26', title: 'EA Sports FC 26', genres: ['sports'], performanceCategory: 'mid-range', releaseYear: 2025, franchise: 'FIFA / FC', art: 'photo-1553778263-73a83bab9b0c' }),
  vaultGame({ id: 'grand-theft-auto-v', title: 'Grand Theft Auto V', genres: ['action', 'open-world'], performanceCategory: 'mid-range', releaseYear: 2015, franchise: 'Grand Theft Auto', art: 'photo-1493238792000-8113da705763', vaultSize: 'wide' }),
  vaultGame({ id: 'gta-san-andreas', title: 'GTA: San Andreas', genres: ['action', 'open-world'], performanceCategory: 'low-end', releaseYear: 2005, franchise: 'Grand Theft Auto', art: 'photo-1533473359331-0135ef1b58bf' }),
  vaultGame({ id: 'injustice-2', title: 'Injustice 2', genres: ['fighting', 'action'], performanceCategory: 'mid-range', releaseYear: 2017, developer: 'NetherRealm Studios', art: 'photo-1542751371-adc38448a05e' }),
  vaultGame({ id: 'marvels-spider-man-2', title: "Marvel's Spider-Man 2", genres: ['action', 'adventure', 'open-world'], performanceCategory: 'high-end', releaseYear: 2025, developer: 'Insomniac Games', art: 'photo-1531259683007-016a7b628fc3', vaultSize: 'tall' }),
  vaultGame({ id: 'need-for-speed-payback', title: 'Need for Speed Payback', genres: ['racing', 'open-world'], performanceCategory: 'mid-range', releaseYear: 2017, franchise: 'Need for Speed', art: 'photo-1503376780353-7e6692767b70' }),
  vaultGame({ id: 'need-for-speed-heat', title: 'Need for Speed Heat', genres: ['racing', 'open-world'], performanceCategory: 'mid-range', releaseYear: 2019, franchise: 'Need for Speed', art: 'photo-1492144534655-ae79c964c9d7', vaultSize: 'wide' }),
  vaultGame({ id: 'need-for-speed-unbound', title: 'Need for Speed Unbound', genres: ['racing', 'open-world'], performanceCategory: 'high-end', releaseYear: 2022, franchise: 'Need for Speed', art: 'photo-1504215680853-026ed2a45def' }),
  vaultGame({ id: 'pes-2013', title: 'PES 2013', genres: ['sports'], performanceCategory: 'low-end', releaseYear: 2012, franchise: 'PES', art: 'photo-1574629810360-7efbbe195018' }),
  vaultGame({ id: 'pes-2017', title: 'PES 2017', genres: ['sports'], performanceCategory: 'low-end', releaseYear: 2016, franchise: 'PES', art: 'photo-1517466787929-bc90951d0974' }),
  vaultGame({ id: 'ready-or-not', title: 'Ready or Not', genres: ['shooter', 'action'], performanceCategory: 'mid-range', releaseYear: 2023, developer: 'VOID Interactive', art: 'photo-1542751371-adc38448a05e', vaultSize: 'tall' }),
  vaultGame({ id: 'sekiro-shadows-die-twice', title: 'Sekiro: Shadows Die Twice', genres: ['action', 'adventure', 'stealth'], performanceCategory: 'mid-range', releaseYear: 2019, developer: 'FromSoftware', art: 'photo-1518709268805-4e9042af9f23' }),
  vaultGame({ id: 'sleeping-dogs', title: 'Sleeping Dogs', genres: ['action', 'open-world'], performanceCategory: 'low-end', releaseYear: 2014, developer: 'United Front Games', art: 'photo-1519608487953-e999c86e7455' }),
  vaultGame({ id: 'red-dead-redemption-2', title: 'Red Dead Redemption 2', genres: ['action', 'adventure', 'open-world'], performanceCategory: 'high-end', releaseYear: 2019, developer: 'Rockstar Games', art: 'photo-1511497584788-876760111969', vaultSize: 'wide' }),
  vaultGame({ id: 'uncharted-legacy-of-thieves', title: 'Uncharted: Legacy of Thieves', genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2022, developer: 'Naughty Dog', art: 'photo-1500534623283-312aade485b7' }),
  vaultGame({ id: 'mafia-3', title: 'Mafia III', genres: ['action', 'open-world'], performanceCategory: 'mid-range', releaseYear: 2016, developer: 'Hangar 13', art: 'photo-1518005020951-eccb494ad742' }),
  vaultGame({ id: 'black-myth-wukong', title: 'Black Myth: Wukong', genres: ['action', 'rpg'], performanceCategory: 'high-end', releaseYear: 2024, developer: 'Game Science', art: 'photo-1518709268805-4e9042af9f23', vaultSize: 'tall' }),
  vaultGame({ id: 'pragmata', title: 'Pragmata', genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2026, developer: 'Capcom', art: 'photo-1446776877081-d282a0f896e2' }),
  vaultGame({ id: 'mass-effect-3', title: 'Mass Effect 3', genres: ['action', 'rpg'], performanceCategory: 'low-end', releaseYear: 2012, developer: 'BioWare', art: 'photo-1444703686981-a3abbc4d4fe3' }),
  vaultGame({ id: 'resident-evil-5', title: 'Resident Evil 5', genres: ['action', 'horror'], performanceCategory: 'low-end', releaseYear: 2009, franchise: 'Resident Evil', art: 'photo-1511512578047-dfb367046420' }),
  vaultGame({ id: 'resident-evil-6', title: 'Resident Evil 6', genres: ['action', 'horror'], performanceCategory: 'low-end', releaseYear: 2013, franchise: 'Resident Evil', art: 'photo-1500530855697-b586d89ba3ee' }),
  vaultGame({ id: 'resident-evil-village', title: 'Resident Evil Village', genres: ['action', 'horror'], performanceCategory: 'high-end', releaseYear: 2021, franchise: 'Resident Evil', art: 'photo-1471479917193-f00955256257', vaultSize: 'wide' }),
  vaultGame({ id: 'tomb-raider', title: 'Tomb Raider', genres: ['action', 'adventure'], performanceCategory: 'low-end', releaseYear: 2013, franchise: 'Tomb Raider', art: 'photo-1469474968028-56623f02e42e' }),
  vaultGame({ id: 'shadow-of-the-tomb-raider', title: 'Shadow of the Tomb Raider', genres: ['action', 'adventure'], performanceCategory: 'mid-range', releaseYear: 2018, franchise: 'Tomb Raider', art: 'photo-1464822759023-fed622ff2c3b' }),
  vaultGame({ id: 'elden-ring', title: 'Elden Ring', genres: ['action', 'rpg', 'adventure'], performanceCategory: 'mid-range', releaseYear: 2022, developer: 'FromSoftware', art: 'photo-1518709268805-4e9042af9f23', vaultSize: 'wide' }),
  vaultGame({ id: 'god-of-war-ragnarok', title: 'God of War Ragnarök', genres: ['action', 'adventure'], performanceCategory: 'high-end', releaseYear: 2024, developer: 'Santa Monica Studio', art: 'photo-1511497584788-876760111969' }),
  vaultGame({ id: 'mad-max', title: 'Mad Max', genres: ['action', 'open-world'], performanceCategory: 'low-end', releaseYear: 2015, developer: 'Avalanche Studios', art: 'photo-1504215680853-026ed2a45def' }),
];

export const games: Game[] = [...showcaseGames, ...vaultCatalog];
