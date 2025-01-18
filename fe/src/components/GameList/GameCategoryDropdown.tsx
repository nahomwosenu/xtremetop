import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

interface GameCategoryDropdownProps {
    isOpen: boolean;
}

const GameCategoryDropdown: React.FC<GameCategoryDropdownProps> = ({ isOpen = false, }) => {
    const { games } = useContext(GameContext);
    const categorizedGames = games?.flatMap((g: any) => g.name).reduce((acc: { [key: string]: string[] }, game) => {
        const firstLetter = game[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(game);
        return acc;
    }, {});

    return (
        <>
            {isOpen && (
                <div
                    className="absolute bg-blue-900 left-1/2 transform -translate-x-1/2 mt-2 min-w-max rounded-lg shadow-lg z-10 p-2 overflow-auto min-h-max"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {Object.keys(categorizedGames)
                            .sort()
                            .map((letter) => (
                                <div key={letter} className="bg-blue-800 rounded-lg">
                                    <h3 className="font-bold text-white border-b-2 border-yellow-400 mb-2 text-center">
                                        {letter}
                                    </h3>
                                    <ul className="mt-2 text-sm text-white space-y-1">
                                        {categorizedGames[letter].map((game) => (
                                            <li
                                                key={game}
                                                className="hover:bg-gray-700 px-2 py-1 rounded"
                                            >
                                                {game}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>



            )}
        </>
    );
};

export default GameCategoryDropdown;
