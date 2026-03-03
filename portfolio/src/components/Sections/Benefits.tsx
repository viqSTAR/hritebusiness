import React from 'react';

const testimonials = [
    {
        quote: "HRITE transformed our operations. Their ability to deliver a complex CRM within 4 weeks while maintaining pixel-perfect design was staggering.",
        name: "Sarah Jenkins",
        role: "Head of Operations, NexaCorp",
        colorClass: "bento-pastel-blue",
        emoji: "👩🏼‍💻"
    },
    {
        quote: "The performance advertising campaigns they built for us yielded a 300% ROI in the first quarter. Pure strategic brilliance.",
        name: "David Kim",
        role: "CMO, Elevate Retail",
        colorClass: "bento-pastel-yellow",
        emoji: "👨🏻‍💼"
    },
    {
        quote: "We needed a team that understood both beautiful aesthetics and scalable AWS infrastructure. HRITE nailed every single requirement.",
        name: "Elena Rodriguez",
        role: "Founder, ArtistryApp",
        colorClass: "bento-pastel-purple",
        emoji: "👩🏽‍🎨"
    },
    {
        quote: "Their social media marketing completely revitalized our brand presence. The community engagement is through the roof.",
        name: "Marcus Thorne",
        role: "Director, Thorne Lifestyle",
        colorClass: "bento-pastel-grey",
        emoji: "🧑🏾‍🦱"
    },
    {
        quote: "As an enterprise, security and data integrity are our top priorities. HRITE delivered a bulletproof platform that looks like a modern consumer app.",
        name: "Dr. Alistair Vance",
        role: "CTO, MedTech Global",
        colorClass: "bento-light-grey",
        emoji: "🧔🏻‍♂️"
    },
    {
        quote: "The 'Fresh' ecommerce build was flawless. Customers love the UI, and our backend fulfillment is finally automated. 10/10.",
        name: "Jessica Wu",
        role: "CEO, Fresh Farms Local",
        colorClass: "bento-pastel-blue",
        emoji: "👩🏻"
    },
];

const Benefits: React.FC = () => (
    <section id="benefits" className="page-wrapper" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="features-header text-center">
            <span className="pill-tag" style={{ marginBottom: '16px' }}>Worldwide Customers</span>
            <h2>Loved by ambitious teams.</h2>
            <p>We partner with forward-thinking companies to build<br />industry-leading digital products and campaigns.</p>
        </div>

        <div className="testimonials-grid">
            {testimonials.map((t, i) => (
                <div key={i} className={`testimonial-card ${t.colorClass}`}>
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-author">
                        <div className="testimonial-avatar">{t.emoji}</div>
                        <div>
                            <div className="testimonial-name">{t.name}</div>
                            <div className="testimonial-role">{t.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Benefits;
