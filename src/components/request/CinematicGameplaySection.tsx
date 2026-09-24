import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const gameplayVideo = 'https://res.cloudinary.com/ctapnkmr/video/upload/v1788973528/Pragmata.mp4';

export function CinematicGameplaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= .55;
      setIsInView(visible);
      const video = videoRef.current;
      if (!video) return;
      if (!visible && entry.intersectionRatio < .2) {
        video.pause();
        return;
      }
      if (visible && (!autoplayBlocked || hasUserStarted) && video.paused) {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.then(() => setIsPlaying(true)).catch(() => {
            if (!hasUserStarted) setAutoplayBlocked(true);
          });
        }
      }
    }, { threshold: [.2, .55, .75] });
    observer.observe(section);
    return () => observer.disconnect();
  }, [autoplayBlocked, hasUserStarted]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setHasUserStarted(true);
        setAutoplayBlocked(false);
      }).catch(() => setAutoplayBlocked(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const playWithSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.play().then(() => {
      setIsPlaying(true);
      setHasUserStarted(true);
      setAutoplayBlocked(false);
    }).catch(() => setAutoplayBlocked(true));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const setVideoProgress = (value: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = value * video.duration;
    setProgress(value);
  };

  return (
    <section className={`gameplay-section ${isInView ? 'is-visible' : ''}`} ref={sectionRef} aria-label="Cinematic gameplay preview">
      <div className="gameplay-heading">
        <div><p className="eyebrow">YOUR NEXT PLAY</p><h2>Let Playwise handle your gaming <em>adventure.</em></h2></div>
        <p>Discover the experience waiting on the other side of your request.</p>
      </div>
      <div className="gameplay-frame">
        <video ref={videoRef} className="gameplay-video" preload="metadata" playsInline onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)} onEnded={() => setIsPlaying(false)} aria-label="Pragmata gameplay preview">
          <source src={gameplayVideo} type="video/mp4" />
        </video>
        {autoplayBlocked && !hasUserStarted && <button className="gameplay-sound-prompt" type="button" onClick={playWithSound}><Volume2 size={17} /> Play with sound</button>}
        <div className="gameplay-controls">
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause gameplay' : 'Play gameplay'}>{isPlaying ? <Pause size={16} /> : <Play size={16} />}</button>
          <input type="range" min="0" max="1" step=".001" value={progress} onChange={(event) => setVideoProgress(Number(event.target.value))} aria-label="Gameplay progress" />
          <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute gameplay' : 'Mute gameplay'}>{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
          <span className="gameplay-sound-status">{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          <button type="button" onClick={() => videoRef.current?.requestFullscreen()} aria-label="View gameplay fullscreen"><Maximize2 size={16} /></button>
        </div>
      </div>
    </section>
  );
}
