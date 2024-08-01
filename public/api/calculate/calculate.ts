// api/calculate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const calculate = (req: NextApiRequest, res: NextApiResponse) => {
    const { firstOperand, operator, secondOperand } = req.body;

    let result = 0;
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case 'sqrt':
            result = Math.sqrt(num1);
            break;
        case 'rnd':
            result = Math.random();
            break;
        default:
            res.status(400).json({ error: 'Invalid operation' });
            return;
    }

    res.status(200).json({ value: result.toString() });
};

export default calculate;
