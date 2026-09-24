import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';

const tierLabel = (tier: Game['performanceCategory']) => tier === 'mid-range' ? 'MEDIUM' : tier.replace('-end', '').toUpperCase();

export function VaultGameWall({ games }: { games: Game[] }) {
  if (!games.length) return <div className="vault-empty"><p className="eyebrow">NO MATCHES IN THE VAULT</p><h2>Try another search<br />or filter.</h2></div>;
  return <section className="vault-wall" aria-label="Available PC games">{games.map((game, index) => <article key={game.id} className={`vault-card vault-card-${game.vaultSize ?? 'standard'}`}>
    <Link to={`/games/${game.id}`} className="vault-card-art" aria-label={`View ${game.title}`}><img src={game.coverImage} alt={`${game.title} cover artwork`} loading="lazy" /><span className="vault-card-number">{String(index + 1).padStart(2, '0')}</span><span className="vault-card-tier">{tierLabel(game.performanceCategory)}</span></Link>
    <div className="vault-card-copy"><div><p>{game.genres.slice(0, 2).join(' / ')}</p><h2><Link to={`/games/${game.id}`}>{game.title}</Link></h2></div><div className="vault-card-actions"><Link to={`/games/${game.id}`}>View game <ArrowUpRight size={15} /></Link><Link className="vault-request" to={`/request-installation?game=${game.id}`}>Request</Link></div></div>
  </article>)}</section>;
}
