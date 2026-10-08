import { Gauge, Laptop, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PerformanceSection() {
  return <section className="performance-section"><div><p className="eyebrow">CHECK YOUR SETUP</p><h2>Start with your<br /><em>hardware tier.</em></h2><p>Each game is grouped by the PC hardware it needs. Review the minimum and recommended requirements before you request installation.</p><Link className="text-link" to="/low-end">Browse low-end PC games</Link></div><div className="performance-cards"><div><Laptop /><b>Low-end</b><span>Titles suited to modest PC hardware</span></div><div><Gauge /><b>Medium</b><span>Titles for capable gaming PCs</span></div><div><Settings2 /><b>High-end</b><span>Demanding games with stronger GPU requirements</span></div></div></section>;
}
