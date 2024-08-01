'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LoginModal from "@/app/components/loginModal/LoginModal";

interface UserBalanceProps {
    token: string;
    refreshRecords: boolean;
}

const UserBalance: React.FC<UserBalanceProps> = ({ token, refreshRecords }) => {
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchBalance = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_RECORD_API}/balance`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                setShowModal(true);
                return;
            }
            const result = await response.json();
            setBalance(Number(result.amount));
        } catch (error) {
            console.error("Error fetching balance:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance, refreshRecords]); // Adiciona refreshRecords à lista de dependências

    return (
        <div className="balance-container">
            {loading ? (
                <p>Loading balance...</p>
            ) : (
                <p>Current Balance: ${balance.toFixed(2)}</p>
            )}
            {showModal && (
                <LoginModal show={showModal} />
            )}
        </div>
    );
};

export default UserBalance;
