import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Project {
    _id: string;
    title: string;
    description: string;
    industry: string;
    tags: string[];
    imageUrl: string;
    liveLink: string;
}

interface ProjectsProps {
    limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProjects = async () => {
            try {
                const response = await fetch('https://hritebusiness.vercel.app/api/projects/featured');
                const data = await response.json();
                setProjects(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch featured projects:", error);
                setLoading(false);
            }
        };
        fetchFeaturedProjects();
    }, []);

    const displayProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <section id="projects" className="section cases-section">
            <div className="cases-header">
                <h2>Cases & Works</h2>
                <Link to="/portfolio" className="btn btn-outline-dark btn-sm-outline">
                    See all works
                </Link>
            </div>

            <div className="works-bento-grid">
                {loading ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: 'var(--text-sub)' }}>Loading featured projects...</p>
                ) : displayProjects.length === 0 ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '40px', color: 'var(--text-sub)' }}>No featured projects currently available.</p>
                ) : (
                    displayProjects.map((p, i) => {
                        const colors = ['bento-pastel-blue', 'bento-pastel-yellow', 'bento-light-grey', 'bento-pastel-grey', 'bento-pastel-purple'];
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
        </section>
    );
};

export default Projects;
