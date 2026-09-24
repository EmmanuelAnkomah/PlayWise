import { motion, useReducedMotion } from 'framer-motion';

const strips = [
  {
    title: 'Forza Horizon 6',
    genre: 'Open-world racing',
    image: 'https://images.squarespace-cdn.com/content/v1/5c95f8d416b640656eb7765a/1769109600663-PX9QS40SY9M4Y9JGHI7L/Forza+Horizon+6.png?format=2500w',
  },
  {
    title: 'Grand Theft Auto V',
    genre: 'Open-world action',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg',
  },
  {
    title: 'Red Dead Redemption 2',
    genre: 'Western adventure',
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg',
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
