import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { games } from '../../data/games';
import { siteConfig } from '../../config/siteConfig';

const SITE_URL = siteConfig.url;

type RouteMetadata = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; path: string }>;
  game?: (typeof games)[number];
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function setStructuredData(data: object | object[] | null) {
  let element = document.head.querySelector<HTMLScriptElement>('#playwise-structured-data');
  if (!data) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.id = 'playwise-structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function metadataForPath(pathname: string): RouteMetadata {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const game = normalizedPath.startsWith('/games/')
    ? games.find((item) => item.id === normalizedPath.slice('/games/'.length))
    : undefined;

  if (game) {
    return {
      title: `${game.title} for PC | Requirements & Installation Ghana | PlayWise`,
      description: `${game.longDescription ?? game.description} Check PC requirements and request reliable game installation support in Ghana.`,
      image: game.coverImage,
      type: 'article',
      game,
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Game Library', path: '/explore' },
        { name: game.title, path: `/games/${game.id}` },
      ],
    };
  }

  switch (normalizedPath) {
    case '/':
      return {
        title: 'PC Game Installation Ghana | Discover Games in Accra | PlayWise',
        description: 'PlayWise helps gamers in Ghana discover PC games, check hardware requirements, and request PC game installation support in Accra and beyond.',
        image: siteConfig.libraryBanner,
      };
    case '/explore':
      return {
        title: 'PC Game Library Ghana | Games for Every PC | PlayWise',
        description: 'Explore the PlayWise PC game library in Ghana, with recommendations organised by genre and hardware tier for low-end laptops, mid-range PCs, and high-end systems.',
        image: siteConfig.libraryBanner,
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Game Library', path: '/explore' }],
      };
    case '/genres':
      return {
        title: 'PC Game Genres | Action, Racing, RPG & More | PlayWise',
        description: 'Browse PC game genres on PlayWise and find action, racing, sports, RPG, adventure, and strategy games that fit your taste and setup in Ghana.',
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Genres', path: '/genres' }],
      };
    case '/low-end':
      return {
        title: 'PC Games for Low-End Laptops in Ghana | PlayWise',
        description: 'Find PC games that work well on low-end laptops and modest hardware in Ghana, with practical requirements and installation support from PlayWise.',
        image: siteConfig.libraryBanner,
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Low-End PC Games', path: '/low-end' }],
      };
    case '/high-end':
      return {
        title: 'High-End PC Games in Ghana | PlayWise',
        description: 'Explore demanding high-end PC games and gaming recommendations, with hardware requirements and installation assistance for gamers in Ghana.',
        image: siteConfig.libraryBanner,
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'High-End PC Games', path: '/high-end' }],
      };
    case '/request-installation':
      return {
        title: 'Request PC Game Installation in Ghana | PlayWise',
        description: 'Request PC game installation in Ghana by sharing the game you want and your PC details. PlayWise reviews your setup and explains the next steps.',
        image: siteConfig.requestBanner,
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Request Installation', path: '/request-installation' }],
      };
    case '/contact':
      return {
        title: 'Contact PlayWise | PC Game Support in Ghana',
        description: 'Contact PlayWise for PC game recommendations, hardware checks, installation requests, and technical support in Ghana and Accra.',
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }],
      };
    default:
      return {
        title: 'Page Not Found | PlayWise',
        description: 'The PlayWise page you requested could not be found.',
        noindex: true,
      };
  }
}

function buildStructuredData(metadata: RouteMetadata, canonicalUrl: string) {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
  };
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [siteConfig.socials.tiktok, siteConfig.socials.youtube],
  };
  const breadcrumb = metadata.breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: metadata.breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }
    : null;
  const videoGame = metadata.game
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: metadata.game.title,
        description: metadata.description,
        url: canonicalUrl,
        image: [metadata.game.coverImage, metadata.game.backdropImage],
        genre: metadata.game.genres,
        gamePlatform: 'PC',
        datePublished: String(metadata.game.releaseYear),
        ...(metadata.game.developer ? { author: { '@type': 'Organization', name: metadata.game.developer } } : {}),
      }
    : null;

  if (metadata.game) return [breadcrumb, videoGame].filter(Boolean);
  if (metadata.breadcrumbs) return [breadcrumb].filter(Boolean);
  return [organization, website];
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = metadataForPath(pathname);
    const canonicalPath = pathname.startsWith('/games/')
      ? pathname.replace(/\/+$/, '')
      : (pathname.replace(/\/+$/, '') || '/');
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
    const image = metadata.image?.startsWith('http') ? metadata.image : metadata.image ? `${SITE_URL}${metadata.image}` : `${SITE_URL}/favicon.svg`;

    document.title = metadata.title;
    setMeta('name', 'description', metadata.description);
    setMeta('name', 'robots', metadata.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', metadata.title);
    setMeta('property', 'og:description', metadata.description);
    setMeta('property', 'og:type', metadata.type ?? 'website');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:site_name', siteConfig.name);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', metadata.title);
    setMeta('name', 'twitter:description', metadata.description);
    setMeta('name', 'twitter:image', image);
    setCanonical(canonicalUrl);
    setStructuredData(buildStructuredData(metadata, canonicalUrl));
  }, [pathname]);

  return null;
}
