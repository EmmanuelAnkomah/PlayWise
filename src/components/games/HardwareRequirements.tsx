import { Cpu, HardDrive, Monitor, MemoryStick, Settings2 } from 'lucide-react';
import type { HardwareRequirements } from '../../types/game';

export function HardwareRequirements({ requirements, title = 'Minimum requirements' }: { requirements: HardwareRequirements; title?: string }) {
  const specs: Array<[typeof Cpu, string, string]> = [[Cpu, 'Processor', requirements.processor], [MemoryStick, 'Memory', requirements.memory], [Monitor, 'Graphics', requirements.graphics], [HardDrive, 'Storage', requirements.storage], [Settings2, 'OS', requirements.operatingSystem]];
  return <section className="requirements"><h3>{title}</h3><div className="spec-list">{specs.map(([Icon, label, value]) => <div className="spec" key={label}><Icon size={17} /><span><b>{label}</b>{value}</span></div>)}</div>{requirements.additionalNotes && <p className="muted">{requirements.additionalNotes}</p>}</section>;
}
