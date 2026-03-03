import React from 'react';
import { useModal } from '../context/ModalContext';

const ContactPage: React.FC = () => {
    const { openContactModal } = useModal();
    return (
        <div className="page-wrapper section-padding" style={{ textAlign: 'center' }}>
            <span className="mono-tag">// CONNECT WITH US</span>
            <h2>Let's Build the Future.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 40px' }}>
                Reach out via email, phone, or WhatsApp — we're happy to discuss your project.
            </p>

            <div className="contact-cards" style={{ marginBottom: '32px' }}>
                <a href="mailto:hrite.business@proton.me" className="contact-card glass-panel">
                    <span className="contact-card-icon">✉️</span>
                    <span className="contact-card-label">EMAIL</span>
                    <span className="contact-card-value">hrite.business@proton.me</span>
                </a>
                <a href="tel:+916206733818" className="contact-card glass-panel">
                    <span className="contact-card-icon">📞</span>
                    <span className="contact-card-label">CALL</span>
                    <span className="contact-card-value">+91 62067 33818</span>
                </a>
                <a href="https://wa.me/916206733818" target="_blank" rel="noopener noreferrer" className="contact-card glass-panel">
                    <span className="contact-card-icon">💬</span>
                    <span className="contact-card-label">WHATSAPP</span>
                    <span className="contact-card-value">Chat instantly</span>
                </a>
            </div>

            <p className="business-hours" style={{ marginBottom: '32px' }}>
                🕙 Business Hours: <strong>10am – 7pm</strong>, Monday through Friday
            </p>

            <button onClick={openContactModal} className="cta-button">Start a Project →</button>
        </div>
    );
};

export default ContactPage;
