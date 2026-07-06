import React from 'react';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">Academic and personal engineering products fetched from the MySQL database</p>

      <div className="projects-grid">
        {projects && projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-top">
              <h4>{project.title}</h4>
              <p className="project-desc">{project.description}</p>
            </div>
            
            <div className="project-tags">
              {project.tags && project.tags.split(',').map((tag, idx) => (
                <span key={idx} className="project-tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
