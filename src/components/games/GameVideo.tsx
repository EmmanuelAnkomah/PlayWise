export function GameVideo({ src, title }: { src?: string; title: string }) {
  if (!src) return <div className="video-placeholder"><span>▶</span><p>{title} gameplay trailer</p></div>;
  return <video className="game-video" controls poster={src}><track kind="captions" /><source src={src} /></video>;
}
