// controllers/propertyController.js

const Listing = require('../models/Listing'); // Import the Listing model

const getProperties = async (req, res) => {
    const { location, propertyType, bedrooms } = req.body;
    const query = {};

    if (location) {
        query['address.market'] = new RegExp(location, 'i');
    }
    if (propertyType) {
        query['property_type'] = propertyType;
    }
    if (bedrooms) {
        const numBedrooms = parseInt(bedrooms);
        if (!isNaN(numBedrooms)) {
            if (numBedrooms === 4) {
                query['bedrooms'] = { $gte: 4 };
            } else {
                query['bedrooms'] = numBedrooms;
            }
        }
    }

    try {
        let properties;
        const projection = {
            name: 1,
            summary: 1,
            price: 1,
            'review_scores.review_scores_rating': 1,
            _id: 1
        };

        if (Object.keys(query).length > 0) {
            properties = await Listing.find(query).select(projection).limit(20);
        } else {
            properties = await Listing.aggregate([
                { $sample: { size: 10 } },
                { $project: projection }
            ]);
        }

        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};

module.exports = {
    getProperties
};