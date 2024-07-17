import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));

const mockTrains = [
    {
        _id: '1',
        name: 'Express 1',
        from: 'New York',
        to: 'Boston',
        departureTime: '2023-07-20T10:00:00.000Z',
        arrivalTime: '2023-07-20T14:00:00.000Z',
        seats: [{ isBooked: false }, { isBooked: true }]
    }
];

test('renders search results correctly', () => {
    render(<SearchResults trains={mockTrains} loading={false} error={null} />);

    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByText('Express 1')).toBeInTheDocument();
    expect(screen.getByText(/From: New York To: Boston/)).toBeInTheDocument();
    expect(screen.getByText('Available Seats: 1')).toBeInTheDocument();
    expect(screen.getByText('Select Seats')).toBeInTheDocument();
});

test('shows loading message', () => {
    render(<SearchResults trains={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading search results...')).toBeInTheDocument();
});

test('shows error message', () => {
    render(<SearchResults trains={[]} loading={false} error="Failed to fetch" />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
});

test('shows message when no trains found', () => {
    render(<SearchResults trains={[]} loading={false} error={null} />);
    expect(screen.getByText('No trains found matching your search criteria.')).toBeInTheDocument();
});