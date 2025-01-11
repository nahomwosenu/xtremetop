import React from 'react';
import PremiumServerCard from './PremiumServerCard';
import ServerCard from './ServerCard';
import SideBanner from './SideBanner';
import TopSection from './TopSection';
import { FaPlus } from 'react-icons/fa';

const ServersList: React.FC = () => {
  // Example data
  const servers = [
    { title: 'Shaiya Classic EP4.5', tags: ['tag1', 'tag2', 'tag3'], premium: true, votes: 9000 },
    { title: 'Server 1', tags: ['PvP', 'Fast Level'], votes: 2000 },
    { title: 'Server 2', tags: ['PvE', 'No Pay2Win'], votes: 1500 },
    { title: 'Server 3', tags: ['Questing', 'High Rates'], votes: 1000 },
  ];

  return (
    <div className="min-h-screen text-white flex">
      {/* Side Banners */}
      <aside className="hidden lg:block w-1/5">
        <SideBanner />
      </aside>

      {/* Main Content */}
      <main className="w-full bg-gray-900 lg:w-3/5 px-5">
        {/* Header */}
        <TopSection />

        <div className='mt-8 p-2 bg-gray-300 flex justify-end'>
          <button className='p-1 bg-blue-500 rounded-lg'><img src="/images/turumba-w.png" className='inline' /> Advertise here</button>
        </div>

        {/* Premium Server Section */}
        <div className="mt-8">
          {servers
            .filter((server) => server.premium)
            .map((server, idx) => (
              <ServerCard
                key={idx}
                title={server.title}
                tags={server.tags}
                isPremium={server.premium}
              />
            ))}
        </div>

        {/* Regular Server List */}
        <div className="mt-6">
          {servers
            .filter((server) => !server.premium)
            .map((server, idx) => (
              <ServerCard key={idx} title={server.title} tags={server.tags} />
            ))}
        </div>
        <div className='mt-8 ps-8 p-2 bg-gray-300 flex justify-between'>
          <p className='text-black text-2xl'>XTREMETOP List</p>
          <button className='p-1 bg-blue-500 rounded-lg'><FaPlus className='inline' /> Add Server</button>
        </div>
        <div className='mt-8 ps-8 p-2 bg-gray-300 flex justify-between'>
          <div className='flex justify-between'>
            <p className='text-black text-2xl'>RANK</p>
            <p className='text-black text-2xl ms-8'>SERVER</p>
          </div>
          <p className='text-black text-2xl'>VOTES</p>
        </div>
        <div className="mt-6">
          {servers
            .filter((server) => !server.premium)
            .map((server, idx) => (
              <ServerCard key={idx} title={server.title} tags={server.tags} rank={idx + 1} />
            ))}
        </div>
      </main>

      {/* Side Banners */}
      <aside className="hidden lg:block w-1/5">
        <SideBanner />
      </aside>
    </div>
  );
};

export default ServersList;
