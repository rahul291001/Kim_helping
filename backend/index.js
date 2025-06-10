// index.js (formerly server.js)

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // <--- IMPORT CORS HERE
require('dotenv').config(); // Load environment variables

const propertyRoutes = require('./routes/propertyRoutes'); // Import your routes

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection URI
const mongoURI = process.env.MONGODB_URI;
const dbName = 'sample_airbnb'; // Your database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit if DB connection fails
    });

// Middleware
app.use(cors()); // <--- USE CORS MIDDLEWARE HERE (typically before other body parsers or routes)
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON request bodies (good practice for future APIs)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// API Routes
app.use('/api', propertyRoutes); // All routes defined in propertyRoutes will be prefixed with /api

// Fallback for root URL to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});