const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bncoe',
    database: 'course_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Routes

// Get all courses
app.get('/courses', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
    
});

// Add a new course
app.post('/courses', (req, res) => {
    const { name, duration, price } = req.body;
    const sql = 'INSERT INTO courses (name, duration, price) VALUES (?, ?, ?)';
    db.query(sql, [name, duration, price], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Course added', courseId: result.insertId });
    });
});

// Update a course
app.put('/courses/:id', (req, res) => {
    const { name, duration, price } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE courses SET name = ?, duration = ?, price = ? WHERE id = ?';
    db.query(sql, [name, duration, price, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Course updated' });
    });
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM courses WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Course deleted' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
