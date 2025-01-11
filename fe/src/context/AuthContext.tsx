/* eslint-disable no-useless-catch */
// src/contexts/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { SERVER } from '../Constants';

interface User {
    id: string;
    username: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    loading: true,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch current user on mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch(SERVER + '/users/profile', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Failed to fetch current user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(SERVER + '/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                return data;
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const res = await fetch(SERVER + '/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                return data;
                //await login(email, password);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Registration failed');
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch(SERVER + '/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
