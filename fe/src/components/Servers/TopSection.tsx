import React from 'react';

const TopSection: React.FC = () => {
    return (
        <header className="bg-darkBlue-900 py-5 text-center">
            <h1 className="text-pink-300 text-5xl font-bold">GAME NAME</h1>
            <h2 className="text-yellow-400 text-3xl font-bold mt-2">PRIVATE SERVERS</h2>
            <p className="text-gray-300 mt-3">
                Search and find the best “game name” private servers using our top list and vote for your favorite.
            </p>
        </header>
    );
};

export default TopSection;
