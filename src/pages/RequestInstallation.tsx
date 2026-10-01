import { ArrowRight, ChevronRight, Gamepad2, ShieldCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { games } from '../data/games';
import { InstallationForm } from '../components/contact/InstallationForm';
import { CinematicGameplaySection } from '../components/request/CinematicGameplaySection';
import type { InstallationRequestPayload } from '../types/game';

const requestHeroFallback = 'https://i.pinimg.com/236x/86/cf/97/86cf9715f5fb715001c2eab64984b4ce.jpg';

export function RequestInstallation() {
  const [params] = useSearchParams();
  const game = games.find((item) => item.id === params.get('game'));
  const [request, setRequest] = useState<InstallationRequestPayload>({ fullName: '', email: '', whatsapp: '', gameTitle: game?.title ?? '', pcSpecifications: '', additionalMessage: '' });
  return (
    <main className="request-page">
      <section className="request-hero" style={{ backgroundImage: `url(${game?.backdropImage ?? requestHeroFallback})` }}>
          <video className="request-hero-video" autoPlay muted loop playsInline poster={requestHeroFallback} aria-hidden="true">
          <source src="https://res.cloudinary.com/ctapnkmr/video/upload/v1788971084/Reqeuim.mp4" type="video/mp4" />
        </video>
        <div className="request-hero-shade" />
        <div className="request-hero-inner">
          <div className="request-hero-copy">
            <p className="eyebrow">PLAYWISE INSTALLATION DESK</p>
            <h1>Request a<br /><em>game.</em></h1>
            <p>Tell us which game you want and a few details about your PC. We’ll review your request and get back to you with the next steps.</p>
            <div className="request-hero-actions">
              <a className="request-pill request-pill-acid" href="#installation-form">Start your request <ArrowRight size={16} /></a>
              <Link className="request-text-link" to="/explore">Browse the library <ChevronRight size={16} /></Link>
            </div>
          </div>
        </div>
        <span className="request-hero-index">PLAYWISE / INSTALLATION</span>
      </section>

      <CinematicGameplaySection />
      <section className="request-workspace" id="installation-form">
        <div className="request-workspace-intro">
          <p className="eyebrow">REQUEST DETAILS</p>
          <h2>Tell us what<br /><em>you want to play.</em></h2>
          <p>Choose your game, share a few details about your PC, and leave us a way to reach you. That’s all we need to get started.</p>
          {game && <div className="request-selected-game"><span>REQUESTING</span><strong>{game.title}</strong><small>{game.genres.join(' / ')} · {game.releaseYear}</small></div>}
          <div className="request-summary"><p className="eyebrow">YOUR REQUEST</p><div><span>GAME</span><strong>{request.gameTitle || 'Not selected'}</strong></div><div><span>PC</span><strong>{request.pcSpecifications || 'Not provided'}</strong></div><div><span>CONTACT</span><strong>{request.whatsapp || request.email || 'Not provided'}</strong></div></div>
          <div className="request-assurance"><ShieldCheck size={17} /><span><strong>Your details are only used to handle this request.</strong>We use the information you provide to respond.</span></div>
        </div>
        <div className="request-form-shell">
          <div className="request-form-heading"><div><p className="eyebrow">GAME INSTALLATION</p><h3>Send your request</h3></div><Gamepad2 size={25} /></div>
          <InstallationForm gameTitle={game?.title} onChange={setRequest} />
        </div>
      </section>

      <section className="request-next" id="request-next">
        <div><p className="eyebrow">WHAT HAPPENS NEXT?</p><h2>From request<br /><em>to next steps.</em></h2></div>
        <div className="request-next-list">
          <div><b>01</b><span><strong>We review your request</strong><small>We check the game, your PC details, and the information you shared.</small></span></div>
          <div><b>02</b><span><strong>We get in touch</strong><small>We reach you through your preferred contact method.</small></span></div>
          <div><b>03</b><span><strong>You get your next steps</strong><small>We explain what happens next and what to do from there.</small></span></div>
        </div>
      </section>
      <section className="request-library-cta"><div><p className="eyebrow">NOT SURE WHAT TO REQUEST?</p><h2>Browse the Playwise<br /><em>Game Library.</em></h2></div><Link className="request-pill request-pill-dark" to="/explore">Browse game library <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
