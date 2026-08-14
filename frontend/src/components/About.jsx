import React from 'react';

export default function About() {
  const highlights = [
    { label: 'Academic Standing', value: '3rd Year CSE' },
    { label: 'Institution', value: 'Shanmugha CSE' },
    { label: 'Core Focus', value: 'AI & Web Engineering' },
    { label: 'Problem Solving', value: 'HackerRank & DSA' }
  ];

  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">Passionate 3rd-year CSE student building the future with code and AI</p>

      <div className="about-grid">
        <div className="about-card-main">
          <p className="about-lead">
            I am currently pursuing my <strong>Bachelor’s degree in Computer Science and Engineering</strong> at 
            <em> Shanmugha College of Engineering and Technology</em> (Batch 2023-2027).
          </p>
          <p>
            Driven by curiosity, I enjoy bridging software engineering fundamentals with modern web development 
            and artificial intelligence. From developing an <strong>AI Resume Analyzer</strong> using Python and NLP 
            to crafting high-performance full-stack applications with React, Express, and MySQL, I strive to build 
            clean, intuitive, and impactful digital products.
          </p>
          <p>
            When I'm not coding, I'm exploring new frameworks, practicing data structures and algorithms, 
            and enhancing my technical stack to stay at the cutting edge of modern software development.
          </p>

          <div className="about-details-row">
            <div className="detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-val">Bhavani, Erode, Tamil Nadu</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Degree</span>
              <span className="detail-val">B.E. Computer Science & Eng.</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-val">
                <a href="mailto:gokulj172@gmail.com">gokulj172@gmail.com</a>
              </span>
            </div>
          </div>
        </div>

        <div className="about-stats-column">
          {highlights.map((item, idx) => (
            <div key={idx} className="stat-pill-card">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
