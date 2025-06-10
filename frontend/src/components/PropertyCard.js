// src/components/PropertyCard.js

import React from 'react';

function PropertyCard({ property }) {
    const dailyPrice = property.price && property.price.$numberDecimal
        ? parseFloat(property.price.$numberDecimal).toFixed(2)
        : 'N/A';
    const reviewScore = property.review_scores && property.review_scores.review_scores_rating
        ? property.review_scores.review_scores_rating
        : 'N/A';

    // Construct the booking URL. In a full React app, you'd likely use React Router
    // for navigation and pass state or params. For now, we'll keep the direct link.
    const bookingUrl = `/bookings.html?listing_id=${property._id}`;

    return (
        <div className="col-md-6 col-lg-4 mb-4"> {/* Bootstrap grid classes for layout */}
            <div className="property-listing card h-100"> {/* Use card for better structure */}
                <div className="card-body">
                    <h3 className="card-title">
                        <a href={bookingUrl}>{property.name || 'No Name Available'}</a>
                    </h3>
                    <p className="card-text"><strong>Summary:</strong> {property.summary || 'No summary available.'}</p>
                    <div className="property-details">
                        <span><strong>Daily Price:</strong> ${dailyPrice}</span>
                        <span><strong>Review Score:</strong> {reviewScore}/100</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;