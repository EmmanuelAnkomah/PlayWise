import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { genres } from '../data/genres';

const categoryLabels: Record<string, string> = {
  sports: 'COMPETITION',
  racing: 'SPEED',
  action: 'COMBAT',
  adventure: 'EXPLORATION',
  strategy: 'TACTICAL',
  rpg: 'ROLE-PLAYING',
};

const orderedGenres = ['sports', 'racing', 'action', 'adventure', 'strategy', 'rpg']
  .map((id) => genres.find((genre) => genre.id === id))
  .filter((genre): genre is (typeof genres)[number] => Boolean(genre));

const genreGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: .14, delayChildren: .08 },
  },
};

const genreCardVariants = {
  hidden: { opacity: 0, x: -48, scale: .98 },
  visible: { opacity: 1, x: 0, scale: 1 },
};

export function Genres() {
  const reducedMotion = useReducedMotion();
  return (
    <main className="genres-page">
      <section className="genres-hero" style={{ backgroundImage: 'url("https://www.pcworld.com/wp-content/uploads/2025/06/pc-games-discount.jpg?quality=50&strip=all&w=1024")' }}>
        <div>
          <h1>Find your kind<br />of <em>game.</em></h1>
          <p>Explore Playwise by genre and find the kind of game you want to play.</p>
        </div>
      </section>
      <section className="genres-directory">
        <div className="genres-directory-heading"><p className="eyebrow">SELECT YOUR PLAYSTYLE</p><span>DISCOVER / FILTER / PLAY</span></div>
        <motion.div className="genres-grid" initial={reducedMotion ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .18 }} variants={reducedMotion ? undefined : genreGridVariants}>
          {orderedGenres.map((genre) => {
            return <motion.div key={genre.id} className={`genre-card genre-card-${genre.id}`} variants={reducedMotion ? undefined : genreCardVariants} transition={reducedMotion ? { duration: 0 } : { duration: .48, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={`/explore?genre=${genre.id}`} aria-label={`Explore ${genre.name} games`}>
                <img src={genre.image} alt="" loading="lazy" />
                <div className="genre-card-shade" />
                <div className="genre-card-content"><span>{categoryLabels[genre.id]}</span><h2>{genre.name.toUpperCase()}</h2></div>
                <span className="genre-card-cta">EXPLORE <ArrowRight size={15} /></span>
              </Link>
            </motion.div>;
          })}
        </motion.div>
      </section>
      <section className="genres-final-cta"><div><p className="eyebrow">STILL DECIDING?</p><h2>Browse <em>everything.</em></h2><p>Explore the complete Playwise library and find something that fits your setup.</p></div><Link to="/explore">OPEN GAME LIBRARY <ArrowRight size={17} /></Link></section>
    </main>
  );
}
