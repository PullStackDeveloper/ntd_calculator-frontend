import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CalculatorButton from "@/app/components/calculator/calculator-button/calculator-button";

test('CalculatorButton calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<CalculatorButton value="1" onClick={handleClick} />);
    fireEvent.click(getByText('1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
