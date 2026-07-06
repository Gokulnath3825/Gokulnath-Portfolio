USE gokul_portfolio;

-- Clear tables before inserting to prevent duplicate entries on rerun
TRUNCATE TABLE skills;
TRUNCATE TABLE projects;
TRUNCATE TABLE education;

-- Seed Skills
INSERT INTO skills (name, percentage, details) VALUES
('JavaScript', 85, 'ES6, DOM, Fetch API, small projects'),
('Java', 80, 'Core Java, OOP, small console & GUI apps'),
('Python', 75, 'Scripting, small Flask prototypes, data parsing'),
('HTML', 95, 'Semantic HTML, accessibility basics'),
('CSS', 90, 'Layouts, Flexbox, Grid, animations'),
('C Programming', 70, 'Foundations, pointers, arrays'),
('MySQL', 60, 'Basic queries, relational design'),
('DSA (Basics)', 55, 'Arrays, linked lists, searching & sorting');

-- Seed Projects
INSERT INTO projects (title, description, tags) VALUES
('Personal Portfolio', 'Animated full-stack portfolio built with React, Node.js, Express, and MySQL.', 'React, Node, MySQL, CSS'),
('Student Management App', 'CRUD application developed using Java and MySQL with console/web interfaces.', 'Java, MySQL, JDBC'),
('PDF Summarizer', 'A Flask web application that summarizes key sentences from uploaded PDF documents.', 'Python, Flask, NLP, API');

-- Seed Education
INSERT INTO education (degree, institution, duration, details) VALUES
('B.E Computer Science Engineering', 'Shanmugha College of Engineering & Technology', '2025 - Present', 'Batch 2023-27 • Regulation 2023'),
('HSC & SSLC', 'Govt Boys Higher Secondary School', 'PassOut on 2023', 'Focus on general science and mathematics');
