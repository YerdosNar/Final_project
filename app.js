const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const tweetRoutes = require('./routes/tweet');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

console.log('Setting up routes...');
app.use('/api/user', userRoutes); // Make sure this points to user routes
app.use('/api/tweet', tweetRoutes); // Make sure this points to tweet routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
