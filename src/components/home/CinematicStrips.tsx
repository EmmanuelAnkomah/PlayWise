import { motion, useReducedMotion } from 'framer-motion';
import forzaImage from '../../assets/Local-images/Forza.webp';
import gtavImage from '../../assets/Local-images/GTAV.webp';
import reddeadImage from '../../assets/Local-images/reddead.webp';

const strips = [
  {
    title: 'Forza Horizon 6',
    genre: 'Open-world racing',
    image: forzaImage,
  },
  {
    title: 'Grand Theft Auto V',
    genre: 'Open-world action',
    image: gtavImage,
  },
  {
    title: 'Red Dead Redemption 2',
    genre: 'Western adventure',
    image: reddeadImage,
  },
];

export function CinematicStrips() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="cinematic-strips" aria-label="Featured Playwise games">
      {strips.map((strip, index) => (
        <motion.figure
          className={`cinematic-strip cinematic-strip-${index + 1}`}
          key={strip.title}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={strip.image}
            alt={`${strip.title} gameplay artwork`}
            loading="lazy"
            decoding="async"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <div className="cinematic-strip-shade" />
          <figcaption>
            <span>{strip.genre}</span>
            <strong>{strip.title}</strong>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
