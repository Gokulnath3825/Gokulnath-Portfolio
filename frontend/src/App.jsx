import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import BackgroundCanvas from './components/BackgroundCanvas';

const FALLBACK_DATA = {
  skills: [
    { id: 1, name: 'JavaScript', percentage: 50, details: 'ES6, DOM, Fetch API, small projects' },
    { id: 2, name: 'Java', percentage: 80, details: 'Core Java, OOP, small console & GUI apps' },
    { id: 3, name: 'Python', percentage: 50, details: 'Scripting, small Flask prototypes, data parsing' },
    { id: 4, name: 'HTML', percentage: 95, details: 'Semantic HTML, accessibility basics' },
    { id: 5, name: 'CSS', percentage: 90, details: 'Layouts, Flexbox, Grid, animations' },
    { id: 6, name: 'C Programming', percentage: 75, details: 'Foundations, pointers, arrays' },
    { id: 7, name: 'MySQL', percentage: 60, details: 'Basic queries, relational design' },
    { id: 8, name: 'DSA (Basics)', percentage: 55, details: 'Arrays, linked lists, searching & sorting' }
  ],
  projects: [
    { id: 1, title: 'Personal Portfolio', description: 'Animated full-stack portfolio built with React, Node.js, Express, and MySQL.', tags: 'React, Node, MySQL, CSS' },
    { id: 2, title: 'Student Management App', description: 'CRUD application developed using Java and MySQL with console/web interfaces.', tags: 'Java, MySQL, JDBC' },
    { id: 3, title: 'PDF Summarizer', description: 'A Flask web application that summarizes key sentences from uploaded PDF documents.', tags: 'Python, Flask, NLP, API' }
  ],
  education: [
    { id: 1, degree: 'B.E Computer Science Engineering', institution: 'Shanmugha College of Engineering & Technology', duration: '2026 - Present', details: 'Batch 2023-27 • Regulation 2023' },
    { id: 2, degree: 'HSC & SSLC', institution: 'Govt Boys Higher Secondary School', duration: 'PassOut on 2023', details: 'Focus on general science and mathematics' }
  ]
};

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);
  const [dbStatus, setDbStatus] = useState('Connecting to DB...');

  // Fetch dynamic portfolio data from MySQL database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/portfolio-data');
        if (res.ok) {
          const data = await res.json();
          setPortfolioData(data);
          setDbStatus('Connected to MySQL Database');
        } else {
          setDbStatus('MySQL server response error. Using offline fallback.');
        }
      } catch (error) {
        console.warn('Backend server offline. Loading default portfolio content.');
        setDbStatus('MySQL server offline. Using offline fallback.');
      }
    };
    fetchData();
  }, []);

  // Sync dark/light theme state with document body styling
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  // Scroll detection to highlight the active section in navigation bar
  useEffect(() => {
    if (showWelcome) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showWelcome]);

  const handleLinkClick = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  if (showWelcome) {
    return <Welcome onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <BackgroundCanvas />
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>
      <Navbar
        activeSection={activeSection}
        onLinkClick={handleLinkClick}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/* Dynamic DB Status Indicator (Subtle Floating Badge) */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '50px',
          padding: '6px 16px',
          fontSize: '0.8rem',
          color: dbStatus.includes('Connected') ? 'var(--accent-mint)' : 'var(--text-muted)',
          backdropFilter: 'var(--glass-blur)',
          zIndex: 999,
          boxShadow: '0 4px 10px var(--shadow-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: dbStatus.includes('Connected') ? 'var(--accent-mint)' : '#f87171',
            display: 'inline-block'
          }}></span>
          {dbStatus}
        </div>

        <Hero onContactClick={() => handleLinkClick('contact')} />
        <About />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Education education={portfolioData.education} />
        <Contact onAdminClick={() => setIsAdminOpen(true)} />
      </main>

      <footer className="footer">
        <div className="social-links">
          <a href="mailto:gokulj172@gmail.com" className="social-btn" title="Email" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </a>
          <a href="https://github.com/Gokulnath3825" className="social-btn" title="GitHub" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/gokulnath-kesavan-9780a3282" className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Gokulnath. All Rights Reserved.</p>
      </footer>

      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </>
  );
}
