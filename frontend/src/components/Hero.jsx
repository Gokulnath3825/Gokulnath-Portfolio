import React, { useState, useEffect } from 'react';
import heroImage from "../assets/hero.png";

export default function Hero({ onContactClick }) {
  const words = ['Full-Stack & AI Enthusiast', 'CSE Undergrad @ Shanmugha', 'Python & React Developer', 'Problem Solver'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText((prev) => activeWord.substring(0, prev.length + 1));

        if (currentText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
      } else {
        setCurrentText((prev) => activeWord.substring(0, prev.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(120);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 50 : 100);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section id="home" className="section hero-layout" aria-label="Home Section">
      <div className="hero-left">
        {/* Availability Badge */}
        <div className="hero-status-pill">
          <span className="status-dot"></span>
          <span>Open for Internships & AI/Web Projects</span>
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Gokulnath</span>
        </h1>

        <div className="hero-typing">
          <span className="typing-text">{currentText}</span>
          <span className="cursor-blink">|</span>
        </div>

        <p className="hero-desc">
          3rd-Year Computer Science Student crafting modern, performant, and intelligent web software. 
          Specialized in <strong>Python</strong>, <strong>JavaScript</strong>, <strong>Java</strong>, and <strong>AI/NLP solutions</strong> like my AI Resume Analyzer.
        </p>

        <div className="hero-cta">
          <a
            className="btn-primary"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Projects
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button className="btn-ghost" onClick={onContactClick}>
            Get In Touch
          </button>
        </div>

        <div className="hero-meta">
          <span>📍 <strong>Bhavani, Tamil Nadu, India</strong></span>
          <span className="dot-divider">•</span>
          <span>🎓 <strong>Shanmugha College of Engineering</strong></span>
        </div>

        <div className="social-links">
          <a href="https://github.com/Gokulnath3825" className="social-btn" title="GitHub Profile" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/gokulnath-kesavan-9780a3282" className="social-btn" title="LinkedIn Profile" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:gokulj172@gmail.com" className="social-btn" title="Email Gokulnath" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://leetcode.com/u/Gokulnath3825/" className="social-btn" title="LeetCode Profile" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.178 1.824.645l2.697 2.607c.507.493 1.288.493 1.795 0s.507-1.288 0-1.78l-2.697-2.607c-1.001-.987-2.316-1.507-3.819-1.507s-2.818.52-3.819 1.507l-4.319 4.38c-.987.986-1.507 2.301-1.507 3.805 0 1.503.52 2.818 1.507 3.805l4.332 4.363c1.001.986 2.316 1.507 3.819 1.507s2.818-.52 3.819-1.507l2.697-2.607c.507-.493.507-1.288 0-1.78s-1.288-.493-1.795 0zm6.541-6.195H11.238c-.71 0-1.285.575-1.285 1.285s.575 1.285 1.285 1.285h11.405c.71 0 1.285-.575 1.285-1.285s-.575-1.285-1.285-1.285z"/></svg>
          </a>
          <a href="https://www.hackerrank.com/profile/e23cs032" className="social-btn" title="HackerRank Profile" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="profile-wrapper">
          <div className="profile-glow-ring"></div>
          <div className="profile-card">
            <img src={heroImage} alt="Gokulnath - CSE Undergrad & Developer" />
          </div>
          <div className="hero-floating-badge badge-top">
            <span className="badge-icon">⚡</span>
            <span>Full-Stack & AI</span>
          </div>
          <div className="hero-floating-badge badge-bottom">
            <span className="badge-icon">💻</span>
            <span>3rd Year CSE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
