export function Badge({ children, tone = 'accent' }: { children: string; tone?: 'accent' | 'muted' | 'green' }) {
  return <span className={`pw-badge pw-badge-${tone}`}>{children}</span>;
}
