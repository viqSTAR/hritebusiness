import React, { useEffect, useRef } from 'react';

// ─── Replace these GIF URLs with your own ─────────────────────────────────────
const ROW_ONE = [
    { label: 'Web Dashboard', gif: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
    { label: 'Mobile App', gif: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
    { label: 'E-Commerce', gif: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
    { label: 'Analytics', gif: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
    { label: 'CRM System', gif: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
    { label: 'UI Design', gif: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80' },
];

const ROW_TWO = [
    { label: 'Automation', gif: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
    { label: 'Real Estate', gif: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80' },
    { label: 'Code Editor', gif: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80' },
    { label: 'Social Media', gif: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80' },
    { label: 'Cloud Infra', gif: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
    { label: 'ERP Software', gif: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
];
// ─────────────────────────────────────────────────────────────────────────────

interface GifCard { label: string; gif: string; }

const GifTrack: React.FC<{ items: GifCard[]; reverse?: boolean }> = ({ items, reverse }) => {
    const doubled = [...items, ...items];
    return (
        <div className="gifs-marquee-wrapper">
            <div className={`gifs-marquee-track ${reverse ? 'reverse' : ''}`}>
                {doubled.map((item, i) => (
                    <div key={i} className="gifs-card">
                        <div className="gifs-card-img">
                            <img src={item.gif} alt={item.label} loading="lazy" />
                        </div>
                        <span className="gifs-card-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GifShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll-triggered fade-up
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('gifs-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="gifs-section" ref={sectionRef}>
            {/* Subtle divider label */}
            <div className="gifs-eyebrow">
                <span className="gifs-line" />
                <span className="gifs-eyebrow-text">Software we build</span>
                <span className="gifs-line" />
            </div>

            {/* Marquee rows */}
            <div className="gifs-rows">
                <GifTrack items={ROW_ONE} />
                <GifTrack items={ROW_TWO} reverse />
            </div>
        </section>
    );
};

export default GifShowcase;
