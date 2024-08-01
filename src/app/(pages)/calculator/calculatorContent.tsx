'use client';

import React, { useState, useCallback } from "react";
import Calculator from "@/app/components/calculator/calculator";
import RecordsTable from "@/app/components/table/RecordsTable";
import UserBalance from "@/app/components/userBalance/UserBalance";

interface CalculatorContentProps {
    token: string;
}

const CalculatorContent: React.FC<CalculatorContentProps>  = ({ token }) => {
    const [refreshRecords, setRefreshRecords] = useState(false);

    const handleOperationComplete = useCallback(() => {
        setRefreshRecords(prev => !prev); // Toggling the state to trigger useEffect in RecordsTable
    }, []);

    return (
        <>
            <div className="row mt-5 justify-content-center">
                <div className="col-10">
                    <UserBalance token={token} refreshRecords={refreshRecords} />
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-10">
                    <Calculator token={token} onOperationComplete={handleOperationComplete} />
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="col-10">
                    <RecordsTable token={token} refreshRecords={refreshRecords} />
                </div>
            </div>
        </>
    );
}

export default CalculatorContent;
