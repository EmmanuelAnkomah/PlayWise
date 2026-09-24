import { Download, Gamepad2, HelpCircle, Monitor, Search, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SupportCategory = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export type SupportFaq = {
  question: string;
  answer: string;
};

export const supportCategories: SupportCategory[] = [
  { number: '01', title: 'Find a game', description: 'Not sure what to play? Tell us what you are looking for and we will help narrow it down.', icon: Search, href: '/explore' },
  { number: '02', title: 'PC requirements', description: 'Wondering whether a game will run on your system? Send us your specifications and we will help you check.', icon: Monitor, href: '#support-options' },
  { number: '03', title: 'Game installation', description: 'Found something you want to play? Send us your game request and we will guide you through the next step.', icon: Download, href: '/request-installation' },
  { number: '04', title: 'Game availability', description: 'Cannot find a title in the library? Ask us about current availability.', icon: Gamepad2, href: '#support-options' },
  { number: '05', title: 'General support', description: 'Something else? Tell us what is happening and we will help.', icon: HelpCircle, href: '#support-options' },
  { number: '06', title: 'Feedback', description: 'Have an idea for making Playwise better? We would love to hear it.', icon: Wrench, href: '#support-options' },
];

export const supportFaqs: SupportFaq[] = [
  { question: 'How do I request a game?', answer: 'Open the game you want and use the request option. You can also contact Playwise directly through WhatsApp or email.' },
  { question: 'Can you tell me whether a game will run on my PC?', answer: 'Yes. Playwise provides minimum hardware requirements for every game in the library. You can also send us your PC specifications and we will help you assess compatibility.' },
  { question: 'How do I contact Playwise?', answer: 'For the fastest response, use WhatsApp. You can also contact us by email for more detailed questions.' },
  { question: "Can I request a game that isn't in the library?", answer: 'Yes. Send us the title and we will check its current availability.' },
  { question: 'Do you show game prices on Playwise?', answer: 'No. Playwise does not display public game or installation pricing. Contact us directly for current information.' },
  { question: 'What information should I send when asking for technical help?', answer: 'Include the game title and, if possible, your CPU, GPU, RAM and Windows version. This helps us give you a more useful answer.' },
];
