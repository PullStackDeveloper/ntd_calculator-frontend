import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoginForm from "@/app/components/login/loginForm";

jest.mock('next-auth/react');
jest.mock('next/navigation');

test('LoginForm shows username error', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const usernameInput = getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    expect(getByText(/username must be at least 5 characters/i)).toBeInTheDocument();
});

test('LoginForm submits form', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    signIn.mockResolvedValue({ error: null });

    const { getByLabelText, getByRole } = render(<LoginForm />);
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'validuser' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
    fireEvent.click(getByRole('button', { name: /login/i }));
    expect(await signIn).toHaveBeenCalledWith('credentials', expect.anything());
});
