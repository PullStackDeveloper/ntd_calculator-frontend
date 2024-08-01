import React from 'react';
import { render } from '@testing-library/react';
import CalculatorDisplay from "@/app/components/calculator/calculator-display/calculator-display";

test('CalculatorDisplay shows the correct value', () => {
    const { getByText } = render(<CalculatorDisplay value="123" />);
    expect(getByText('123')).toBeInTheDocument();
});
