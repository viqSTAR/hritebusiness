import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const Contact: React.FC = () => {
    const { openContactModal } = useModal();
    return (
        <footer className="footer-block-wrapper page-wrapper">
            <div className="footer-block">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">HRITE</h2>
                        <p>Design and strategy for ambitious companies building the future.</p>
                    </div>
                    <div className="footer-links-grid">
                        <div className="footer-col">
                            <h4>Navigation</h4>
                            <Link to="/about">About Us</Link>
                            <a href="#services">Services</a>
                            <a href="#projects">Work</a>
                            <a href="#team">Team</a>
                        </div>
                        <div className="footer-col">
                            <h4>Connect</h4>
                            <a href="mailto:hrite.business@proton.me" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                hrite.business@proton.me
                            </a>
                            <a href="https://wa.me/916206733818" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                                +91 62067 33818
                            </a>
                            <a href="tel:+916206733818" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                +91 62067 33818
                            </a>
                        </div>
                        <div className="footer-col">
                            <h4>Tools</h4>
                            <Link to="/track">Track Project</Link>
                            <a href="#request" onClick={(e) => { e.preventDefault(); openContactModal(); }}>Start a Project</a>
                            <Link to="/portfolio">All Works</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-break">
                    <h2 className="footer-headline">Let's build<br />something remarkable.</h2>
                    <button onClick={openContactModal} className="btn btn-primary footer-cta">
                        Start a Project ↗
                    </button>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 HRITE Agency. All Rights Reserved.</span>
                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
