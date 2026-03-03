import React, { useEffect } from 'react';
import abstractLiquid from '../assets/about_glass_liquid.png';

const AboutPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper about-page" style={{ padding: '120px 20px 60px', overflow: 'hidden' }}>
            <div className="bento-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header Row */}
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '4rem', letterSpacing: '-0.04em', marginBottom: '20px' }}>About Hrite.</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-sub)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        A premium digital agency blending cutting-edge engineering with exquisite design to build the future of the web.
                    </p>
                </div>

                {/* Main Bento Grid */}
                <div className="about-bento-grid">

                    {/* Hero Bento */}
                    <div className="bento-card bento-span-2 glassy-bento hero-bento" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
                        <img
                            src={abstractLiquid || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'}
                            alt="Abstract Glass Liquid"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 0 }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', zIndex: 1 }}></div>
                        <div style={{ position: 'relative', zIndex: 2, padding: '40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Philosophy</h2>
                            <p style={{ fontSize: '1.1rem', maxWidth: '80%', opacity: 0.9 }}>
                                We believe that great digital experiences are the foundation of modern business success.
                                Founded with a vision to bridge complex technical challenges with seamless, intuitive design.
                            </p>
                        </div>
                    </div>

                    {/* Stat / Mission Bento */}
                    <div className="bento-card glassy-bento" style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--accent)' }}>Excellence.</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>
                            Our team combines deep technical expertise with strategic business insight. We don't just write code; we architect complete digital solutions that drive growth.
                        </p>
                    </div>

                    {/* Expertise Section (The new requests) */}
                    <div className="bento-card bento-span-3 glassy-bento" style={{ padding: '60px 40px' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>Our Core Capabilities</h2>

                        <div className="capabilities-grid">
                            <div className="capability-cell">
                                <div className="cap-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                </div>
                                <h4>App & Web Development</h4>
                                <p>From immersive React workflows to high-performance React Native mobile apps, we build scalable architectures designed to dominate your market.</p>
                            </div>

                            <div className="capability-cell">
                                <div className="cap-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                </div>
                                <h4>Digital Marketing</h4>
                                <p>Data-driven brand strategies, advanced SEO, and conversion-optimized campaigns to ensure your newly built platform actually reaches your audience.</p>
                            </div>

                            <div className="capability-cell">
                                <div className="cap-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                                </div>
                                <h4>Server & Cloud Management</h4>
                                <p>Robust infrastructure handling. We setup, optimize, and manage your backend environments (Node.js, AWS, MongoDB) ensuring zero-downtime scalability.</p>
                            </div>

                            <div className="capability-cell">
                                <div className="cap-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                </div>
                                <h4>UI/UX Mastery</h4>
                                <p>What sets us apart is our relentless pursuit of visual excellence. Your product won't just function flawlessly—it will look extraordinarily premium.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .about-page {
                    background: var(--bg);
                }
                .about-bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    grid-auto-rows: minmax(300px, auto);
                }
                .glassy-bento {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 32px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .glassy-bento:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
                }
                .bento-span-2 {
                    grid-column: span 2;
                }
                .bento-span-3 {
                    grid-column: span 3;
                }
                .hero-bento {
                    min-height: 400px;
                }
                
                .capabilities-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 32px;
                }
                .capability-cell {
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                .capability-cell:hover {
                    background: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                }
                .cap-icon {
                    font-size: 2rem;
                    margin-bottom: 16px;
                }
                .capability-cell h4 {
                    font-size: 1.25rem;
                    margin-bottom: 12px;
                    color: var(--text);
                }
                .capability-cell p {
                    font-size: 0.95rem;
                    color: var(--text-sub);
                    line-height: 1.6;
                }

                @media (max-width: 992px) {
                    .about-bento-grid {
                        grid-template-columns: 1fr;
                    }
                    .bento-span-2, .bento-span-3 {
                        grid-column: span 1;
                    }
                    .capabilities-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
