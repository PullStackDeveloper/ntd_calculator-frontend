import React from 'react';

interface DisplayProps {
    value: string;
    history: string;
}

const CalculatorDisplay: React.FC<DisplayProps> = ({ value, history }) => {
    return (
        <div className="calculator-display">
            <div className="calculator-history">{history}</div> {/* Exibição do histórico da operação atual */}
            <div className="calculator-value">{value}</div>
        </div>
    );
};

export default CalculatorDisplay;
