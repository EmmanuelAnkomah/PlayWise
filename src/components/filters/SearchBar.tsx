import { Search } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Search games...' }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className="search-bar"><Search size={19} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Search games" /></label>;
}
