import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SERVER } from '../Constants';

// Define the Advert interface
export interface Advert {
    _id: string;
    game: string;
    slot: string;
    website: string;
    title: string;
    tags: string[];
    banner: string;
    email?: string;
    period: number;
}

// Define the context properties
interface AdvertContextProps {
    adverts: Advert[];
    fetchAdverts: () => Promise<void>;
    createAdvert: (advert: Omit<Advert, '_id'>) => Promise<Advert | null>;
}

// Create the context with default values
const AdvertContext = createContext<AdvertContextProps | undefined>(undefined);

// Define the provider component
export const AdvertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [adverts, setAdverts] = useState<Advert[]>([]);

    // Fetch adverts from the backend
    const fetchAdverts = async () => {
        try {
            const response = await fetch(`${SERVER}/api/adverts`);
            if (!response.ok) {
                throw new Error(`Failed to fetch adverts: ${response.statusText}`);
            }
            const data: Advert[] = await response.json();
            setAdverts(data);
        } catch (error) {
            console.error('Failed to fetch adverts:', error);
        }
    };

    // Create a new advert
    const createAdvert = async (advert: Omit<Advert, '_id'>) => {
        try {
            const response = await fetch(`${SERVER}/api/adverts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(advert),
            });
            if (!response.ok) {
                throw new Error(`Failed to create advert: ${response.statusText}`);
            }
            const newAdvert: Advert = await response.json();
            setAdverts((prev) => [...prev, newAdvert]);
            return newAdvert;
        } catch (error) {
            console.error('Failed to create advert:', error);
        }
        return null;
    };

    return (
        <AdvertContext.Provider value={{ adverts, fetchAdverts, createAdvert }}>
            {children}
        </AdvertContext.Provider>
    );
};

// Custom hook to use the AdvertContext
export const useAdvertContext = () => {
    const context = useContext(AdvertContext);
    if (!context) {
        throw new Error('useAdvertContext must be used within an AdvertProvider');
    }
    return context;
};
