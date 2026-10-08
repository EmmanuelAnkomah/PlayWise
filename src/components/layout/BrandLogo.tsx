import { Link } from 'react-router-dom';

export function BrandLogo() {
  return <Link to="/" className="brand" aria-label="Playwise home">
    <span className="brand-mark">P</span>
    <span className="brand-name" aria-hidden="true">
      <span className="brand-word-left"><span>l</span><span>a</span><span>y</span></span>
      <span className="brand-word-right"><span>w</span><span>i</span><span>s</span><span>e</span></span>
    </span>
  </Link>;
}
