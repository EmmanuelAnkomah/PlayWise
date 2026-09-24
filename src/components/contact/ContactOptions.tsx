import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { buildSupportWhatsAppUrl } from '../../utils/whatsapp';

export function ContactOptions() {
  return <div className="contact-options">
    <a href={buildSupportWhatsAppUrl()} target="_blank" rel="noreferrer">
      <span className="contact-option-icon"><MessageCircle /></span>
      <span><b>WhatsApp</b><small>Fastest for quick questions</small><strong>{siteConfig.whatsappDisplay}</strong></span>
      <ArrowUpRight className="contact-option-arrow" size={17} />
    </a>
    <a href={`mailto:${siteConfig.email}`}>
      <span className="contact-option-icon"><Mail /></span>
      <span><b>Email the team</b><small>Best for detailed requests</small><strong>{siteConfig.email}</strong></span>
      <ArrowUpRight className="contact-option-arrow" size={17} />
    </a>
  </div>;
}
