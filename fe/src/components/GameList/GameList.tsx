import React from 'react';

const games = [
  {
    name: '4Story',
    description: 'An MMORPG that focuses on intense combat and exploration.',
    rating: 4,
    image: '/images/temp/4story.jpg', // Path to the background image
    icon: '/images/temp/4story.jpg', // Path to the icon image
  },
  {
    name: '7 DAYS TO DIE',
    description: 'A zombie survival game where players must craft and scavenge to stay alive.',
    rating: 5,
    image: '/images/temp/7daystodie.png',
    icon: '/images/temp/7daystodie.png',
  },
  {
    name: 'ACE Online',
    description: 'An action-oriented flight MMORPG with space combat and missions.',
    rating: 3,
    image: '/images/temp/ace_online.jpg',
    icon: '/images/temp/ace_online.jpg',
  },
  // samples
  {
    name: '4Story',
    description: 'An MMORPG that focuses on intense combat and exploration.',
    rating: 4,
    image: '/images/temp/4story.jpg', // Path to the background image
    icon: '/images/temp/4story.jpg', // Path to the icon image
  },
  {
    name: '7 DAYS TO DIE',
    description: 'A zombie survival game where players must craft and scavenge to stay alive.',
    rating: 5,
    image: '/images/temp/7daystodie.png',
    icon: '/images/temp/7daystodie.png',
  },
  {
    name: 'ACE Online',
    description: 'An action-oriented flight MMORPG with space combat and missions.',
    rating: 3,
    image: '/images/temp/ace_online.jpg',
    icon: '/images/temp/ace_online.jpg',
  },
  {
    name: '4Story',
    description: 'An MMORPG that focuses on intense combat and exploration.',
    rating: 4,
    image: '/images/temp/4story.jpg', // Path to the background image
    icon: '/images/temp/4story.jpg', // Path to the icon image
  },
  {
    name: '7 DAYS TO DIE',
    description: 'A zombie survival game where players must craft and scavenge to stay alive.',
    rating: 5,
    image: '/images/temp/7daystodie.png',
    icon: '/images/temp/7daystodie.png',
  },
  {
    name: 'ACE Online',
    description: 'An action-oriented flight MMORPG with space combat and missions.',
    rating: 3,
    image: '/images/temp/ace_online.jpg',
    icon: '/images/temp/ace_online.jpg',
  },
  {
    name: '4Story',
    description: 'An MMORPG that focuses on intense combat and exploration.',
    rating: 4,
    image: '/images/temp/4story.jpg', // Path to the background image
    icon: '/images/temp/4story.jpg', // Path to the icon image
  },
  {
    name: '7 DAYS TO DIE',
    description: 'A zombie survival game where players must craft and scavenge to stay alive.',
    rating: 5,
    image: '/images/temp/7daystodie.png',
    icon: '/images/temp/7daystodie.png',
  },
  {
    name: 'ACE Online',
    description: 'An action-oriented flight MMORPG with space combat and missions.',
    rating: 3,
    image: '/images/temp/ace_online.jpg',
    icon: '/images/temp/ace_online.jpg',
  },
  {
    name: '4Story',
    description: 'An MMORPG that focuses on intense combat and exploration.',
    rating: 4,
    image: '/images/temp/4story.jpg', // Path to the background image
    icon: '/images/temp/4story.jpg', // Path to the icon image
  },
  {
    name: '7 DAYS TO DIE',
    description: 'A zombie survival game where players must craft and scavenge to stay alive.',
    rating: 5,
    image: '/images/temp/7daystodie.png',
    icon: '/images/temp/7daystodie.png',
  },
  {
    name: 'ACE Online',
    description: 'An action-oriented flight MMORPG with space combat and missions.',
    rating: 3,
    image: '/images/temp/ace_online.jpg',
    icon: '/images/temp/ace_online.jpg',
  },
];

const GameList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-yellow-400 text-4xl font-bold text-center mb-8">Game List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game, idx) => (
            <div
              key={idx}
              className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              {/* Game Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(${game.image})` }}
              ></div>

              {/* Overlay to darken background */}
              <div className="absolute inset-0 bg-black opacity-40"></div>

              <div className="relative p-5 z-10 flex flex-col items-center text-center">
                {/* Game Icon */}
                <img src={game.icon} alt={`${game.name} icon`} className="w-16 h-16 mb-3 rounded-full bg-gray-100 p-2" />

                {/* Game Name */}
                <h3 className="text-lg font-bold text-yellow-400">{game.name}</h3>

                {/* Game Description */}
                <p className="text-sm text-gray-300 mt-2 mb-4">{game.description}</p>

                {/* Star Rating */}
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }, (_, starIdx) => (
                    <svg
                      key={starIdx}
                      className={`w-5 h-5 ${starIdx < game.rating ? 'text-yellow-400' : 'text-gray-500'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.973 2.881a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.539 1.118l-3.973-2.88a1 1 0 00-1.175 0l-3.973 2.88c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.49 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                    </svg>
                  ))}
                </div>

                {/* Call-to-action or extra buttons can be added here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
