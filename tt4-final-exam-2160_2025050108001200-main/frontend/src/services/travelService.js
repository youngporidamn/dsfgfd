const API_URL = 'http://localhost:5252/api/TravelEntry';

export const travelService = {
    async getAllEntries() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch entries');
        return response.json();
    },

    async getEntry(id) {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch entry');
        return response.json();
    },

    async createEntry(entry) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        if (!response.ok) throw new Error('Failed to create entry');
        return response.json();
    },

    async updateEntry(id, entry) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        if (!response.ok) throw new Error('Failed to update entry');
        return response.json();
    },

    async deleteEntry(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete entry');
    }
}; 