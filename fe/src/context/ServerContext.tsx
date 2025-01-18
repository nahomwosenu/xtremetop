/* eslint-disable no-useless-catch */
// src/contexts/ServerContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { SERVER } from '../Constants';

export interface Server {
    _id: string;
    game: string; // Game ID
    title: string;
    gameMode?: string;
    region?: string;
    description?: string;
    server_ip?: string;
    server_port?: string;
    server_query_port?: string;
}

interface ServerContextProps {
    servers: Server[];
    loading: boolean;
    fetchServers: (params?: URLSearchParams) => Promise<void>;
    addServer: (serverData: Partial<Server>, temporary: boolean) => Promise<void>;
    cached: (server: Server | undefined) => Server | null | undefined;
    // Add update and delete functions as needed
}

export const ServerContext = createContext<ServerContextProps>({
    servers: [],
    loading: true,
    fetchServers: async () => { },
    addServer: async () => { },
    cached: () => null,
});

interface ServerProviderProps {
    children: ReactNode;
}

export const ServerProvider: React.FC<ServerProviderProps> = ({ children }) => {
    const [servers, setServers] = useState<Server[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServers = async (params?: URLSearchParams) => {
        try {
            setLoading(true);
            let url = SERVER + '/servers';
            if (params) {
                url += `?${params.toString()}`;
            }
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setServers(data);
            } else {
                throw new Error('Failed to fetch servers');
            }
        } catch (error) {
            console.error('Error fetching servers:', error);
        } finally {
            setLoading(false);
        }
    };

    const addServer = async (serverData: Partial<Server>, temporary = false) => {
        try {
            if (temporary) {
                setServers((prev) => [...prev, serverData as Server]);
                cached(serverData as Server);
                return temporary;
            }
            const res = await fetch(SERVER + '/servers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(serverData),
            });
            if (res.ok) {
                const newServer = await res.json();
                setServers((prevServers) => [...prevServers, newServer]);
                return newServer;
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add server');
            }
        } catch (error) {
            throw error;
        }
    };

    const cached = (server: Server | undefined = undefined) => {
        if (server) {
            localStorage.setItem("cached_server", JSON.stringify(server));
            return server;
        } else {
            const s = localStorage.getItem("cached_server");
            if (s)
                return JSON.parse(s) as Server;
        }
        return null;
    }

    useEffect(() => {
        console.log('###fetch servers');
        fetchServers()
    }, [])
    useEffect(() => {
        console.log('###>servers', servers);
     },[servers]);

    return (
        <ServerContext.Provider value={{ servers, loading, fetchServers, addServer, cached }}>
            {children}
        </ServerContext.Provider>
    );
};
