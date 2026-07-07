import React, { useState, useEffect } from 'react';
import heroImage from "../assets/hero.png";

export default function Hero({ onContactClick }) {
  const words = ['Software Developer', 'Problem Solver', 'CSE Student', 'Learner'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText((prev) => activeWord.substring(0, prev.length + 1));

        if (currentText === activeWord) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText((prev) => activeWord.substring(0, prev.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(150);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 60 : 120);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section id="home" className="section hero-layout" aria-label="Home Section">
      <div className="hero-left">
        <div className="hero-greeting">Hi There, I'm</div>
        <h1 className="hero-title">
          <span>Gokulnath</span>
        </h1>
        <div className="hero-typing">
          <span>{currentText}</span>
          <span className="cursor-blink">|</span>
        </div>
        <p className="hero-desc">
          I'm pursuing a B.E in Computer Science & Engineering at Shanmugha College of Engineering and Technology.
          I build accessible, animated, and premium web interfaces, with a deep interest in JavaScript, Python, Java, and database systems.
        </p>

        <div className="hero-cta">
          <a className="btn-primary" href="/resume.pdf" download="Gokulnath_Resume.pdf">
            Download CV 📥
          </a>
          <button className="btn-ghost" onClick={onContactClick}>
            Contact Me
          </button>
        </div>

        <div className="hero-meta">
          <span>Based in: <strong>Bhavani, Tamil Nadu</strong></span>
          <span>•</span>
          <span>Available: <strong>Now</strong></span>
        </div>

        <div className="social-links">
          <a href="mailto:gokulj172@gmail.com" className="social-btn" title="Email" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://github.com/Gokulnath3825" className="social-btn" title="GitHub" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/gokulnath-kesavan-9780a3282" className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="profile-halo"></div>
        <div className="profile-circle">
          <img src={heroImage} alt="Gokulnath Kesavan Profile" />
        </div>
      </div>
    </section>
  );
}
