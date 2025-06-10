// models/Listing.js

const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    $numberDecimal: String
}, { _id: false });

const reviewScoresSchema = new mongoose.Schema({
    review_scores_accuracy: Number,
    review_scores_cleanliness: Number,
    review_scores_checkin: Number,
    review_scores_communication: Number,
    review_scores_location: Number,
    review_scores_value: Number,
    review_scores_rating: Number
}, { _id: false });

const addressSchema = new mongoose.Schema({
    street: String,
    suburb: String,
    government_area: String,
    market: String,
    country: String,
    country_code: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number],
        is_location_exact: Boolean
    }
}, { _id: false });

const listingSchema = new mongoose.Schema({
    _id: String,
    listing_url: String,
    name: String,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    bed_type: String,
    minimum_nights: String,
    maximum_nights: String,
    cancellation_policy: String,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    bathrooms: {
        $numberDecimal: String
    },
    amenities: [String],
    price: priceSchema,
    security_deposit: priceSchema,
    cleaning_fee: priceSchema,
    extra_people: priceSchema,
    guests_included: priceSchema,
    images: {
        thumbnail_url: String,
        medium_url: String,
        picture_url: String,
        xl_picture_url: String
    },
    host: Object,
    address: addressSchema,
    availability: Object,
    review_scores: reviewScoresSchema,
    reviews: Array
}, { collection: 'listingsAndReviews' });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;