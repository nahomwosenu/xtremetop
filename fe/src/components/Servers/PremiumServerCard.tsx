import React from 'react';

interface PremiumServerCardProps {
    title: string;
    tags: string[];
    votes: number;
    premium?: boolean;
}

const PremiumServerCard: React.FC<PremiumServerCardProps> = ({ title, tags, votes, premium }) => {
    return (
        <div className="bg-gray-300 p-6 rounded-lg shadow-lg mb-6 flex justify-between items-center">
            <div className="w-3/4">
                <h3 className="text-black text-2xl font-bold mb-2">{title}</h3>
                <div className="flex space-x-2 mb-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-yellow-300 text-yellow-900 text-xs px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-700">Detailed description of the premium server...</p>
            </div>
            <div className="text-center">
                <p className="text-yellow-900 text-2xl font-bold mb-1">{votes} VOTES</p>
                {premium && <p className="text-yellow-600 text-sm">Premium Member</p>}
            </div>
        </div>
    );
};

export default PremiumServerCard;
