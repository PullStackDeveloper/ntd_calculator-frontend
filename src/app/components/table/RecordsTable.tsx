'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Pagination from './Pagination';
import LoginModal from "@/app/components/loginModal/LoginModal";

interface RecordsTableProps {
    token: string;
    refreshRecords: boolean;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ token, refreshRecords }) => {
    const [records, setRecords] = useState<any[]>([]);
    const [originalRecords, setOriginalRecords] = useState<any[]>([]);
    const [originalRecordsCount, setOriginalRecordsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const fetchRecords = useCallback(async (page = 1, limit = 5) => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_RECORD_API}/records?page=${page}&limit=${limit}`, {
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
            setRecords(result.data || []);
            setOriginalRecords(result.data || []);
            setTotalRecords(result.count);
            setOriginalRecordsCount(result.count);
        } catch (error) {
            console.error("Error fetching records:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchRecords(currentPage, 5);
    }, [fetchRecords, currentPage, refreshRecords]); // Adiciona refreshRecords à lista de dependências

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        setCurrentPage(1);
        if (query) {
            const filteredRecords = originalRecords.filter(record =>
                Object.values(record).some(value =>
                    String(value).toLowerCase().includes(query)
                )
            );
            setRecords(filteredRecords);
            setTotalRecords(filteredRecords.length);
        } else {
            setRecords(originalRecords);
            setTotalRecords(originalRecordsCount);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_RECORD_API}/records/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                setShowModal(true);
                return;
            }
            if (response.ok) {
                fetchRecords(currentPage, 5); // Recarrega os registros após a exclusão
            } else {
                console.error("Failed to delete record:", await response.json());
            }
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search records..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Operation Type</th>
                        <th>Amount</th>
                        <th>User Balance</th>
                        <th>Operation Response</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.length > 0 ? (
                        records.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.operationType}</td>
                                <td>{record.amount}</td>
                                <td>{record.userBalance}</td>
                                <td>{record.operationResponse}</td>
                                <td>{new Date(record.date).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(record.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No records found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )}
            <Pagination
                currentPage={currentPage}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
            />
            <LoginModal show={showModal} />
        </div>
    );
};

export default RecordsTable;
