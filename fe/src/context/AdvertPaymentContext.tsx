import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SERVER } from '../Constants';

// Define the AdvertPayment interface
export interface AdvertPayment {
    _id: string;
    advertId: string;
    isPaid: boolean;
    createdAt: string;
    displayCount: number;
    maxDisplayCount: number;
    daysToShow: number;
    expiresAt: string;
    paymentMethod: string;
    paymentReference: string;
}

// Define the context properties
interface AdvertPaymentContextProps {
    payments: AdvertPayment[];
    fetchPayments: () => Promise<void>;
    createPayment: (payment: Omit<AdvertPayment, '_id' | 'createdAt' | 'expiresAt'>) => Promise<void>;
    updatePayment: (id: string, data: Partial<AdvertPayment>) => Promise<void>;
}

// Create the context with default values
const AdvertPaymentContext = createContext<AdvertPaymentContextProps | undefined>(undefined);

// Define the provider component
export const AdvertPaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [payments, setPayments] = useState<AdvertPayment[]>([]);

    // Fetch all payments
    const fetchPayments = async () => {
        try {
            const response = await fetch(`${SERVER}/api/advertPayments`);
            if (!response.ok) throw new Error('Failed to fetch payments');
            const data: AdvertPayment[] = await response.json();
            setPayments(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Create a new payment
    const createPayment = async (payment: Omit<AdvertPayment, '_id' | 'createdAt' | 'expiresAt'>) => {
        try {
            const response = await fetch(`${SERVER}/api/advertPayments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payment),
            });
            if (!response.ok) throw new Error('Failed to create payment');
            const newPayment: AdvertPayment = await response.json();
            setPayments((prev) => [...prev, newPayment]);
        } catch (error) {
            console.error(error);
        }
    };

    // Update a payment (e.g., increment display count or mark as paid)
    const updatePayment = async (id: string, data: Partial<AdvertPayment>) => {
        try {
            const response = await fetch(`/api/advertPayments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Failed to update payment');
            const updatedPayment: AdvertPayment = await response.json();
            setPayments((prev) =>
                prev.map((payment) => (payment._id === id ? updatedPayment : payment))
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AdvertPaymentContext.Provider value={{ payments, fetchPayments, createPayment, updatePayment }}>
            {children}
        </AdvertPaymentContext.Provider>
    );
};

// Custom hook to use the AdvertPaymentContext
export const useAdvertPaymentContext = () => {
    const context = useContext(AdvertPaymentContext);
    if (!context) {
        throw new Error('useAdvertPaymentContext must be used within an AdvertPaymentProvider');
    }
    return context;
};
