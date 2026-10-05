import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { games } from '../data/games';
import { Button } from '../components/ui/Button';
import { GameGallery } from '../components/games/GameGallery';
import { HardwareRequirements } from '../components/games/HardwareRequirements';
import { PageContainer } from '../components/layout/PageContainer';

type FeaturedDetails = {
  about: string;
  screenshots: string[];
  heroImage?: string;
  minimum: Parameters<typeof HardwareRequirements>[0]['requirements'];
  recommended: Parameters<typeof HardwareRequirements>[0]['requirements'];
};

const requirements = (processor: string, memory: string, graphics: string, storage: string, operatingSystem: string, additionalNotes: string) => ({ processor, memory, graphics, storage, operatingSystem, directX: 'DirectX 12', additionalNotes });

const featuredDetails: Record<string, FeaturedDetails> = {
  'forza-horizon-6': {
    about: 'Forza Horizon 6 moves the festival to Japan, connecting neon city streets, countryside roads, mountain passes and coastal highways in one open-world racing experience. Build a garage of more than 550 cars, explore solo or with friends, and create events through the expanded EventLab.',
    heroImage: 'https://i.pinimg.com/1200x/76/ca/bf/76cabf17de89a4aec5d88ae8e83eee4e.jpg',
    screenshots: ['https://i.pinimg.com/1200x/76/ca/bf/76cabf17de89a4aec5d88ae8e83eee4e.jpg', 'https://i.pinimg.com/736x/67/57/88/6757880ed48e4b9ce698e77ec0c688eb.jpg', 'https://i.pinimg.com/1200x/01/7a/e3/017ae390bfb9f1a51727877ecaf2dad1.jpg'],
    minimum: requirements('Intel Core i5-8400 / AMD Ryzen 5 2600', '8 GB RAM', 'GTX 1660 / RX 590 / Intel Arc A580', '160 GB SSD', 'Windows 10/11 64-bit', '1080p, Low preset, 60 FPS.'),
    recommended: requirements('Intel Core i5-12600K / AMD Ryzen 7 5800X', '16 GB RAM', 'RTX 3070 / RX 6800 XT', '160 GB SSD', 'Windows 10/11 64-bit', '1440p, High preset.'),
  },
  'the-last-of-us-part-ii-remastered': {
    about: 'The Last of Us Part II Remastered is a cinematic survival story about Ellie and Abby, rebuilt for PC with improved detail, scalable graphics and a complete suite of accessibility options. Alongside the campaign, No Return adds a replayable roguelike mode with new characters, maps and encounters.',
    heroImage: 'https://i.pinimg.com/1200x/2d/37/a9/2d37a9616013975db39e512698526ec4.jpg',
    screenshots: ['https://i.pinimg.com/736x/ab/ad/2e/abad2e893bda15f9ca80512dbc4e4325.jpg', 'https://i.pinimg.com/1200x/b3/fd/ac/b3fdac4cdd7012a034f60411537b61a2.jpg', 'https://i.pinimg.com/736x/84/c5/77/84c5779a8b736f9f28a62c50627b653d.jpg'],
    minimum: requirements('Intel Core i3-8100 / AMD Ryzen 3 1300X', '16 GB RAM', 'GTX 1650 4GB / RX 5500 XT 4GB', '150 GB SSD', 'Windows 10/11 64-bit', '720p, Low preset, 30 FPS.'),
    recommended: requirements('Intel Core i5-8600 / Ryzen 5 3600', '16 GB RAM', 'RTX 3060 8GB / RX 5700', '150 GB SSD', 'Windows 10/11 64-bit', '1080p, Medium preset, 60 FPS.'),
  },
  'resident-evil-requiem': {
    about: 'Resident Evil Requiem returns the series to survival horror with an emotional story, two protagonists and a shifting perspective between first-person and third-person play. Investigate oppressive environments, manage resources and survive adaptive enemies rendered with advanced lighting and detail.',
    heroImage: 'https://i.pinimg.com/736x/56/69/96/566996afe9c3e437bfd7a5bed99c1529.jpg',
    screenshots: ['https://i.pinimg.com/1200x/3b/fd/fa/3bfdfaa61f579288d84f0272bde12d53.jpg', 'https://i.pinimg.com/736x/0a/ed/f6/0aedf6b3555ff702f0f15c6297858109.jpg', 'https://i.pinimg.com/736x/b2/14/f3/b214f374164417515282cbb027b79225.jpg'],
    minimum: requirements('Intel Core i5-8500 / AMD Ryzen 5 3500', '16 GB RAM', 'GTX 1660 6GB / RX 5500 XT 8GB', '50 GB available space', 'Windows 11 64-bit', '1080p output using upscaling, approximately 30 FPS.'),
    recommended: requirements('Intel Core i7-8700 / AMD Ryzen 5 5500', '16 GB RAM', 'RTX 2060 Super 8GB / RX 6600 8GB', '50 GB available space', 'Windows 11 64-bit', 'Higher visual quality with stable performance.'),
  },
};

const suppliedGameArt: Record<string, { heroImage: string; screenshots: string[] }> = {
  '007-first-light': { heroImage: 'https://sm.pcmag.com/pcmag_me/photo/default/6p9lgt_g4rq.jpg', screenshots: ['https://i.pinimg.com/736x/e2/a0/d5/e2a0d5479b60c30aee29868fb99c0a9c.jpg', 'https://i.pinimg.com/1200x/7a/9a/08/7a9a089a0836454cd18cfccb9f004d62.jpg', 'https://i.pinimg.com/736x/4f/9c/c0/4f9cc0c1c41ef4acf95437506ce190e3.jpg'] },
  'detroit-become-human': { heroImage: 'https://i.pinimg.com/1200x/5d/95/d4/5d95d4a8c995753c8609cf5fdcba90d5.jpg', screenshots: ['https://i.pinimg.com/1200x/5d/95/d4/5d95d4a8c995753c8609cf5fdcba90d5.jpg', 'https://i.pinimg.com/736x/c8/0a/25/c80a25fe550c13a1c0066f275308dd6f.jpg', 'https://i.pinimg.com/1200x/22/ee/69/22ee69cc4c1e802bdb1ea629451ec4f5.jpg'] },
  'fc-26': { heroImage: 'https://i.pinimg.com/1200x/9f/3b/31/9f3b317ff6320beb95effc0b70def4ec.jpg', screenshots: ['https://i.pinimg.com/1200x/9f/3b/31/9f3b317ff6320beb95effc0b70def4ec.jpg', 'https://i.pinimg.com/736x/9d/16/03/9d16036ae56745e24bd491fc363a14c4.jpg', 'https://i.pinimg.com/1200x/7a/ec/1d/7aec1d9b6cdb9cd499c9348640e476b4.jpg'] },
  'elden-ring': { heroImage: 'https://i.pinimg.com/1200x/62/5f/7f/625f7f79affd5737a024f36d6e9611e4.jpg', screenshots: ['https://i.pinimg.com/1200x/62/5f/7f/625f7f79affd5737a024f36d6e9611e4.jpg', 'https://i.pinimg.com/736x/a2/a1/22/a2a122c4001772bfa128445cc71db4e9.jpg', 'https://i.pinimg.com/736x/40/76/a2/4076a2dde4ba7346c402b48c833dbbc8.jpg'] },
  'euro-truck-simulator-2': { heroImage: 'https://i.pinimg.com/1200x/62/fa/9e/62fa9e02b19e3f84006dd20c5784fb78.jpg', screenshots: ['https://i.pinimg.com/1200x/62/fa/9e/62fa9e02b19e3f84006dd20c5784fb78.jpg', 'https://i.pinimg.com/736x/aa/d2/e5/aad2e554e2675c1b7e20ba9fa2fa61f3.jpg', 'https://i.pinimg.com/1200x/39/2a/a9/392aa9ad626d4571428d2fb2b533ee5e.jpg'] },
  'fifa-19': { heroImage: 'https://i.pinimg.com/1200x/b2/d0/4e/b2d04e71d789ebf8560661e95a105962.jpg', screenshots: ['https://i.pinimg.com/1200x/b2/d0/4e/b2d04e71d789ebf8560661e95a105962.jpg', 'https://i.pinimg.com/1200x/df/30/fd/df30fd6c01277531f9ba69e0bbe6e7f5.jpg', 'https://i.pinimg.com/1200x/66/e7/aa/66e7aafacf455a01e759248639437268.jpg'] },
  'fifa-22': { heroImage: 'https://i.pinimg.com/1200x/e4/74/1c/e4741c114f1c7277de8976842f109dab.jpg', screenshots: ['https://i.pinimg.com/1200x/e4/74/1c/e4741c114f1c7277de8976842f109dab.jpg', 'https://i.pinimg.com/736x/01/1f/ae/011faee4d22eae112c1325a719fb13ec.jpg', 'https://i.pinimg.com/1200x/19/3d/e1/193de1af556fb29ad984a5a1dd92361d.jpg'] },
  'forza-horizon-5': { heroImage: 'https://i.pinimg.com/1200x/21/89/bd/2189bd41f47748ffed2beae70d1e6f3c.jpg', screenshots: ['https://i.pinimg.com/1200x/21/89/bd/2189bd41f47748ffed2beae70d1e6f3c.jpg', 'https://i.pinimg.com/1200x/e0/21/af/e021affa213161e02ff80afe1fa13585.jpg', 'https://i.pinimg.com/736x/1d/db/d1/1ddbd1b576be145f27e29c1afc1aebe3.jpg'] },
  'ghost-of-tsushima': { heroImage: 'https://i.pinimg.com/1200x/30/ac/48/30ac487bc98bb07fbb4abb4feca4a8d4.jpg', screenshots: ['https://i.pinimg.com/1200x/30/ac/48/30ac487bc98bb07fbb4abb4feca4a8d4.jpg', 'https://i.pinimg.com/1200x/63/67/07/636707b29c634787b8f4d4403cf03686.jpg', 'https://i.pinimg.com/1200x/08/5c/ac/085cac17fa8c63bb96b4907a2dc45f49.jpg'] },
  'god-of-war-ragnarok': { heroImage: 'https://i.pinimg.com/736x/4d/ab/98/4dab983a2ef6ee76c36f1412346532cb.jpg', screenshots: ['https://i.pinimg.com/736x/4d/ab/98/4dab983a2ef6ee76c36f1412346532cb.jpg', 'https://i.pinimg.com/1200x/83/ef/90/83ef90d84d84aad870c0a5a585dc1f5e.jpg', 'https://i.pinimg.com/1200x/db/59/03/db5903f8ee6ee6f62810032b2da9bcfd.jpg'] },
  'grand-theft-auto-v': { heroImage: 'https://i.pinimg.com/1200x/55/1b/4c/551b4cbacead52d6f04619fc11ca727f.jpg', screenshots: ['https://i.pinimg.com/1200x/55/1b/4c/551b4cbacead52d6f04619fc11ca727f.jpg', 'https://i.pinimg.com/1200x/7f/d7/c3/7fd7c3cd2815c8c2d9bc0caaa22056c6.jpg', 'https://i.pinimg.com/736x/d6/29/31/d629315be421580cd958417065941d07.jpg'] },
  'gta-san-andreas': { heroImage: 'https://i.pinimg.com/736x/cc/15/8f/cc158fbf8bf41fe149161162c039d6a4.jpg', screenshots: ['https://i.pinimg.com/736x/cc/15/8f/cc158fbf8bf41fe149161162c039d6a4.jpg', 'https://i.pinimg.com/1200x/81/5c/62/815c62fa8e4fe8404a7ae60c3e3d1a02.jpg', 'https://i.pinimg.com/736x/4c/ba/87/4cba875f6fd6e8d15ce1bb7a30952b34.jpg'] },
  'injustice-2': { heroImage: 'https://i.pinimg.com/1200x/b7/a7/88/b7a788f90e338053880020b7749a2177.jpg', screenshots: ['https://i.pinimg.com/1200x/b7/a7/88/b7a788f90e338053880020b7749a2177.jpg', 'https://i.pinimg.com/1200x/3a/e4/73/3ae473744fb7fac7094ee0f34840b5b2.jpg', 'https://i.pinimg.com/1200x/58/87/c1/5887c19acabd606387baa813a544c556.jpg'] },
  'injustice-gods-among-us': { heroImage: 'https://i.pinimg.com/1200x/a9/85/d0/a985d02ad74c3d207810e402a112faee.jpg', screenshots: ['https://i.pinimg.com/1200x/a9/85/d0/a985d02ad74c3d207810e402a112faee.jpg', 'https://i.pinimg.com/1200x/f8/a1/ff/f8a1ff45b2aeedefd8455897c1064cc4.jpg', 'https://i.pinimg.com/736x/fe/2b/e1/fe2be14d02607210366080c61ddc1376.jpg'] },
  'mad-max': { heroImage: 'https://i.pinimg.com/1200x/f7/9e/df/f79edf603a52b7a4483872f5a3def226.jpg', screenshots: ['https://i.pinimg.com/1200x/f7/9e/df/f79edf603a52b7a4483872f5a3def226.jpg', 'https://i.pinimg.com/1200x/15/67/45/1567459816bde8debf40d890c3fd2db0.jpg', 'https://i.pinimg.com/1200x/2d/2d/58/2d2d583a95e3ad472ee92ae113a75d94.jpg'] },
  'mafia-3': { heroImage: 'https://i.pinimg.com/1200x/0c/ac/1f/0cac1ff2f45bd231850c9263e33c54a3.jpg', screenshots: ['https://i.pinimg.com/1200x/0c/ac/1f/0cac1ff2f45bd231850c9263e33c54a3.jpg', 'https://i.pinimg.com/736x/5f/a4/22/5fa4224a7ebc3bf686096f05ac9f740e.jpg', 'https://i.pinimg.com/1200x/41/25/dc/4125dc926f0367d1a6147ac4a2344e65.jpg'] },
  'mafia-the-old-country': { heroImage: 'https://i.pinimg.com/1200x/69/54/e0/6954e0703599a231607320c99253431e.jpg', screenshots: ['https://i.pinimg.com/1200x/69/54/e0/6954e0703599a231607320c99253431e.jpg', 'https://i.pinimg.com/736x/ce/0b/fb/ce0bfb7c3ccc086254ee56a02421135c.jpg', 'https://i.pinimg.com/736x/23/cf/e5/23cfe596fbf573c283f03c3f38105642.jpg'] },
  'marvels-spider-man-2': { heroImage: 'https://i.pinimg.com/1200x/07/9f/b0/079fb02521e0091a6afe93ddbeb1d28d.jpg', screenshots: ['https://i.pinimg.com/1200x/07/9f/b0/079fb02521e0091a6afe93ddbeb1d28d.jpg', 'https://i.pinimg.com/736x/69/67/f0/6967f03756633ca15c14b7a04edf23da.jpg', 'https://i.pinimg.com/1200x/39/e4/07/39e4072d695520f799a50514b5e4c1b8.jpg'] },
  'mass-effect-3': { heroImage: 'https://i.pinimg.com/736x/4f/0f/9c/4f0f9cedba0424e026ffc72d7380e81d.jpg', screenshots: ['https://i.pinimg.com/736x/4f/0f/9c/4f0f9cedba0424e026ffc72d7380e81d.jpg', 'https://i.pinimg.com/736x/57/c1/71/57c171b8fd242ca1d6ced472250b3ef4.jpg', 'https://i.pinimg.com/736x/ab/65/0e/ab650e31392b6d0a0811625446aa374a.jpg'] },
  'mortal-kombat-1': { heroImage: 'https://i.pinimg.com/1200x/1b/05/83/1b058322934d9de5aefb18690a851f96.jpg', screenshots: ['https://i.pinimg.com/1200x/1b/05/83/1b058322934d9de5aefb18690a851f96.jpg', 'https://i.pinimg.com/736x/c3/67/f8/c367f886933506d8ab459681733c3f35.jpg', 'https://i.pinimg.com/736x/86/d4/3a/86d43a035d2783ab0b088fe59d12e3fd.jpg'] },
};

const researchedGameArt: Record<string, { heroImage: string; screenshots: string[] }> = {
  'need-for-speed-heat': { heroImage: 'https://i.pinimg.com/originals/7e/90/66/7e90663b6c4eef8bdaa848e52dd9409e.jpg', screenshots: ['https://i.pinimg.com/originals/7e/90/66/7e90663b6c4eef8bdaa848e52dd9409e.jpg', 'https://i.pinimg.com/originals/7e/90/66/7e90663b6c4eef8bdaa848e52dd9409e.jpg', 'https://i.pinimg.com/originals/7e/90/66/7e90663b6c4eef8bdaa848e52dd9409e.jpg'] },
  'need-for-speed-payback': { heroImage: 'https://i.pinimg.com/originals/87/6d/0a/876d0aef4e9fd965c9cf349d928fd19b.jpg', screenshots: ['https://i.pinimg.com/originals/87/6d/0a/876d0aef4e9fd965c9cf349d928fd19b.jpg', 'https://i.pinimg.com/originals/66/a3/29/66a329f172d90a18d32710232597846f.png', 'https://i.pinimg.com/originals/87/6d/0a/876d0aef4e9fd965c9cf349d928fd19b.jpg'] },
  'need-for-speed-rivals': { heroImage: 'https://i.pinimg.com/originals/90/0e/ab/900eab3062a3f85da37d7c0122ab864a.jpg', screenshots: ['https://i.pinimg.com/originals/90/0e/ab/900eab3062a3f85da37d7c0122ab864a.jpg', 'https://i.pinimg.com/originals/90/0e/ab/900eab3062a3f85da37d7c0122ab864a.jpg', 'https://i.pinimg.com/originals/90/0e/ab/900eab3062a3f85da37d7c0122ab864a.jpg'] },
  'red-dead-redemption-2': { heroImage: 'https://i.pinimg.com/originals/fa/90/38/fa9038d4f8e84c7d4a7f9656d6895bf3.jpg', screenshots: ['https://i.pinimg.com/originals/fa/90/38/fa9038d4f8e84c7d4a7f9656d6895bf3.jpg', 'https://i.pinimg.com/originals/2d/45/0c/2d450c19e7a1e647fa868daaa6adad9b.jpg', 'https://i.pinimg.com/originals/fa/90/38/fa9038d4f8e84c7d4a7f9656d6895bf3.jpg'] },
};

const libraryDetailOverrides: Record<string, Pick<FeaturedDetails, 'about' | 'heroImage' | 'screenshots'>> = {
  'detroit-become-human': {
    about: 'Detroit: Become Human is a choice-driven narrative adventure set in a near-future Detroit where androids are becoming part of everyday life. Follow three android protagonists as their decisions shape personal relationships, public unrest and the future of both humans and machines.',
    heroImage: 'https://i.pinimg.com/1200x/5d/95/d4/5d95d4a8c995753c8609cf5fdcba90d5.jpg',
    screenshots: ['https://i.pinimg.com/1200x/5d/95/d4/5d95d4a8c995753c8609cf5fdcba90d5.jpg', 'https://i.pinimg.com/736x/c8/0a/25/c80a25fe550c13a1c0066f275308dd6f.jpg', 'https://i.pinimg.com/1200x/22/ee/69/22ee69cc4c1e802bdb1ea629451ec4f5.jpg'],
  },
  'assassins-creed-black-flag': {
    about: 'Assassin’s Creed IV Black Flag follows Edward Kenway, a daring pirate drawn into the ancient conflict between Assassins and Templars. Sail the Caribbean, raid rival ships, explore vibrant islands and build a reputation during the golden age of piracy.',
    heroImage: 'https://i.pinimg.com/1200x/3d/55/9b/3d559b34171a3408f1e4ca01efc01c9c.jpg',
    screenshots: ['https://i.pinimg.com/1200x/3d/55/9b/3d559b34171a3408f1e4ca01efc01c9c.jpg', 'https://i.pinimg.com/1200x/c4/85/ca/c485ca2c26ecb5d061998aafdcc22923.jpg', 'https://i.pinimg.com/1200x/a8/87/7c/a8877c9099f652832fe3d62ed6b80f83.jpg'],
  },
  'assassins-creed-origins': {
    about: 'Assassin’s Creed Origins explores the birth of the Brotherhood through Bayek of Siwa, a Medjay protecting his people in ancient Egypt. Investigate conspiracies, uncover forgotten tombs and travel across a living world shaped by history.',
    heroImage: 'https://i.pinimg.com/1200x/3f/f0/ac/3ff0acfdd667bc8312a4b44276250543.jpg',
    screenshots: ['https://i.pinimg.com/1200x/3f/f0/ac/3ff0acfdd667bc8312a4b44276250543.jpg', 'https://i.pinimg.com/736x/29/53/b9/2953b951267f34d982fe9c6dd9c9e833.jpg', 'https://i.pinimg.com/736x/f9/70/1d/f9701db8be2119210271fc0b949f9deb.jpg'],
  },
  'avatar-legends': {
    about: 'Avatar Legends is an action adventure set in a world of elemental powers, rival factions and wide-open exploration. Master abilities, face dangerous encounters and shape your journey across a fantastical landscape.',
    heroImage: 'https://i.pinimg.com/1200x/83/0e/4f/830e4f0356a90b3bf853c4a7b4e3ec50.jpg',
    screenshots: ['https://i.pinimg.com/1200x/83/0e/4f/830e4f0356a90b3bf853c4a7b4e3ec50.jpg', 'https://i.pinimg.com/736x/4b/ff/b0/4bffb0803e95c86b97d095e98366cccf.jpg', 'https://i.pinimg.com/736x/23/cb/f2/23cbf233a61bf7affcce7272f1308cf1.jpg'],
  },
  'baldurs-gate-3': {
    about: 'Baldur’s Gate 3 is a party-based role-playing adventure where every decision can change the story. Gather companions, explore the Forgotten Realms, master turn-based combat and decide who you become through freedom-driven choices.',
    heroImage: 'https://i.pinimg.com/1200x/7c/6b/67/7c6b67fddbef9c4127efc3bd409cd425.jpg',
    screenshots: ['https://i.pinimg.com/1200x/7c/6b/67/7c6b67fddbef9c4127efc3bd409cd425.jpg', 'https://i.pinimg.com/1200x/d0/7a/63/d07a63212f1d5ed48a631cae9b87e00d.jpg', 'https://i.pinimg.com/736x/59/4a/05/594a05015a3a16e22a2375a8695b23d8.jpg'],
  },
  'black-myth-wukong': {
    about: 'Black Myth: Wukong is an action RPG inspired by the legend of the Monkey King. Fight through mythic forests and ruined kingdoms, learn powerful transformations and uncover a richly reimagined Chinese folklore.',
    heroImage: 'https://i.pinimg.com/1200x/2c/8d/23/2c8d2343f6d59871c2a511bc156da51c.jpg',
    screenshots: ['https://i.pinimg.com/1200x/2c/8d/23/2c8d2343f6d59871c2a511bc156da51c.jpg', 'https://i.pinimg.com/736x/ab/56/60/ab5660bd80e04c7fa3baf6901c5d5820.jpg', 'https://i.pinimg.com/736x/f4/46/6a/f4466aaebdee7b98da99d41b6526d2c1.jpg'],
  },
  'cyberpunk-2077': {
    about: 'Cyberpunk 2077 takes place in Night City, a sprawling metropolis driven by power, glamour and body modification. Play as V, build a personal identity through cyberware and choices, and uncover a conspiracy that reaches the city’s highest levels.',
    heroImage: 'https://i.pinimg.com/1200x/99/87/65/9987656f57e5c250f9d2f72fef18e56d.jpg',
    screenshots: ['https://i.pinimg.com/1200x/99/87/65/9987656f57e5c250f9d2f72fef18e56d.jpg', 'https://i.pinimg.com/1200x/23/be/e2/23bee27b1f115afee0f1900b50e5ee07.jpg', 'https://i.pinimg.com/736x/c7/99/f3/c799f3f8c478f0436fd723bf7312a31b.jpg'],
  },
  'days-gone': {
    about: 'Days Gone follows Deacon St. John, a drifter and former outlaw biker surviving in a post-pandemic Oregon. Ride through dangerous wilderness, evade massive Freaker hordes and follow Deacon’s search for signs that his wife may still be alive.',
    heroImage: 'https://i.pinimg.com/1200x/b1/cc/ca/b1ccca791c2a3e3261776d474f0848c3.jpg',
    screenshots: ['https://i.pinimg.com/1200x/b1/cc/ca/b1ccca791c2a3e3261776d474f0848c3.jpg', 'https://i.pinimg.com/736x/e5/19/30/e5193049f59391dcf7c945233327631f.jpg', 'https://i.pinimg.com/1200x/f1/ac/81/f1ac81cf6dfd0a7a0ebfa8a53a0f3cb6.jpg'],
  },
};

const researchedAbout: Record<string, string> = {
  'fifa-19': 'FIFA 19 is a football simulation built around authentic clubs, players and competitions, with match-day presentation, squad management and multiple ways to take a team from kickoff to silverware.',
  'fifa-22': 'FIFA 22 combines club football, international competition and street-inspired VOLTA play with an expanded career mode, Ultimate Team squad building and more responsive match movement.',
  'fc-26': 'EA Sports FC 26 is a football simulation focused on authentic competitions, club squads, career progression, online seasons and competitive Ultimate Team matches.',
  'forza-horizon-5': 'Forza Horizon 5 moves the festival to Mexico, connecting deserts, jungles, cities and coastlines in a free-roaming racing world filled with hundreds of cars, events and customization.',
  'god-of-war-ragnarok': 'God of War Ragnarök follows Kratos and Atreus through the Norse realms as prophecy, family and the approaching Fimbulwinter force them into conflict with gods and monsters.',
  'gta-san-andreas': 'Grand Theft Auto: San Andreas follows Carl “CJ” Johnson back to Los Santos, where he rebuilds his crew, crosses a changing state and confronts betrayal, corruption and rival gangs.',
  'injustice-2': 'Injustice 2 is a cinematic fighting game where DC heroes and villains clash through a story campaign, character abilities, gear customization and competitive one-on-one battles.',
  'mafia-3': 'Mafia III follows Lincoln Clay as he builds a new criminal empire in 1968 New Bordeaux, taking on the Mafia through territory control, alliances, driving and brutal close-quarters combat.',
  'mafia-the-old-country': 'Mafia: The Old Country explores the origins of organized crime in 1900s Sicily, following a dangerous rise through a tightly written underworld story shaped by loyalty, family and violence.',
  'marvels-spider-man-2': 'Marvel’s Spider-Man 2 brings Peter Parker and Miles Morales together in a larger New York adventure featuring fluid web-swinging, dual-hero combat and threats from Kraven and Venom.',
  'mass-effect-3': 'Mass Effect 3 follows Commander Shepard as the Reaper invasion reaches every corner of the galaxy. Build alliances, make irreversible choices and lead a desperate final campaign to save civilization.',
  'mortal-kombat-1': 'Mortal Kombat 1 begins a reborn timeline shaped by Liu Kang, pairing a story-driven campaign with brutal fighting, Kameo partners and a roster of classic warriors reimagined for a new era.',
  'wwe-2k26': 'WWE 2K26 brings wrestling’s spectacle to the ring through story-driven matches, create-a-wrestler tools, exhibition modes, roster rivalries and online competition.',
  'euro-truck-simulator-2': 'Euro Truck Simulator 2 turns long-haul driving across Europe into a slow-burn progression journey. Build a transport company, customize trucks, plan routes and deliver cargo through changing cities and weather.',
  'gta-vi': 'Grand Theft Auto VI follows Jason and Lucia through a crime story set across Leonida, a fictional state of neon coastlines, waterways and rural communities surrounding Vice City.',
  'marvels-wolverine': 'Marvel’s Wolverine is a single-player action adventure from Insomniac Games starring Logan. Its mature story and close-quarters combat explore the violence, healing and isolation behind the iconic hero.',
  'nba-2k27': 'NBA 2K27 is a basketball simulation built around licensed teams, players, competitive matches, career progression and online play across a full season of hoops.',
  'need-for-speed-heat': 'Need for Speed Heat takes place in Palm City, where daytime sanctioned races earn cash and nighttime street runs build reputation while police pressure escalates.',
  'need-for-speed-payback': 'Need for Speed Payback follows three drivers in Fortune Valley as they reunite to take down The House, a cartel controlling the city’s racing, gambling and criminal networks.',
  'need-for-speed-rivals': 'Need for Speed Rivals pits racers and police against each other across Redview County, combining exotic cars, escalating pursuits and a risk-reward system built around Speedpoints.',
  'need-for-speed-unbound': 'Need for Speed Unbound places street racers in Lakeshore, blending realistic cars and city environments with graffiti-inspired visual effects and a campaign about earning a place at The Grand.',
  'pes-collections': 'PES Collections brings together the football-simulation style associated with Pro Evolution Soccer: tactical matches, squad building, roster editing and the search for the perfect starting eleven.',
  'pragmata': 'PRAGMATA is a science-fiction action adventure from Capcom set in a dystopian future. Astronaut Hugh and the mysterious android Diana must survive a hostile lunar facility while uncovering what happened there.',
  'ready-or-not': 'Ready or Not is a tactical first-person shooter about SWAT teams responding to high-risk incidents. Planning, communication, careful room clearing and restraint matter as much as marksmanship.',
  'red-dead-redemption-2': 'Red Dead Redemption 2 follows outlaw Arthur Morgan and the Van der Linde gang as they struggle to survive the end of the American frontier through a vast, reactive open world.',
  'resident-evil-5': 'Resident Evil 5 follows Chris Redfield and Sheva Alomar through a bioterror investigation in rural Africa, combining exploration, resource management and cooperative action against infected enemies.',
  'resident-evil-6': 'Resident Evil 6 interweaves four campaigns featuring Leon, Chris, Jake and Ada as a global bioterror crisis unfolds, balancing survival-horror themes with more action-focused combat.',
  'resident-evil-village': 'Resident Evil Village follows Ethan Winters into a remote European village filled with supernatural threats, where he searches for his daughter while uncovering the region’s dark history.',
  'sekiro-shadows-die-twice': 'Sekiro: Shadows Die Twice follows the one-armed Wolf, a shinobi sworn to protect his young lord in a war-torn Japan. Precision swordplay, posture breaks and resurrection define every duel.',
  'shadow-fight-arena': 'Shadow Fight Arena is a real-time competitive fighting game where players assemble teams of shadow warriors, combine distinct abilities and battle through tactical one-on-one matches.',
  'shadow-of-the-tomb-raider': 'Shadow of the Tomb Raider follows Lara Croft through the jungles and ancient cities of Latin America as she races to prevent a Maya apocalypse and faces the consequences of her choices.',
  'sleeping-dogs': 'Sleeping Dogs follows undercover officer Wei Shen as he infiltrates Hong Kong’s criminal triads, combining martial-arts combat, driving and a tense open-world crime story.',
  'stardew-valley': 'Stardew Valley is a farming and life-simulation RPG where you restore an inherited farm, build relationships, explore dangerous places and help revive a changing local community.',
  'the-witcher-3-wild-hunt': 'The Witcher 3: Wild Hunt follows monster hunter Geralt of Rivia as he searches for Ciri across the war-torn Northern Kingdoms while confronting political conflict and supernatural threats.',
  'tomb-raider': 'Tomb Raider is Lara Croft’s origin story, following her survival on a mysterious island and her transformation from inexperienced archaeologist into a determined adventurer.',
  'uncharted-legacy-of-thieves': 'Uncharted: Legacy of Thieves Collection brings together Uncharted 4 and The Lost Legacy, pairing globe-spanning treasure hunts with cinematic set pieces, climbing and third-person combat.',
};

function FeaturedGameDetails({ game, details }: { game: typeof games[number]; details: FeaturedDetails }) {
  const galleryGame = { ...game, screenshots: details.screenshots };
  return <main className="featured-detail-page">
    <section className="featured-detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,12,11,.96), rgba(5,12,11,.58) 58%, rgba(5,12,11,.14)), url(${details.heroImage ?? game.coverImage})` }}>
      <div className="featured-detail-hero-inner"><Link className="featured-detail-back" to="/explore">← Back to game library</Link><h1>{game.title}</h1>{game.tagline && <p className="featured-detail-tagline">{game.tagline}</p>}<Button className="featured-detail-install-button" to={`/request-installation?game=${game.id}`}>Request installation <ArrowRight size={16} /></Button></div>
      <div className="featured-detail-meta"><span>{game.developer}</span><span>{game.releaseYear}</span><span>{game.platform ?? 'PC'}</span></div>
    </section>
    <section className="featured-detail-about"><p className="eyebrow">ABOUT THE GAME</p><h2>{game.title}</h2><p>{details.about}</p></section>
    <section className="featured-detail-gallery"><div className="featured-detail-heading"><p className="eyebrow">SCREENSHOTS</p></div><GameGallery game={galleryGame} /></section>
    <section className="featured-detail-specs"><div className="featured-detail-heading"><p className="eyebrow">PC REQUIREMENTS</p><h2>PC requirements.</h2></div><div className="featured-detail-spec-grid"><HardwareRequirements title="Minimum" requirements={details.minimum} /><HardwareRequirements title="Recommended" requirements={details.recommended} /></div></section>
    <section className="featured-detail-cta"><h2>Ready to play {game.title}?</h2><Button to={`/request-installation?game=${game.id}`}>Request installation <ArrowRight size={16} /></Button></section>
  </main>;
}

function detailsForGame(game: typeof games[number]): FeaturedDetails {
  const override = libraryDetailOverrides[game.id];
  const suppliedArt = suppliedGameArt[game.id];
  const researchedArt = researchedGameArt[game.id];
  const fallbackScreenshots = [game.backdropImage, ...game.screenshots, game.coverImage].filter((image, index, images) => images.indexOf(image) === index).slice(0, 3);
  return {
    about: override?.about ?? researchedAbout[game.id] ?? game.longDescription ?? game.description,
    screenshots: override?.screenshots ?? suppliedArt?.screenshots ?? researchedArt?.screenshots ?? fallbackScreenshots,
    heroImage: override?.heroImage ?? suppliedArt?.heroImage ?? researchedArt?.heroImage,
    minimum: game.minimumRequirements,
    recommended: game.recommendedRequirements ?? game.minimumRequirements,
  };
}

export function GameDetails() {
  const { id } = useParams();
  const game = games.find((item) => item.id === id);
  if (!game) return <PageContainer><div className="empty-state"><h1>Game not found</h1><Link className="text-link" to="/explore">Back to library</Link></div></PageContainer>;
  return <FeaturedGameDetails game={game} details={featuredDetails[game.id] ?? detailsForGame(game)} />;
}
