const API_URL = 'http://localhost:5000/api';

export const searchTrains = async (from, to, date) => {
    try {
        const response = await fetch(`${API_URL}/trains?from=${from}&to=${to}&date=${date}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching trains:', error);
        return [];
    }
};

// Add more API calls as needed