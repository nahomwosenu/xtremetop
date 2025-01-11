// src/contexts/RegionContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SERVER } from '../Constants';

interface Region {
    _id: string;
    name: string;
}

interface RegionContextProps {
    regions: Region[];
    loading: boolean;
    fetchRegions: () => Promise<void>;
}

export const RegionContext = createContext<RegionContextProps>({
    regions: [],
    loading: true,
    fetchRegions: async () => { },
});

interface RegionProviderProps {
    children: ReactNode;
}

export const RegionProvider: React.FC<RegionProviderProps> = ({ children }) => {
    const [regions, setRegions] = useState<Region[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchRegions = async () => {
        try {
            setLoading(true);
            const res = await fetch(SERVER + '/reviews/regions');
            if (res.ok) {
                const data = await res.json();
                setRegions(data);
            } else {
                throw new Error('Failed to fetch regions');
            }
        } catch (error) {
            console.error('Error fetching regions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    return (
        <RegionContext.Provider value={{ regions, loading, fetchRegions }}>
            {children}
        </RegionContext.Provider>
    );
};
