import React, { useState } from 'react';

export default function Skills({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend & DB', 'Fundamentals'];

  const filteredSkills = skills ? skills.filter((skill) => {
    if (selectedCategory === 'All') return true;
    return skill.category === selectedCategory;
  }) : [];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Skills</h2>
      <p className="section-subtitle">Core competencies and technologies I build with daily</p>

      {/* Category Tabs */}
      <div className="skill-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-pill-grid">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="skill-pill-card">
            <div className="skill-pill-top">
              <div className="skill-pill-name">
                <span className="skill-dot"></span>
                <strong>{skill.name}</strong>
              </div>
              <span className="skill-pct-badge">{skill.percentage}%</span>
            </div>

            <div className="skill-mini-bar">
              <div className="skill-mini-fill" style={{ width: `${skill.percentage}%` }}></div>
            </div>

            <p className="skill-pill-details">{skill.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
