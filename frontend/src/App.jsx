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
    { id: 1, name: 'Python', percentage: 85, category: 'Languages', details: 'Scripting, Flask prototypes, NLP & AI tools, Data processing' },
    { id: 2, name: 'JavaScript (ES6+)', percentage: 85, category: 'Languages', details: 'Modern JS, DOM manipulation, Async/Await, Fetch API, React' },
    { id: 3, name: 'Java', percentage: 80, category: 'Languages', details: 'Core Java, OOP principles, Console & GUI desktop software' },
    { id: 4, name: 'HTML5', percentage: 95, category: 'Frontend', details: 'Semantic HTML, Accessibility (a11y), SEO tags' },
    { id: 5, name: 'CSS3 / Tailwind', percentage: 90, category: 'Frontend', details: 'Flexbox, Grid, Animations, Dark mode, Custom design systems' },
    { id: 6, name: 'React', percentage: 80, category: 'Frontend', details: 'Hooks, State management, Component architecture, Vite' },
    { id: 7, name: 'C Programming', percentage: 75, category: 'Languages', details: 'Foundations, Pointers, Data structures' },
    { id: 8, name: 'MySQL', percentage: 70, category: 'Backend & DB', details: 'Relational DB design, Complex queries, JDBC/Node integration' },
    { id: 9, name: 'DSA & Algorithms', percentage: 65, category: 'Fundamentals', details: 'Arrays, Linked lists, Trees, Searching & Sorting algorithms' }
  ],
  projects: [
    {
      id: 1,
      title: 'AI Resume Analyzer',
      description: 'Intelligent AI-powered resume parser and analyzer that scores candidate resumes, extracts key skills, and provides real-time improvement feedback against job descriptions.',
      tags: 'Python, Flask, NLP, AI/ML, JavaScript, CSS3',
      githubUrl: 'https://github.com/Gokulnath3825',
      liveUrl: 'https://gokulnath3825.github.io/Gokulnath-Portfolio/',
      featured: true
    },
    {
      id: 2,
      title: 'Personal Portfolio Website',
      description: 'Sleek, responsive dark-themed developer portfolio featuring large bold typography, scroll animations, micro-interactions, and full-stack integration.',
      tags: 'React, Vite, CSS3, Express, MySQL',
      githubUrl: 'https://github.com/Gokulnath3825/Gokulnath-Portfolio',
      liveUrl: 'https://gokulnath3825.github.io/Gokulnath-Portfolio/',
      featured: true
    },
    {
      id: 3,
      title: 'PDF Summarizer & Key Point Extractor',
      description: 'Flask web service that extracts text from multi-page PDF documents and automatically highlights key summary points using natural language processing techniques.',
      tags: 'Python, Flask, NLP, PyPDF2, HTML5',
      githubUrl: 'https://github.com/Gokulnath3825',
      liveUrl: '',
      featured: false
    },
    {
      id: 4,
      title: 'Student Management System',
      description: 'Full-featured CRUD application built with Core Java and MySQL to manage student records, grades, and department enrollments.',
      tags: 'Java, MySQL, JDBC, OOP',
      githubUrl: 'https://github.com/Gokulnath3825',
      liveUrl: '',
      featured: false
    }
  ],
  education: [
    { id: 1, degree: 'B.E Computer Science & Engineering', institution: 'Shanmugha College of Engineering & Technology', duration: '2023 - 2027 (3rd Year)', details: 'Current GPA: Pursuing • Regulation 2023 • Focus on Data Structures, Web Engineering & AI' },
    { id: 2, degree: 'HSC & SSLC (School Education)', institution: 'Govt Boys Higher Secondary School', duration: 'Completed 2023', details: 'Passed with high distinction in Mathematics and Computer Science' }
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

  // Scroll detection to highlight active nav link and trigger reveal animations
  useEffect(() => {
    if (showWelcome) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.15
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
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
          <a href="https://github.com/Gokulnath3825" className="social-btn" title="GitHub" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/gokulnath-kesavan-9780a3282" className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://leetcode.com/u/Gokulnath3825/" className="social-btn" title="LeetCode" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.178 1.824.645l2.697 2.607c.507.493 1.288.493 1.795 0s.507-1.288 0-1.78l-2.697-2.607c-1.001-.987-2.316-1.507-3.819-1.507s-2.818.52-3.819 1.507l-4.319 4.38c-.987.986-1.507 2.301-1.507 3.805 0 1.503.52 2.818 1.507 3.805l4.332 4.363c1.001.986 2.316 1.507 3.819 1.507s2.818-.52 3.819-1.507l2.697-2.607c.507-.493.507-1.288 0-1.78s-1.288-.493-1.795 0zm6.541-6.195H11.238c-.71 0-1.285.575-1.285 1.285s.575 1.285 1.285 1.285h11.405c.71 0 1.285-.575 1.285-1.285s-.575-1.285-1.285-1.285z"/></svg>
          </a>
          <a href="mailto:gokulj172@gmail.com" className="social-btn" title="Email" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="social-svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
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
