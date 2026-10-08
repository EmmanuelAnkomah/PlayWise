import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types/game';
import { getGameCoverImage } from '../../pages/GameDetails';

export function VaultGameWall({ games }: { games: Game[] }) {
  const reducedMotion = useReducedMotion();
  if (!games.length) return <div className="vault-empty"><p className="eyebrow">NO MATCHES IN THE VAULT</p><h2>Try another search<br />or filter.</h2></div>;
  return <section className="vault-wall" aria-label="Available PC games">{games.map((game, index) => <motion.article key={game.id} className={`genre-card library-game-card genre-card-${game.genres[0]}`} initial={reducedMotion || index < 4 ? false : { opacity: .5, x: -28, scale: .985 }} whileInView={reducedMotion || index < 4 ? undefined : { opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: .18 }} transition={reducedMotion ? { duration: 0 } : { duration: .5, delay: (index % 4) * .08, ease: [0.22, 1, 0.36, 1] }}>
    <Link to={`/games/${game.id}`} aria-label={`View ${game.title}`}>
      <img src={getGameCoverImage(game)} alt={`${game.title} cover artwork`} loading="lazy" />
      <div className="genre-card-shade" />
      <div className="genre-card-content"><span>{game.genres[0]}</span><h2>{game.title}</h2></div>
      <span className="genre-card-cta">VIEW GAME <ArrowRight size={15} /></span>
    </Link>
  </motion.article>)}</section>;
}
