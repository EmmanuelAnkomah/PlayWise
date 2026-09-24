import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import type { InstallationRequestPayload } from '../../types/game';
import { buildInstallationWhatsAppUrl, buildCompatibilityInquiryWhatsAppUrl } from '../../utils/whatsapp';

export function WhatsAppButton({ payload, gameTitle, label = 'Send on WhatsApp' }: { payload?: InstallationRequestPayload; gameTitle?: string; label?: string }) {
  const href = payload ? buildInstallationWhatsAppUrl(payload) : buildCompatibilityInquiryWhatsAppUrl(gameTitle ?? 'a game');
  return <Button to={href} className="whatsapp-button"><MessageCircle size={18} /> {label}</Button>;
}
