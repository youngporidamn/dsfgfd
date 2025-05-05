import React, { useState, useEffect } from 'react';
import './TravelEntryForm.css';

function TravelEntryForm({ entry, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        location: '',
        date: '',
        description: '',
        photos: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (entry) {
            setFormData({
                location: entry.location,
                date: new Date(entry.date).toISOString().split('T')[0],
                description: entry.description,
                photos: entry.photos || ''
            });
        }
    }, [entry]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const entryData = {
                ...formData,
                date: new Date(formData.date).toISOString()
            };

            console.log('Submitting entry:', entryData);
            await onSubmit(entryData);
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Failed to save entry. Please try again.');
        }
    };

    return (
        <div className="entry-form-overlay">
            <div className="entry-form">
                <h3>{entry ? 'Edit Entry' : 'New Entry'}</h3>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photos">Photo URL:</label>
                        <input
                            type="url"
                            id="photos"
                            name="photos"
                            value={formData.photos}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            {entry ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={onCancel} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TravelEntryForm; 