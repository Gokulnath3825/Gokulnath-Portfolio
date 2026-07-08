import React from 'react';
import logoImg from '../assets/favicon.jpeg';

export default function Navbar({ activeSection, onLinkClick, isDark, toggleTheme }) {
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
        </div>
      </div>
    </header>
  );
}
