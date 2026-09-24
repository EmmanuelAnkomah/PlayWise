import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function InstallationCTA() {
  return <section className="installation-cta"><div><p className="eyebrow">NEED A HAND?</p><h2>Let us get you<br /><em>game-ready.</em></h2><p>Tell us what you want to play and your PC specs. We’ll help you check compatibility and get set up.</p></div><Button to="/request-installation">Request installation <ArrowRight size={18} /></Button></section>;
}
