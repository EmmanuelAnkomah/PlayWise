import { siteConfig } from '../config/siteConfig';
import type { InstallationRequestPayload } from '../types/game';

/**
 * Builds a formatted WhatsApp link for direct messaging
 */
export function createWhatsAppChatUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function buildSupportWhatsAppUrl(): string {
  return createWhatsAppChatUrl('I am [name], I need help with [task/issue]');
}

/**
 * Creates pre-filled WhatsApp message for installation requests
 */
export function buildInstallationWhatsAppUrl(payload: InstallationRequestPayload): string {
  const text = `*🎮 PLAYWISE INSTALLATION REQUEST*
────────────────────────────
*Game:* ${payload.gameTitle}
*Client Name:* ${payload.fullName}
*WhatsApp:* ${payload.whatsapp}
*Email:* ${payload.email}

*🖥️ PC Specifications:*
${payload.pcSpecifications || 'Not specified - please help me check.'}

*💬 Notes / Questions:*
${payload.additionalMessage || 'None'}
────────────────────────────
_Sent via Playwise Platform_`;

  return createWhatsAppChatUrl(text);
}

/**
 * Quick link for PC compatibility advice
 */
export function buildCompatibilityInquiryWhatsAppUrl(gameTitle: string): string {
  const text = `Hello Playwise! I want to know if my PC can run *${gameTitle}*. Here are my specifications: `;
  return createWhatsAppChatUrl(text);
}