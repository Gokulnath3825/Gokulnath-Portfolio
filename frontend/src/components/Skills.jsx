import React, { useState, useEffect } from 'react';

export default function Skills({ skills }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, [skills]);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">Click a card to reveal descriptions. Progress bars animate dynamically from the database.</p>

      <div className="skills-grid">
        {skills && skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            onClick={() => handleCardClick(skill.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCardClick(skill.id);
              }
            }}
          >
            <div className="skill-header">
              <h3>{skill.name}</h3>
              <span className="skill-pct">{skill.percentage}%</span>
            </div>
            
            <div className="skill-bar">
              <div
                className="skill-progress"
                style={{ width: animate ? `${skill.percentage}%` : '0%' }}
              ></div>
            </div>

            {expandedCard === skill.id && (
              <div className="skill-detail">
                {skill.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
