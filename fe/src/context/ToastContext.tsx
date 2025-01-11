// ToastContext.tsx
import React, { createContext, ReactNode } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextProps {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    warn: (message: string, options?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const success = (message: string, options?: ToastOptions) => {
        toast.success(message, options);
    };

    const error = (message: string, options?: ToastOptions) => {
        toast.error(message, options);
    };

    const info = (message: string, options?: ToastOptions) => {
        toast.info(message, options);
    };

    const warn = (message: string, options?: ToastOptions) => {
        toast.warn(message, options);
    };

    return (
        <ToastContext.Provider value={{ success, error, info, warn }}>
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
        </ToastContext.Provider>
    );
};
