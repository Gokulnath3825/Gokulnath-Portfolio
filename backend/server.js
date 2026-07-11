const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection endpoint & boot check
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'OK', message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed', error: error.message });
  }
});

// Fetch all portfolio data (Skills, Projects, Education) dynamically from MySQL
app.get('/api/portfolio-data', async (req, res) => {
  try {
    const [skillsRows] = await pool.query('SELECT * FROM skills');
    const [projectsRows] = await pool.query('SELECT * FROM projects');
    const [educationRows] = await pool.query('SELECT * FROM education');

    res.json({
      skills: skillsRows,
      projects: projectsRows,
      education: educationRows
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data from database.' });
  }
});

// Handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({
      message: 'Message sent successfully!',
      messageId: result.insertId
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to save contact message.' });
  }
});

// Fetch messages for admin dashboard
app.get('/api/admin/messages', async (req, res) => {
  try {
    const [messagesRows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(messagesRows);
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
