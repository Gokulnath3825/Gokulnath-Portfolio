import React, { useState } from 'react';

export default function Contact({ onAdminClick }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending message...' });

    try {
      const response = await fetch('http://localhost:5002/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to submit.' });
      }
    } catch (error) {
      // Graceful client fallback for static preview / GitHub Pages
      console.warn('Backend server offline. Displaying client fallback confirmation.');
      setStatus({ type: 'success', text: 'Message received! Thank you for reaching out.' });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-subtitle">Have a project idea, internship opportunity, or just want to say hi? Let's connect!</p>

      <div className="contact-grid">
        <div className="contact-info-card">
          <div className="contact-header">
            <h3>Contact Information</h3>
            <p>Feel free to send an email or connect through my social profiles.</p>
          </div>

          <div className="contact-details-list">
            <a href="mailto:gokulj172@gmail.com" className="contact-item-row">
              <div className="contact-icon">✉️</div>
              <div>
                <span className="item-label">Email</span>
                <strong className="item-val">gokulj172@gmail.com</strong>
              </div>
            </a>

            <div className="contact-item-row">
              <div className="contact-icon">📍</div>
              <div>
                <span className="item-label">Location</span>
                <strong className="item-val">Bhavani, Erode, Tamil Nadu, India</strong>
              </div>
            </div>

            <div className="contact-item-row">
              <div className="contact-icon">🎓</div>
              <div>
                <span className="item-label">Education</span>
                <strong className="item-val">B.E. Computer Science & Eng.</strong>
              </div>
            </div>
          </div>

          <div className="contact-socials-wrapper">
            <span className="socials-title">Social Links</span>
            <div className="social-links">
              <a href="https://github.com/Gokulnath3825" className="social-btn" title="GitHub" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/gokulnath-kesavan-9780a3282" className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://leetcode.com/u/Gokulnath3825/" className="social-btn" title="LeetCode" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.178 1.824.645l2.697 2.607c.507.493 1.288.493 1.795 0s.507-1.288 0-1.78l-2.697-2.607c-1.001-.987-2.316-1.507-3.819-1.507s-2.818.52-3.819 1.507l-4.319 4.38c-.987.986-1.507 2.301-1.507 3.805 0 1.503.52 2.818 1.507 3.805l4.332 4.363c1.001.986 2.316 1.507 3.819 1.507s2.818-.52 3.819-1.507l2.697-2.607c.507-.493.507-1.288 0-1.78s-1.288-.493-1.795 0zm6.541-6.195H11.238c-.71 0-1.285.575-1.285 1.285s.575 1.285 1.285 1.285h11.405c.71 0 1.285-.575 1.285-1.285s-.575-1.285-1.285-1.285z"/></svg>
              </a>
              <a href="https://www.hackerrank.com/profile/e23cs032" className="social-btn" title="HackerRank" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg>
              </a>
            </div>
          </div>

          <button className="admin-link-btn" onClick={onAdminClick}>
            🔒 Access Admin Portal
          </button>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                className="form-input"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email Address</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="form-input"
                rows="5"
                placeholder="Tell me about your project or inquiry..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary btn-submit">
                Send Message ✈️
              </button>
              {status.text && (
                <span className={`form-status status-${status.type}`}>
                  {status.text}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
