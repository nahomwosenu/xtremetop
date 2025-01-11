// src/contexts/GameContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { SERVER } from '../Constants';
import { BasicType, ServerType, ServerAdvancedType } from '../types/GameTypes';

export interface Game {
    _id: string;
    name: string;
    iconUrl?: string;
    description?: string;
    metaData?: BasicType | ServerType | ServerAdvancedType;  // Attach metadata
    // Add other game properties as needed
}

interface GameContextProps {
    games: Game[];
    loading: boolean;
    fetchGames: () => Promise<void>;
}

export const GameContext = createContext<GameContextProps>({
    games: [],
    loading: true,
    fetchGames: async () => { },
});

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch metadata for each game and add it to the game object
    const fetchGameMeta = async (gameId: string) => {
        try {
            const res = await fetch(`${SERVER}/game-meta/${gameId}`);
            if (res.ok) {
                const metaData = await res.json();
                return metaData.fields;  // Returning the fields (metadata) only
            } else {
                throw new Error('Failed to fetch game metadata');
            }
        } catch (error) {
            console.error('Error fetching game metadata:', error);
            return null;
        }
    };

    const fetchGames = async () => {
        try {
            setLoading(true);
            const res = await fetch(SERVER + '/games');
            if (res.ok) {
                const gamesData: Game[] = await res.json();

                // Fetch metadata for each game and attach it
                const gamesWithMeta = await Promise.all(
                    gamesData.map(async (game) => {
                        const metaData = await fetchGameMeta(game._id);
                        return {
                            ...game,
                            metaData: metaData || null,  // Attach metadata or set to null if not found
                        };
                    })
                );

                setGames(gamesWithMeta);
            } else {
                throw new Error('Failed to fetch games');
            }
        } catch (error) {
            console.error('Error fetching games:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <GameContext.Provider value={{ games, loading, fetchGames }}>
            {children}
        </GameContext.Provider>
    );
};
