import React from 'react';

export default function Education({ education }) {
  const achievements = [
    '🏆 Participated & won in college coding events',
    '🚀 Built several animated web UIs and full-stack projects',
    '🎖 Completed online certification courses in JavaScript and Python'
  ];

  return (
    <section id="education" className="section">
      <div 
        style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }} 
        className="education-layout"
      >
        <div style={{ flex: '1 1 500px' }}>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic milestones retrieved from MySQL</p>
          
          <div className="timeline">
            {education && education.map((edu) => (
              <div key={edu.id} className="timeline-card">
                <div className="timeline-icon">🎓</div>
                <div className="timeline-info">
                  <strong>{edu.degree}</strong>
                  <div className="timeline-school">{edu.institution}</div>
                  <div className="timeline-duration">{edu.duration}</div>
                  <div className="timeline-desc">{edu.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 350px' }}>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">Recognitions and certifications</p>
          
          <div className="achievements-box">
            <ul className="achievements-list">
              {achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
