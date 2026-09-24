import { Gauge, Laptop, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PerformanceSection() {
  return <section className="performance-section"><div><p className="eyebrow">BUILT AROUND YOUR SETUP</p><h2>Great games.<br /><em>Any machine.</em></h2><p>Every game includes clear hardware requirements, so you can spend less time guessing and more time playing.</p><Link className="text-link" to="/low-end">Find games for your PC →</Link></div><div className="performance-cards"><div><Laptop /><b>Low-end ready</b><span>Games for everyday PCs</span></div><div><Gauge /><b>Performance checked</b><span>Real requirements, no guesswork</span></div><div><Sparkles /><b>Hand-picked</b><span>Selected by people who play</span></div></div></section>;
}
