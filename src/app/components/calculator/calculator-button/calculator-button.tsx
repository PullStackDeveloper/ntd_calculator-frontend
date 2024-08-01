import React from 'react';
import '../calculator-style.css';
interface CalculatorButtonProps {
    value: string,
    onClick: (value: string) => void,
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({value, onClick}) => {
    return (
        <button className={ ` calculators-button btn btn-outline-primary m-1` } onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default CalculatorButton;
