import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from "@/app/components/calculator/calculator";


test('Calculator performs addition correctly', async () => {
    const mockFetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({ value: 2 }),
        })
    );
    global.fetch = mockFetch;

    const { getByText, findByText } = render(<Calculator token="fake-token" onOperationComplete={jest.fn()} />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('='));
    const display = await findByText('2');
    expect(display).toBeInTheDocument();
});
