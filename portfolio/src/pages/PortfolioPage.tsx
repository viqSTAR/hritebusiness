import React, { useState, useEffect } from 'react';

const FILTERS = ['All', 'Ecommerce', 'Real Estate', 'Mobile', 'MERN'];

interface Project {
    _id: string;
    title: string;
    description: string;
    industry: string;
    tags: string[];
    imageUrl: string;
    liveLink: string;
}

const PortfolioPage: React.FC = () => {
    const [active, setActive] = useState('All');
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://hritebusiness.vercel.app/api/projects');
                const data = await response.json();
                if (response.ok && Array.isArray(data)) {
                    setAllProjects(data);
                } else {
                    console.error("API returned an error or non-array:", data);
                    setAllProjects([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.industry === active || p.tags.includes(active));

    return (
        <div className="page-wrapper" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
            <div className="portfolio-header" style={{ marginBottom: '40px' }}>
                <div>
                    <span className="pill-tag" style={{ marginBottom: '16px' }}>Cases & Works</span>
                    <h2>Our Portfolio</h2>
                    <p style={{ color: 'var(--text-sub)', marginTop: '12px', maxWidth: '600px', fontSize: '1.1rem' }}>
                        Live demo projects delivered by Hrite — from real estate platforms to mobile apps and high-conversion e-commerce stores.
                    </p>
                </div>
            </div>

            <div className="filter-tabs" style={{ marginBottom: '60px' }}>
                {FILTERS.map(f => (
                    <button key={f} className={`filter-tab ${active === f ? 'active' : ''}`} onClick={() => setActive(f)}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="works-bento-grid">
                {loading ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: 'var(--text-sub)' }}>Loading projects...</p>
                ) : filtered.length === 0 ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: 'var(--text-sub)' }}>No projects found for this filter.</p>
                ) : (
                    filtered.map((p, i) => {
                        const colors = ['bento-pastel-blue', 'bento-pastel-grey', 'bento-light-grey', 'bento-pastel-yellow', 'bento-pastel-purple'];
                        const colorClass = colors[i % colors.length];

                        return (
                            <a key={p._id || i} href={p.liveLink} target="_blank" rel="noopener noreferrer" className={`bento-card-new ${colorClass} work-bento-card`}>
                                <div className="work-bento-content">
                                    <h3>{p.title}</h3>
                                    <p style={{ marginBottom: 0 }}>{p.description}</p>
                                    <div className="case-tags" style={{ marginTop: '16px', marginBottom: '16px' }}>
                                        {p.tags.map(t => <span key={t} className="case-pill">{t}</span>)}
                                    </div>
                                </div>
                                <div className="work-bento-mockup">
                                    <img src={p.imageUrl} alt={p.title} />
                                </div>
                            </a>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PortfolioPage;
