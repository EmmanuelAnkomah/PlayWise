import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  to?: string;
};

export function Button({ children, variant = 'primary', to, className = '', ...props }: ButtonProps) {
  const styles = `pw-button pw-button-${variant} ${className}`;
  return to ? <Link className={styles} to={to}>{children}</Link> : <button className={styles} {...props}>{children}</button>;
}
