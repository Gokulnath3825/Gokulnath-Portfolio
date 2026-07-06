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
        setStatus({ type: 'success', text: 'Message sent! Saved to database.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to submit.' });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({ type: 'error', text: 'Network error. Try running the backend server.' });
    }
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact Me</h2>
      <p className="section-subtitle">Send a message and connect - stored in MySQL database</p>

      <div className="contact-layout">
        <div className="contact-info-card">
          <div className="contact-item">
            <strong>Email</strong>
            <p>gokulj172@gmail.com</p>
          </div>
          <div className="contact-item">
            <strong>Phone</strong>
            <p>+91 73970 39114</p>
          </div>
          <div className="contact-item">
            <strong>Location</strong>
            <p>Bhavani, Tamil Nadu, India</p>
          </div>
          <button className="admin-link-btn" onClick={onAdminClick}>
            🔒 Access Admin Dashboard
          </button>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-input"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Your email address"
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
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Send Message ✉
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
