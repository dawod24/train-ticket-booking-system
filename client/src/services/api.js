// client/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchTrains = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/trains`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching trains:', error);
        throw error;
    }
};

// Add more API call functions as needed
export const searchTrains = async (from, to, date) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/trains/search?from=${from}&to=${to}&date=${date}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching trains:', error);
        throw error;
    }
};
