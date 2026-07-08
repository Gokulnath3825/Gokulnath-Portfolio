import React, { useState } from 'react';
import logoImg from '../assets/favicon.jpeg';

export default function Navbar({ activeSection, onLinkClick, isDark, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="header-nav">
      <div className="nav-wrap" role="navigation" aria-label="Main Navigation">
        {/* Brand Logo Link */}
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            onLinkClick('home');
            setIsMenuOpen(false);
          }}
        >
          <img src={logoImg} alt="logo" />
          <span>Gokulnath</span>
        </a>

        {/* Central Nav Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle color theme"
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            className={`mobile-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Toggle menu"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sliding Glass Menu Drawer */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onLinkClick(link.id);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
