import React from 'react';

const About: React.FC = () => {
    const vikashTech = ['React', 'Node.js', 'React Native', 'MongoDB', 'TypeScript', 'Express'];
    const abhiTech = ['Client Relations', 'Business Dev', 'Marketing', 'Strategy'];

    return (
        <section id="about" className="section leader-section">
            <div className="leader-header">
                <span className="section-label">07 // Leadership</span>
                <h2>The Architects</h2>
            </div>

            <div className="leader-grid">
                {/* Vikash's Card */}
                <div className="leader-card">
                    <div className="leader-top">
                        <div className="leader-avatar-wrap" style={{ background: 'var(--accent)', color: '#fff' }}>
                            VP
                        </div>
                        <div className="leader-title">
                            <h3>Vikashdeep Prasad</h3>
                            <span className="leader-role">Lead Developer & Technical Strategy</span>
                        </div>
                    </div>
                    <p className="leader-desc">
                        Bridging complex backend logic with seamless frontend experiences.
                        Focused on modern web & mobile technologies and absolute efficiency.
                    </p>
                    <div className="leader-tags">
                        {vikashTech.map(t => <span key={t} className="leader-pill">{t}</span>)}
                    </div>
                </div>

                {/* Abhishek's Card */}
                <div className="leader-card">
                    <div className="leader-top">
                        <div className="leader-avatar-wrap" style={{ background: '#111', color: '#fff' }}>
                            AB
                        </div>
                        <div className="leader-title">
                            <h3>Abhishek</h3>
                            <span className="leader-role">Business Lead & Growth Strategy</span>
                        </div>
                    </div>
                    <p className="leader-desc">
                        Driving strategic growth and client partnerships to ensure every
                        digital solution translates into real-world business value.
                    </p>
                    <div className="leader-tags">
                        {abhiTech.map(t => <span key={t} className="leader-pill">{t}</span>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
