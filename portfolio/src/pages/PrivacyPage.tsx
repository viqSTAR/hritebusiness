import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', flex: 1, width: '100%' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', letterSpacing: '-0.03em' }}>Privacy Policy</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-sub)', marginBottom: '60px', lineHeight: 1.6 }}>
                    At Hrite, we respect your privacy and are committed to protecting your personal and business information.
                </p>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Information We Collect</h2>
                        <p>We may collect basic information such as name, business name, contact details, website and project-related information, and communication data.</p>
                    </section>

                    <section className="legal-section">
                        <h2>2. How We Use Information</h2>
                        <p>Your information is used only for project communication, service delivery, support, updates, and business operations. We do not sell, rent, or trade your data.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Data Protection</h2>
                        <p>We take reasonable technical and operational measures to protect your data from unauthorized access, loss, or misuse.</p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Confidentiality</h2>
                        <p>All client information and project data are kept confidential and used strictly for project purposes.</p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Third-Party Services</h2>
                        <p>Some services may involve third-party providers (hosting, servers, tools, platforms). Their policies apply separately.</p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Data Retention</h2>
                        <p>We retain data only as long as required for project execution, legal obligations, and business operations.</p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Your Rights</h2>
                        <p>You may request access, correction, or deletion of your data after project closure where legally possible.</p>
                    </section>

                    <section className="legal-section">
                        <h2>8. Policy Updates</h2>
                        <p>Hrite may update this policy when required. Continued use of services implies acceptance of the updated policy.</p>
                    </section>
                </div>
            </div>

            <style>{`
                .legal-content .legal-section { margin-bottom: 40px; }
                .legal-section h2 { font-size: 1.25rem; margin-bottom: 12px; color: var(--text); }
                .legal-section p { font-size: 1rem; color: var(--text-sub); line-height: 1.6; }
            `}</style>
        </div>
    );
};

export default PrivacyPage;
