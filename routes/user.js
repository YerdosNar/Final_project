const express = require('express');
const router = express.Router();
const db = require('../db');

// User registration
router.post('/register', (req, res) => {
    const { username, password, avatar, name } = req.body;
    const query = 'INSERT INTO users (username, password, avatar, name) VALUES (?, ?, ?, ?)';
    db.query(query, [username, password, avatar, name], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ success: false, error: 'Database error' });
            return;
        }
        res.json({ success: true, userId: result.insertId });
    });
});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).json({ success: false, error: 'Database error' });
            return;
        }
        if (results.length > 0) {
            res.json({ success: true, userId: results[0].id, avatar: results[0].avatar, name: results[0].name });
        } else {
            res.json({ success: false, error: 'Invalid credentials' });
        }
    });
});

// Fetch user information
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT username, avatar, name FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user information:', err);
            res.status(500).json({ success: false, error: 'Database error' });
            return;
        }
        res.json(results[0]);
    });
});

module.exports = router;
