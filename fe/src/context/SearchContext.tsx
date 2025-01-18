import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

// Create the context with a default value of `undefined`
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Define the provider's props
interface SearchProviderProps {
    children: ReactNode;
}

// Create a provider component
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook for accessing the context
export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
