import React from 'react';
import bentoWebDev from '../../assets/mockups/web.png';
import bentoUiDesign from '../../assets/mockups/ui.png';
import bentoAds from '../../assets/mockups/ads.png';

/* ─── SVG Outline Icons (Features) ───────────────────────── */
const RocketIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const UsersIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const GearIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

/* ─── Branding Mini Icons ───────────────────────── */
const WebIcon = () => <div className="mini-icon" style={{ background: '#111827', color: '#fff' }}>JS</div>;
const FigmaIcon = () => <div className="mini-icon" style={{ background: '#000', color: '#fff' }}>Fa</div>;
const AdIcon = () => <div className="mini-icon" style={{ background: '#FF5C00', color: '#fff' }}>Ad</div>;

const Services: React.FC = () => {
    return (
        <section id="services" className="page-wrapper">

            {/* Part 1: Distinct Features */}
            <div className="features-header text-center">
                <h2>Uncover Our Distinct Features</h2>
                <p>Website construction entails the creation and design of online platforms,<br />encompassing layout, content, and user interaction.</p>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon"><RocketIcon /></div>
                    <h3>Project Display</h3>
                    <p>Showcase portfolio projects with visually appealing and effective layouts to attract potential clients.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><UsersIcon /></div>
                    <h3>Client Feedback</h3>
                    <p>Build credibility by displaying dynamic testimonials from satisfied clients on your site.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><GearIcon /></div>
                    <h3>Services Overview</h3>
                    <p>Detailed, interactive listings to engage visitors and provide insights into your services.</p>
                </div>
            </div>

            {/* Part 2: Professional Services Bento */}
            <div className="services-bento-container">
                <div className="bento-header">
                    <span className="pill-tag" style={{ marginBottom: '16px' }}>Our services</span>
                    <div className="bento-title-row">
                        <h2>Professional Services That<br />Showcase Our Expertise.</h2>
                        <p className="bento-intro">
                            From creative design to technical solutions, our services<br />define industry excellence.
                        </p>
                    </div>
                </div>

                <div className="bento-grid-new">
                    {/* Card 1: Web Dev (Large Left) */}
                    <div className="bento-card-new bento-light-grey">
                        <div className="bento-mockup web-mockup" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                            <img src={bentoWebDev} alt="Web Mockup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="bento-content">
                            <h3>Website or web service development</h3>
                            <p>We develop beautiful design and user-friendly interfaces for websites and mobile applications.</p>
                            <div className="bento-footer">
                                <WebIcon />
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="bento-column">
                        {/* Card 2: Social Media (Top Right/Mid) */}
                        <div className="bento-card-new bento-pastel-yellow">
                            <div className="bento-content">
                                <h3>Social Media Marketing</h3>
                                <p>Comprehensive organic growth strategies across Instagram, LinkedIn, and Facebook. We build communities, not just follower counts.</p>
                                <div className="avatars-row">
                                    <span className="avatar">👨🏽‍💻</span>
                                    <span className="avatar">👩🏻‍🎨</span>
                                    <span className="avatar">🧑🏼‍💼</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Performance Ads */}
                        <div className="bento-card-new bento-pastel-blue">
                            <div className="bento-content">
                                <h3>Performance Advertising</h3>
                                <p>Targeted Google, Meta, and LinkedIn Ad campaigns designed for maximum ROI and lead generation.</p>
                                <div className="bento-footer">
                                    <AdIcon />
                                </div>
                            </div>
                            <div className="bento-mockup ad-mockup" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                                <img src={bentoAds} alt="Ads Mockup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bento-column">
                        {/* Card 4: UX/UI */}
                        <div className="bento-card-new bento-pastel-grey">
                            <div className="bento-mockup ui-mockup" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
                                <img src={bentoUiDesign} alt="UI Mockup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="bento-content">
                                <h3>UX & UI Design</h3>
                                <p>We develop beautiful design and user-friendly interfaces for websites and mobile applications.</p>
                                <div className="bento-footer">
                                    <FigmaIcon />
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Automation */}
                        <div className="bento-card-new bento-pastel-purple">
                            <div className="bento-content">
                                <h3>Business Automation</h3>
                                <p>To automate business processes and improve the work of the sales department (CRM / ERP).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
