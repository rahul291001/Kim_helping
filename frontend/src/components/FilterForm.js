// src/components/FilterForm.js

import React, { useState } from 'react';

function FilterForm({ onSubmit }) {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [bedrooms, setBedrooms] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Construct filters object from state
        const filters = {
            location,
            propertyType,
            bedrooms,
        };
        onSubmit(filters); // Call the prop function to fetch properties
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="location" className="form-label">Location <span className="text-danger">*</span></label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Porto, Barcelona"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="propertyType" className="form-label">Property Type</label>
                <select
                    className="form-select"
                    id="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condominium">Condominium</option>
                    <option value="Loft">Loft</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Guesthouse">Guesthouse</option>
                    <option value="Serviced apartment">Serviced apartment</option>
                    <option value="Bed and breakfast">Bed and breakfast</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="bedrooms" className="form-label">Number of Bedrooms</label>
                <select
                    className="form-select"
                    id="bedrooms"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Search Properties</button>
        </form>
    );
}

export default FilterForm;