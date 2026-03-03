import React, { useState } from 'react';
import './ContactModal.css';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ModalView = 'options' | 'form' | 'success';

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [view, setView] = useState<ModalView>('options');
    const [formData, setFormData] = useState({ name: '', contact: '', service: '', message: '' });

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        setTimeout(() => setView('options'), 300); // Reset after closing animation
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://hritebusiness.vercel.app/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    contact: formData.contact,
                    email: formData.contact, // Using contact as email for DB simplicity on lead model
                    budget: formData.service,
                    message: formData.message || 'No message provided'
                })
            });

            if (response.ok) {
                setView('success');
            } else {
                console.error("Failed to submit lead");
                alert("Failed to submit request. Please try again or use direct email.");
            }
        } catch (error) {
            console.error("Network error submitting lead:", error);
            alert("Network error. Please try again later.");
        }
    };

    const updateForm = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="contact-modal-overlay" onClick={handleClose}>
            <div className="contact-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="contact-modal-close" onClick={handleClose} aria-label="Close modal">
                    &times;
                </button>

                {view === 'options' && (
                    <>
                        <div className="contact-modal-header">
                            <h2>Let's build<br />something remarkable.</h2>
                            <p>Choose how you'd like to reach out to us. We're ready when you are.</p>
                        </div>
                        <div className="contact-modal-options">
                            <button onClick={() => setView('form')} className="contact-modal-card highlight-card">
                                <div className="contact-modal-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                                </div>
                                <div className="contact-modal-info">
                                    <h4>Schedule a Call</h4>
                                    <span>Pick a time to discuss your project</span>
                                </div>
                            </button>
                            <a href="mailto:hrite.business@proton.me" className="contact-modal-card">
                                <div className="contact-modal-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div className="contact-modal-info">
                                    <h4>Email Us</h4>
                                    <span>hrite.business@proton.me</span>
                                </div>
                            </a>
                            <a href="https://wa.me/916206733818" target="_blank" rel="noopener noreferrer" className="contact-modal-card">
                                <div className="contact-modal-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                </div>
                                <div className="contact-modal-info">
                                    <h4>WhatsApp</h4>
                                    <span>+91 62067 33818</span>
                                </div>
                            </a>
                            <a href="tel:+916206733818" className="contact-modal-card">
                                <div className="contact-modal-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div className="contact-modal-info">
                                    <h4>Call Support</h4>
                                    <span>+91 62067 33818</span>
                                </div>
                            </a>
                        </div>
                    </>
                )}

                {view === 'form' && (
                    <>
                        <div className="contact-modal-header">
                            <button className="modal-back-btn" onClick={() => setView('options')}>
                                ← Back
                            </button>
                            <h2>Let's Talk.</h2>
                            <p>Fill out the details below and we will get back to you shortly.</p>
                        </div>
                        <form className="contact-modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>FULL NAME</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => updateForm('name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>PHONE OR WHATSAPP</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="+91 0000 0000"
                                    value={formData.contact}
                                    onChange={(e) => updateForm('contact', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>INTERESTED IN (OPTIONAL)</label>
                                <select
                                    value={formData.service}
                                    onChange={(e) => updateForm('service', e.target.value)}
                                >
                                    <option value="">Select a service...</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App">Mobile App Development</option>
                                    <option value="Design">UI/UX Design</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>MESSAGE (OPTIONAL)</label>
                                <textarea
                                    placeholder="Tell us a little about your project..."
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => updateForm('message', e.target.value)}
                                />
                            </div>
                            <button type="submit" className="cta-button cta-solid-orange form-submit-btn">
                                Request Callback
                            </button>
                        </form>
                    </>
                )}

                {view === 'success' && (
                    <div className="contact-modal-success">
                        <div className="success-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                        </div>
                        <h2>Request Received!</h2>
                        <p>Thank you, {formData.name || 'there'}. We have received your request and an expert will message or call you shortly via your provided contact number.</p>
                        <button onClick={handleClose} className="cta-button cta-outline-dark success-close-btn">
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactModal;
