import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { openContactModal } = useModal();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on initial mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Services', href: '/#services' },
        { label: 'Work', to: '/portfolio' },
        { label: 'Team', href: '/#about' },
        { label: 'Track', to: '/track' },
        { label: 'About', to: '/about' },
    ];

    return (
        <header className={scrolled ? 'header-scrolled' : 'header-top'}>
            <div className="header-left">
                <Link to="/" className="logo-link">
                    <div className="logo-mark"></div>
                    <div className="logo-text">HRITE</div>
                </Link>
            </div>

            <nav className={`header-center ${open ? 'nav-open' : ''}`}>
                <ul>
                    {navLinks.map((link) =>
                        link.to ? (
                            <li key={link.label}>
                                <Link
                                    to={link.to}
                                    className={location.pathname === link.to ? 'nav-active' : ''}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ) : (
                            <li key={link.label}>
                                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
                            </li>
                        )
                    )}
                    <li className="mobile-only-cta">
                        <button
                            className="nav-cta-btn-mobile"
                            onClick={() => {
                                setOpen(false);
                                openContactModal();
                            }}
                        >
                            Start a Project
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="header-right">
                <button
                    className="nav-cta-btn"
                    onClick={() => {
                        setOpen(false);
                        openContactModal();
                    }}
                >
                    Start a Project
                </button>
                <button
                    className={`hamburger ${open ? 'open' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>
        </header>
    );
};

export default Header;
