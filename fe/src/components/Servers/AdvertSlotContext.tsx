import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVER } from '../../Constants';

// Typescript interface for AdvertSlot
export interface IAdvertSlot {
    _id: string;
    slot: string;
    id: string;
    bannerWidth: number;
    bannerHeight: number;
    pricePerDay: number;
}

type AdvertSlot = Omit<IAdvertSlot, '_id'>;

// Context State Type
interface AdvertSlotContextState {
    advertSlots: IAdvertSlot[];
    getAdvertSlotById: (id: string) => IAdvertSlot | undefined;
    createAdvertSlot: (advertSlot: AdvertSlot) => Promise<void>;
    fetchAdvertSlots: () => void;
}

// Initial context value
const AdvertSlotContext = createContext<AdvertSlotContextState | undefined>(undefined);

// Provider Component
export const AdvertSlotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [advertSlots, setAdvertSlots] = useState<IAdvertSlot[]>([]);

    // Fetch all AdvertSlots from API
    const fetchAdvertSlots = async () => {
        try {
            const response = await fetch(`${SERVER}/adslot/`);
            if (!response.ok) {
                throw new Error('Failed to fetch advert slots');
            }
            const data = await response.json();
            setAdvertSlots(data);
        } catch (error) {
            console.error('Failed to fetch advert slots', error);
        }
    };

    // Get AdvertSlot by ID
    const getAdvertSlotById = (id: string): IAdvertSlot | undefined => {
        return advertSlots.find(advertSlot => advertSlot._id === id);
    };

    // Create a new AdvertSlot
    const createAdvertSlot = async (advertSlot: AdvertSlot) => {
        try {
            const response = await fetch('/api/adverts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(advertSlot),
            });

            if (!response.ok) {
                throw new Error('Failed to create advert slot');
            }

            const data = await response.json();
            setAdvertSlots(prev => [...prev, data]);
        } catch (error) {
            console.error('Failed to create advert slot', error);
        }
    };

    useEffect(() => {
        fetchAdvertSlots();
    }, []);

    return (
        <AdvertSlotContext.Provider
            value={{
                advertSlots,
                getAdvertSlotById,
                createAdvertSlot,
                fetchAdvertSlots,
            }}
        >
            {children}
        </AdvertSlotContext.Provider>
    );
};

// Custom Hook to use AdvertSlotContext
export const useAdvertSlot = (): AdvertSlotContextState => {
    const context = useContext(AdvertSlotContext);
    if (!context) {
        throw new Error('useAdvertSlot must be used within an AdvertSlotProvider');
    }
    return context;
};
