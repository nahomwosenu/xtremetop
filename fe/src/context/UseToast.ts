// useToast.ts
import { useContext } from 'react';
import { ToastContext } from './ToastContext'; // Adjust the path as needed

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
