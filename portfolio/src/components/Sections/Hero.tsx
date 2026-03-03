import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const Hero: React.FC = () => {
    const { openContactModal } = useModal();
    return (
        <section className="section hero-section">
            <div className="hero-card">
                {/* Text Content */}
                <div className="hero-content">
                    <h1>
                        Design for<br />
                        ambitious<br />
                        software<br />
                        companies
                    </h1>
                    <p className="hero-sub">
                        At HRITE, we merge creativity and strategy to craft digital
                        experiences that captivate users and elevate businesses.
                    </p>
                    <div className="hero-ctas">
                        <button onClick={openContactModal} className="btn btn-primary cta-solid-orange">
                            Schedule a call
                            <span className="btn-icon-ar">→</span>
                        </button>
                        <Link to="/track" className="btn btn-outline-dark cta-outline-dark">
                            Track projects
                        </Link>
                    </div>
                </div>

                {/* Abstract Geometric Art (Pills & Circle) */}
                <div className="hero-art-pills">
                    <div className="art-pill pill-tall"></div>
                    <div className="art-pill pill-short"></div>
                    <div className="art-circle-orange"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
