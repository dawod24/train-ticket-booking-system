import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SeatSelection from './SeatSelection';

jest.mock('axios');

describe('SeatSelection', () => {
    it('renders seats and allows selection', async () => {
        const mockSeats = [
            { number: '1A', isBooked: false },
            { number: '1B', isBooked: true },
            { number: '2A', isBooked: false },
        ];

        axios.get.mockResolvedValue({ data: mockSeats });

        const mockOnSeatSelect = jest.fn();
        const { getByText, queryByText } = render(
            <SeatSelection trainId="123" onSeatSelect={mockOnSeatSelect} />
        );

        await waitFor(() => expect(getByText('1A')).toBeInTheDocument());

        expect(getByText('1B')).toBeDisabled();
        expect(queryByText('2B')).not.toBeInTheDocument();

        fireEvent.click(getByText('1A'));
        expect(mockOnSeatSelect).toHaveBeenCalledWith(['1A']);

        fireEvent.click(getByText('2A'));
        expect(mockOnSeatSelect).toHaveBeenCalledWith(['1A', '2A']);
    });
});