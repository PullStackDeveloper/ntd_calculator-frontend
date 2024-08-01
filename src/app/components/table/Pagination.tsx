'use client';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalRecords: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalRecords, onPageChange }) => {
    const totalPages = Math.ceil(totalRecords / 5);
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                <li className="page-item">
                    <span className="page-link">
                        Page {currentPage} of {totalPages}
                    </span>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
