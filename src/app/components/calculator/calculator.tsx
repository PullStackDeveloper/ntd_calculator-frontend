'use client';
import React, { useState } from 'react';
import CalculatorDisplay from "@/app/components/calculator/calculator-display/calculator-display";
import CalculatorButton from "@/app/components/calculator/calculator-button/calculator-button";
import LoginModal from "@/app/components/loginModal/LoginModal";

interface CalculatorProps {
    token: string;
    onOperationComplete: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ token, onOperationComplete }) => {
    const [displayValue, setDisplayValue] = useState('0');
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
    const [operator, setOperator] = useState<string | null>(null);
    const [firstOperand, setFirstOperand] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentOperation, setCurrentOperation] = useState<string>(''); // Histórico da operação atual
    const [replaceDisplay, setReplaceDisplay] = useState(false); // Estado para controlar a substituição do display

    const operatorMapping: { [key: string]: string } = {
        '+': 'addition',
        '-': 'subtraction',
        '*': 'multiplication',
        '/': 'division',
        'sqrt': 'square_root',
        'rnd': 'random_string'
    };

    const handleButtonClick = (value: string) => {
        if (!isNaN(Number(value))) {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
    };

    const handleNumber = (number: string) => {
        if (replaceDisplay) {
            setDisplayValue(number);
            setReplaceDisplay(false);
        } else if (waitingForSecondOperand) {
            setDisplayValue(number);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue((displayValue === '0') ? number : displayValue + number);
        }

        setCurrentOperation(prev => prev + number); // Atualiza a operação atual
    };

    const handleOperator = async (value: string) => {
        switch (value) {
            case 'C':
                resetCalculator();
                break;
            case 'del':
                deleteLastCharacter();
                break;
            case '.':
                if (!displayValue.includes('.')) {
                    setDisplayValue(displayValue + '.');
                    setCurrentOperation(prev => prev + '.');
                }
                break;
            case 'sqrt':
                await performOperation('sqrt', displayValue);
                break;
            case 'rnd':
                await performOperation('rnd');
                break;
            case '-':
                // Permite número negativo se não houver número atual ou se estiver substituindo o display
                if (displayValue === '0' || replaceDisplay) {
                    setDisplayValue('-');
                    setCurrentOperation('-');
                    setReplaceDisplay(false);
                } else if (operator && firstOperand !== null) {
                    await performOperation(operator, displayValue);
                    setOperator(value);
                    setWaitingForSecondOperand(true);
                    setDisplayValue(displayValue); // Mantém o valor atual ao invés de resetar para '0'
                    setCurrentOperation(prev => prev + ' ' + value + ' '); // Atualiza a operação atual
                } else {
                    setOperator(value);
                    setWaitingForSecondOperand(true);
                    setDisplayValue(displayValue); // Mantém o valor atual
                    setCurrentOperation(prev => prev + ' ' + value + ' '); // Atualiza a operação atual
                }
                break;
            case '=':
                if (operator && firstOperand !== null) {
                    await performOperation(operator, displayValue);
                }
                setCurrentOperation(''); // Reseta a operação atual após o cálculo
                setReplaceDisplay(true); // Configura para substituir o display na próxima entrada
                break;
            default:
                if (['+', '*', '/'].includes(value)) {
                    if (firstOperand === null) {
                        setFirstOperand(displayValue);
                    } else if (operator) {
                        await performOperation(operator, displayValue);
                    }
                    setOperator(value);
                    setWaitingForSecondOperand(true);
                    setDisplayValue(displayValue); // Mantém o valor atual ao invés de resetar para '0'
                    setCurrentOperation(prev => prev + ' ' + value + ' '); // Atualiza a operação atual
                }
                break;
        }
    };

    const deleteLastCharacter = () => {
        setDisplayValue((prev) => {
            if (prev.length <= 1) {
                return '0';
            }
            return prev.slice(0, -1);
        });
        setCurrentOperation(prev => prev.slice(0, -1)); // Remove o último caractere da operação atual
    };

    const performOperation = async (operation: string, secondOperand: string | null = null) => {
        const operationType = operatorMapping[operation] || operation;

        const requestPayload = {
            firstOperand: firstOperand ? firstOperand : secondOperand,
            operator: operationType,
            secondOperand: secondOperand
        };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_OPERATION_API}/calculate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestPayload)
            });

            if (response.status === 401) {
                setShowModal(true);
                return;
            }

            const result = await response.json();
            setDisplayValue(result.value.toString());

            // Substitui o último número pelo resultado da operação
            setCurrentOperation(prev => {
                const parts = prev.trim().split(' ');
                parts[parts.length - 1] = result.value.toString();
                return parts.join(' ');
            });

            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(false);

            // Chama a função passada via props para notificar a conclusão da operação
            onOperationComplete();
        } catch (error) {
            console.error("Error performing operation:", error);
        }
    };

    const resetCalculator = () => {
        setDisplayValue('0');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setCurrentOperation(''); // Reseta a operação atual
    };

    const buttons = [
        ['C', 'del', '.', 'sqrt'],
        ['7', '8', '9', '+'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '*'],
        ['rnd', '0', '=', '/']
    ];

    return (
        <>
            <CalculatorDisplay value={displayValue} history={currentOperation} />
            <div className="container">
                {buttons.map((row, rowIndex) => (
                    <div key={rowIndex} className="row justify-content-center">
                        {row.map((value, buttonIndex) => (
                            <div key={buttonIndex} className="col-3 text-center">
                                <CalculatorButton value={value} onClick={() => handleButtonClick(value)} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <LoginModal show={showModal} />
        </>
    );
};

export default Calculator;
