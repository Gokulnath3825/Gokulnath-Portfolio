import React from 'react';

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About Me</h2>
      <p className="section-subtitle">Get to know my journey, academic details, and values</p>
      
      <div className="about-box">
        <div className="about-text">
          <p>
            I am currently pursuing my Bachelor’s degree in Computer Science and Engineering at Shanmugha College of Engineering and Technology, Pullipalayam, Salem. As a passionate and curious learner, I thrive at the intersection of creativity and technology, where I enjoy transforming ideas into intelligent, user-focused digital experiences.
          </p>
          <p>
            Throughout my academic journey, I have developed strong foundations in modern web development, programming, algorithms, and data-driven problem solving. I am deeply interested in building solutions that are not only functional but also intuitive, responsive, and impactful in real-world scenarios.
          </p>
          <p>
            I’m continuously exploring new technologies, refining my skills, and challenging myself to build smarter and more meaningful digital products. With a vision to grow as a versatile engineer, I aim to solve real-world problems and create solutions that enhance user experiences.
          </p>
          <div className="about-contact-bar">
            <span>Email: <strong>gokulj172@gmail.com</strong></span>
            <span>Phone: <strong>+91 73970 39114</strong></span>
          </div>
        </div>

        <div className="about-badge">
          <a href="https://www.hackerrank.com/profile/e23cs032" target="_blank" rel="noopener noreferrer" className="about-icon-box" title="HackerRank Profile">
            <svg viewBox="0 0 24 24" width="70" height="70" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="about-svg"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
