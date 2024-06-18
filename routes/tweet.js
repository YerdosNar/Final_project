const express = require('express');
const router = express.Router();
const db = require('../db');

// Post a new tweet
router.post('/tweet', (req, res) => {
    const { userId, content, media } = req.body;
    const query = 'INSERT INTO tweets (user_id, content, media) VALUES (?, ?, ?)';
    db.query(query, [userId, content, media], (err, result) => {
        if (err) {
            console.error('Error inserting tweet:', err);
            res.status(500).json({ success: false, error: 'Database error' });
            return;
        }
        res.json({ success: true, tweetId: result.insertId });
    });
});

// Get all tweets
router.get('/tweets', (req, res) => {
    const query = `
        SELECT tweets.id, tweets.content, tweets.media, users.username, users.avatar 
        FROM tweets 
        JOIN users ON tweets.user_id = users.id
        ORDER BY tweets.id DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tweets:', err);
            res.status(500).json({ success: false, error: 'Database error' });
            return;
        }
        res.json(results);
    });
});


module.exports = router;
