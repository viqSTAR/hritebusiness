import React, { useEffect } from 'react';

const TermsPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="page-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', flex: 1, width: '100%' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px', letterSpacing: '-0.03em' }}>Terms & Conditions</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-sub)', marginBottom: '60px', lineHeight: 1.6 }}>
                    Clear expectations for a successful partnership with Hrite.
                </p>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Project Start</h2>
                        <p>Work begins only after approval of the project scope/sample and a 50% advance payment. This advance is used for servers, databases, tools, and setup costs and is non-refundable.</p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Payments</h2>
                        <p>50% advance before starting. 50% after project completion. Delays in payment may pause the project.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Scope of Work</h2>
                        <p>We deliver only what is agreed in the project plan. Any extra features or changes will be discussed separately.</p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Timelines</h2>
                        <p>Timelines are shared in advance and may change if approvals, content, or payments are delayed.</p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Client Responsibilities</h2>
                        <p>Clients must provide accurate information, content, and timely approvals for smooth delivery.</p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Ownership</h2>
                        <p>After full payment, the client owns the final project. Hrite may showcase the work in its portfolio.</p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Data & Privacy</h2>
                        <p>Client data is handled responsibly and kept confidential.</p>
                    </section>

                    <section className="legal-section">
                        <h2>8. Third-Party Services</h2>
                        <p>Hosting, servers, tools, and platforms may be third-party services. Hrite is not responsible for their outages or policy changes.</p>
                    </section>

                    <section className="legal-section">
                        <h2>9. Service Limits</h2>
                        <p>We provide technical services, not business guarantees. Results depend on multiple external factors.</p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Termination</h2>
                        <p>Projects may be paused or closed if payments are delayed or terms are violated.</p>
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

export default TermsPage;
