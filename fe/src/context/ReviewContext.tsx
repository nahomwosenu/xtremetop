/* eslint-disable no-useless-catch */
// src/contexts/ReviewContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { SERVER } from '../Constants';

interface Review {
    _id: string;
    user: string; // User ID
    server: string; // Server ID
    content: string;
    rating: number;
    // Add other review properties as needed
}

interface ReviewContextProps {
    reviews: Review[];
    fetchReviews: (serverId: string) => Promise<void>;
    addReview: (reviewData: Partial<Review>) => Promise<void>;
}

export const ReviewContext = createContext<ReviewContextProps>({
    reviews: [],
    fetchReviews: async () => { },
    addReview: async () => { },
});

interface ReviewProviderProps {
    children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviews = async (serverId: string) => {
        try {
            const res = await fetch(`/reviews/server/${serverId}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            } else {
                throw new Error('Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const addReview = async (reviewData: Partial<Review>) => {
        try {
            const res = await fetch(SERVER + '/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(reviewData),
            });
            if (res.ok) {
                const newReview = await res.json();
                setReviews((prevReviews) => [...prevReviews, newReview]);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to add review');
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <ReviewContext.Provider value={{ reviews, fetchReviews, addReview }}>
            {children}
        </ReviewContext.Provider>
    );
};
