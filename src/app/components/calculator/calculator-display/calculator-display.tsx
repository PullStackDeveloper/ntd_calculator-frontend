import React from 'react';

interface DisplayProps {
    value: string;
}

const CalculatorDisplay: React.FC<DisplayProps> = ({ value }) => {
    return (
        <div className="form-control mb-2" style={{ fontSize: '2em', height: '60px' }}>
            {value}
        </div>
    );
};

export default CalculatorDisplay;
