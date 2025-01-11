import React, { createContext, useState, useEffect, useContext } from "react";
import translations from "../assets/translation.json";
import { useLocation, useNavigate } from "react-router-dom";

interface TranslationContextProps {
    t: (key: string) => string;
    currentLanguage: string;
    setLanguage: (lang: string) => void;
}

// Create the context
const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState("en");
    //const location = useLocation();
    //const navigate = useNavigate();

    // Load the selected language from the URL on component mount
    useEffect(() => {
        const pathLanguage = location.pathname.split("/")[1]; // Get the first part of the URL 
        if (pathLanguage && translations[pathLanguage as keyof typeof translations]) {
            setCurrentLanguage(pathLanguage);
        }
    }, [location]);

    // Function to change the language and update the URL
    const setLanguage = (lang: string) => {
        setCurrentLanguage(lang);
        // Update the URL without reloading
        navigate(`/${lang}`, { replace: true });
    };

    // Translation function
    const t = (key: string): string => {
        return translations[currentLanguage as keyof typeof translations]?.[key] || key;
    };

    return (
        <TranslationContext.Provider value={{ t, currentLanguage, setLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
};

// Custom hook to use the translation context
export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
};