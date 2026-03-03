import React, { useEffect, useRef } from 'react';

const STEPS = [
    {
        num: 1,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        title: 'Initial Consultation',
        desc: 'We discuss your project requirements and create a sample development for your approval.',
    },
    {
        num: 2,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: 'Advance Payment',
        desc: 'Secure your project slot with an advance payment to begin the design process.',
    },
    {
        num: 3,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
        ),
        title: 'UI/UX Design',
        desc: 'Our designers craft intuitive and beautiful interfaces tailored to your brand identity.',
    },
    {
        num: 4,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
        ),
        title: 'Design Approval',
        desc: 'Review and approve the designs. We incorporate your feedback until you\'re satisfied.',
    },
    {
        num: 5,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        title: 'Development',
        desc: 'Our developers bring the approved designs to life with clean, efficient, scalable code.',
    },
    {
        num: 6,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-4.51L1 10" />
            </svg>
        ),
        title: 'Revisions',
        desc: 'Request changes and refinements. We ensure every detail is exactly how you want it.',
    },
    {
        num: 7,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
                <polyline points="9 15 11 17 15 13" />
            </svg>
        ),
        title: 'Final Draft',
        desc: 'Complete testing and quality assurance before delivering the fully polished product.',
    },
    {
        num: 8,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
        title: 'Project Handover',
        desc: 'Full project delivery with documentation, source files, and final payment completion.',
    },
];

const STATS = [
    { value: '100%', label: 'Transparent Process' },
    { value: '24/7', label: 'Client Communication' },
    { value: 'On-Time', label: 'Delivery Guaranteed' },
];

const Workflow: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('wf-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const row1 = STEPS.slice(0, 4);
    const row2 = STEPS.slice(4, 8);

    return (
        <section id="workflow" className="wf-section" ref={sectionRef}>
            {/* Header */}
            <div className="wf-header">
                <div className="wf-header-left">
                    <span className="wf-label">OUR PROCESS</span>
                    <h2 className="wf-title">How we work</h2>
                </div>
                <p className="wf-subtitle">
                    A transparent, step-by-step workflow designed to deliver
                    exceptional results and build lasting trust.
                </p>
            </div>

            {/* Row 1 */}
            <div className="wf-row">
                {row1.map((step, i) => (
                    <React.Fragment key={step.num}>
                        <div className={`wf-card delay-${step.num}`}>
                            <span className="wf-badge">{step.num}</span>
                            <div className="wf-icon-wrap animated-icon">{step.icon}</div>
                            <h3 className="wf-card-title">{step.title}</h3>
                            <p className="wf-card-desc">{step.desc}</p>
                            <div className="wf-check">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="check-svg">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        </div>
                        {i < 3 && (
                            <div className={`wf-arrow-wrap delay-${step.num}`}>
                                <div className="wf-arrow">
                                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                                        <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animated-dash-line" />
                                        <polyline points="34 4 40 10 34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* The Bridge (Connecting Row 1 End to Row 2 Start) */}
            <div className="wf-bridge delay-4">
                <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="bridge-svg">
                    <path d="M 10 0 Q 50 0 50 40 V 80 Q 50 120 10 120" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="6 6" className="animated-dash-line" />
                    <polyline points="16 114 10 120 16 126" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* Row 2 (Reversed Visual Order) */}
            <div className="wf-row wf-row-reverse" style={{ direction: 'rtl' }}>
                {row2.map((step, i) => (
                    <React.Fragment key={step.num}>
                        <div className={`wf-card delay-${step.num}`} style={{ direction: 'ltr' }}>
                            <span className="wf-badge">{step.num}</span>
                            <div className="wf-icon-wrap animated-icon">{step.icon}</div>
                            <h3 className="wf-card-title">{step.title}</h3>
                            <p className="wf-card-desc">{step.desc}</p>
                            <div className="wf-check">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="check-svg">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        </div>
                        {i < 3 && (
                            <div className={`wf-arrow-wrap delay-${step.num}`}>
                                <div className="wf-arrow" style={{ transform: 'scaleX(-1)' }}>
                                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                                        <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animated-dash-line" />
                                        <polyline points="34 4 40 10 34 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Stats */}
            <div className="wf-stats">
                {STATS.map((s) => (
                    <div key={s.label} className="wf-stat">
                        <span className="wf-stat-value">{s.value}</span>
                        <span className="wf-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Workflow;
