import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail, MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SupportRobot } from '../components/contact/SupportRobot';
import { siteConfig } from '../config/siteConfig';
import { supportCategories, supportFaqs } from '../data/supportData';
import { buildSupportWhatsAppUrl } from '../utils/whatsapp';

export function Contact() {
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const filteredFaqs = useMemo(() => supportFaqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const supportUrl = buildSupportWhatsAppUrl();

  return (
    <main className="support-page">
      <section className="support-hero">
        <img className="support-hero-video" src="https://i.pinimg.com/1200x/87/b0/b6/87b0b6f8cbaf23e52a7b1dc01dbb4b3d.jpg" alt="" aria-hidden="true" />
        <div className="support-hero-overlay" />
        <div className="support-hero-inner">
          <motion.div className="support-hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <p className="eyebrow">PLAYWISE SUPPORT</p>
            <h1>Need a <em>hand?</em></h1>
            <h2>We’re here to assist you.</h2>
            <p>Whether you are looking for a game, checking whether your PC can handle it, requesting an installation, or running into an issue, our team is ready to help.</p>
            <div className="support-hero-actions"><a className="support-button support-button-lime" href="#support-options">Get support <ArrowRight size={17} /></a><Link className="support-button support-button-light" to="/explore">Browse the library <ArrowRight size={17} /></Link></div>
          </motion.div>
          <div className="support-hero-status"><span><i /> PlayWise</span><span>Support</span></div>
        </div>
      </section>

      <section className="support-section support-topics">
        <div className="support-section-heading"><div><p className="eyebrow">HOW CAN WE HELP?</p><h2>What do you need<br /><em>help with?</em></h2></div><p>Choose a topic and we’ll point you in the right direction.</p></div>
        <div className="support-category-grid">{supportCategories.map((category, index) => { const Icon = category.icon; return <motion.a className="support-category" href={category.href} key={category.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .06 }}><Icon size={23} /><h3>{category.title}</h3><p>{category.description}</p><ArrowRight className="support-category-arrow" size={18} /></motion.a>; })}</div>
      </section>

      <section className="support-section support-options-section" id="support-options">
        <div className="support-section-heading"><div><p className="eyebrow">DIRECT SUPPORT</p></div><p>Guaranteed support from a real Playwise team member, through the channel that works best for you.</p></div>
        <div className="support-contact-grid">
          <motion.div className="support-whatsapp-card" whileHover={{ y: -5 }}><div className="support-card-top"><MessageCircle size={30} /><span>FASTEST RESPONSE</span></div><h3>WhatsApp support</h3><p>Chat with us directly for game requests, installation questions, availability and general support.</p><a className="support-action support-action-lime" href={supportUrl} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp <ArrowRight size={17} /></a></motion.div>
          <motion.div className="support-email-card" whileHover={{ y: -5 }}><div className="support-card-top"><Mail size={30} /><span>DETAILED SUPPORT</span></div><h3>Email support</h3><p>For detailed questions, technical issues or anything that needs more explanation, send us an email.</p><a className="support-action support-action-dark" href={`mailto:${siteConfig.email}`}><Mail size={17} /> Send an email <ArrowRight size={17} /></a></motion.div>
        </div>
      </section>

      <section className="support-request-band"><div><p className="eyebrow">CAN’T FIND IT?</p><h2>Looking for a<br /><em>specific game?</em></h2><p>Send us the title and we’ll check what’s currently available.</p></div><Link className="support-button support-button-lime" to="/request-installation#installation-form">Request a game <ArrowRight size={17} /></Link></section>

      <section className="support-section support-faq-section">
        <div className="support-faq-heading"><p className="eyebrow">QUICK ANSWERS</p><h2>Find an <em>answer.</em></h2><label className="support-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Playwise support..." aria-label="Search Playwise support" /></label></div>
        <div className="support-faq-list">{filteredFaqs.map((faq, index) => <div className={`support-faq ${openFaq === index ? 'is-open' : ''}`} key={faq.question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><ChevronDown size={19} /></button>{openFaq === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{faq.answer}</motion.p>}</div>)}{filteredFaqs.length === 0 && <p className="support-empty">No matching answers yet. Try a different search or contact us directly.</p>}</div>
      </section>

      <SupportRobot />
      <section className="support-final-cta"><p className="eyebrow">PLAYER ASSISTANCE</p><h2>Still need <em>help?</em></h2><p>Tell us what you’re trying to play, what you’re running into, and we’ll help you figure out the next step.</p><div><a className="support-button support-button-lime" href={supportUrl} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={17} /></a><a className="support-button support-button-outline" href={`mailto:${siteConfig.email}`}>Send an email <ArrowRight size={17} /></a></div></section>
    </main>
  );
}
