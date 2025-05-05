import React, { useState, useEffect } from 'react';
import { travelService } from '../services/travelService';
import TravelEntryForm from './TravelEntryForm';
import './TravelEntryList.css';

function TravelEntryList() {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            const data = await travelService.getAllEntries();
            setEntries(data);
            setError(null);
        } catch (err) {
            console.error('Error loading entries:', err);
            setError('Failed to load entries. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedEntry(null);
        setIsFormOpen(true);
    };

    const handleEdit = (entry) => {
        setSelectedEntry(entry);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            try {
                await travelService.deleteEntry(id);
                await loadEntries();
                setError(null);
            } catch (err) {
                console.error('Error deleting entry:', err);
                setError('Failed to delete entry. Please try again.');
            }
        }
    };

    const handleSubmit = async (entry) => {
        try {
            setIsLoading(true);
            if (selectedEntry) {
                await travelService.updateEntry(selectedEntry.id, entry);
            } else {
                await travelService.createEntry(entry);
            }
            await loadEntries();
            setIsFormOpen(false);
            setError(null);
        } catch (err) {
            console.error('Error saving entry:', err);
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="travel-journal">
            <div className="travel-journal-header">
                <h2>My Travel Journal</h2>
                <button onClick={handleAdd} className="add-button" disabled={isLoading}>
                    Add New Entry
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isFormOpen && (
                <TravelEntryForm
                    entry={selectedEntry}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}

            {isLoading && <div className="loading">Loading...</div>}

            <div className="entries-grid">
                {entries.map((entry) => (
                    <div key={entry.id} className="entry-card">
                        {entry.photos && (
                            <div className="entry-photo">
                                <img src={entry.photos} alt={entry.location} />
                            </div>
                        )}
                        <div className="entry-content">
                            <h3>{entry.location}</h3>
                            <p className="entry-date">
                                {new Date(entry.date).toLocaleDateString()}
                            </p>
                            <p className="entry-description">{entry.description}</p>
                            <div className="entry-actions">
                                <button 
                                    onClick={() => handleEdit(entry)} 
                                    className="edit-button"
                                    disabled={isLoading}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(entry.id)} 
                                    className="delete-button"
                                    disabled={isLoading}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TravelEntryList; 