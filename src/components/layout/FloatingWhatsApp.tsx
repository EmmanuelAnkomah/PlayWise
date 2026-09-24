import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { createWhatsAppChatUrl } from '../../utils/whatsapp';

export function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={createWhatsAppChatUrl('Hello Playwise! I need help choosing a game.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22} /><span>{siteConfig.whatsappDisplay}</span></a>;
}
