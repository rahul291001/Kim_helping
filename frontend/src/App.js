// src/App.js

import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import PropertyCard from './components/PropertyCard';
import './App.css'; // Assuming some basic styling

function App() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch properties from the backend
    const fetchProperties = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            // Construct URLSearchParams from the filters object
            const formData = new URLSearchParams();
            for (const key in filters) {
                if (filters[key]) { // Only add non-empty filter values
                    formData.append(key, filters[key]);
                }
            }

            const response = await fetch('http://localhost:3000/api/properties', { // Make sure this URL matches your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(), // Convert URLSearchParams to a string
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get error message from backend
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            setProperties(data);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError('Failed to load properties. Please try again later.');
            setProperties([]); // Clear properties on error
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch initial random properties on component mount
    useEffect(() => {
        fetchProperties({}); // Fetch with no filters initially
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="App container mt-5">
            <h1 className="mb-4 text-center">Property Finder</h1>

            <div className="form-section mb-4 pb-3 border-bottom">
                {/* Pass the fetchProperties function to the FilterForm */}
                <FilterForm onSubmit={fetchProperties} />
            </div>

            <hr />

            <h2 className="mb-3">Available Listings</h2>
            <div id="propertyListings" className="row">
                {loading && <p className="text-center">Loading properties...</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {!loading && !error && properties.length === 0 && (
                    <p className="text-center">No properties found matching your criteria.</p>
                )}
                {!loading && !error && properties.length > 0 && properties.map(property => (
                    // Render PropertyCard for each property
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
}

export default App;