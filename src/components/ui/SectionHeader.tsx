import { Link } from 'react-router-dom';

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: { label: string; to: string } }) {
  return <div className="section-header"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{action && <Link className="text-link" to={action.to}>{action.label} →</Link>}</div>;
}
