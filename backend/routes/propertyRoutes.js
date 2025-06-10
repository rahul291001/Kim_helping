// routes/propertyRoutes.js

const express = require('express');
const router = express.Router(); // Create a new router instance
const propertyController = require('../controllers/propertyController'); // Import the controller

// Define the route for fetching properties
// The prefix /api is handled in index.js, so here it's just /properties
router.post('/properties', propertyController.getProperties);

module.exports = router;