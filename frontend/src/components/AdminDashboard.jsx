import React, { useState } from 'react';

export default function AdminDashboard({ onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthorized(true);
      fetchMessages();
    } else {
      setError('Invalid admin password.');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setError('Failed to fetch contact submissions.');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection error.');
    }
  };

  return (
    <div className="admin-overlay">
      <div className="admin-modal">
        <div className="admin-header">
          <h2>Admin Inbox (MySQL Data)</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close dashboard">×</button>
        </div>

        <div className="admin-body">
          {!isAuthorized ? (
            <div className="admin-login">
              <p>Please enter the admin password to view submissions saved in MySQL.</p>
              <form onSubmit={handleLogin} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter Password (admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
                  Unlock 🔓
                </button>
              </form>
              {error && <span className="status-error" style={{ marginTop: '10px', display: 'block' }}>{error}</span>}
            </div>
          ) : (
            <div>
              {error && <p className="status-error" style={{ marginBottom: '15px' }}>{error}</p>}
              
              {messages.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No messages received yet. Submit a message in the contact form!</p>
              ) : (
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date & Time</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((msg) => (
                        <tr key={msg.id}>
                          <td className="msg-date">
                            {new Date(msg.created_at).toLocaleString()}
                          </td>
                          <td><strong>{msg.name}</strong></td>
                          <td><a href={`mailto:${msg.email}`} style={{ color: 'var(--accent-mint)' }}>{msg.email}</a></td>
                          <td>{msg.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
