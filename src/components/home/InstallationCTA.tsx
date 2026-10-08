import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function InstallationCTA() {
  return <section className="installation-cta"><div><p className="eyebrow">INSTALLATION SUPPORT</p><h2>Need help with<br /><em>a specific game?</em></h2><p>Send the game title and your PC details. PlayWise will review the request and reply with the appropriate next step.</p></div><Button to="/request-installation">Start a request <ArrowRight size={18} /></Button></section>;
}
