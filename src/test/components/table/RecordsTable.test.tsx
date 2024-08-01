import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RecordsTable from "@/app/components/table/RecordsTable";

test('RecordsTable fetches and displays records', async () => {
    const mockFetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                data: [
                    { id: 1, operationType: 'add', amount: 10, userBalance: 100, operationResponse: 'success', date: new Date().toISOString() }
                ],
                count: 1
            }),
        })
    );
    global.fetch = mockFetch;

    const { getByText } = render(<RecordsTable token="fake-token" refreshRecords={false} />);
    expect(getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(getByText(/add/i)).toBeInTheDocument());
});

test('RecordsTable filters records based on search query', async () => {
    const mockFetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                data: [
                    { id: 1, operationType: 'add', amount: 10, userBalance: 100, operationResponse: 'success', date: new Date().toISOString() },
                    { id: 2, operationType: 'subtract', amount: 5, userBalance: 95, operationResponse: 'success', date: new Date().toISOString() }
                ],
                count: 2
            }),
        })
    );
    global.fetch = mockFetch;

    const { getByText, getByPlaceholderText } = render(<RecordsTable token="fake-token" refreshRecords={false} />);
    await waitFor(() => expect(getByText(/add/i)).toBeInTheDocument());

    fireEvent.change(getByPlaceholderText(/search records/i), { target: { value: 'subtract' } });
    expect(getByText(/subtract/i)).toBeInTheDocument();
    expect(() => getByText(/add/i)).toThrow();
});
