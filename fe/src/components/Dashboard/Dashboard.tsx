import React from 'react';
import { useState } from 'react';
// Import Flowbite components
import { Button, Card, Badge } from 'flowbite-react';
import { FaHome, FaUserEdit, FaDiscord, FaDesktop, FaCrown, FaBullhorn, FaHistory, FaGift, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import EditAccountForm from '../EditAccountForm/EditAccountForm';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('MY_SERVERS');

    const navigationCards = [
        { title: 'ACCOUNT OVERVIEW', key: 'ACCOUNT_OVERVIEW', icon: <FaHome size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'ACCOUNT SETTINGS', key: 'ACCOUNT_SETTINGS', icon: <FaUserEdit size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'discord bot', key: 'DISCORD_BOT', icon: <FaDiscord size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'MY SERVERS', key: 'MY_SERVERS', icon: <FaDesktop size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'PREMIUM', key: 'PREMIUM', icon: <FaCrown size={40} className="mx-auto mb-2 text-blue-800" /> },
        { title: 'ADS', key: 'ADS', icon: <FaBullhorn size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'PAYMENT HISTORY', key: 'PAYMENT_HISTORY', icon: <FaHistory size={40} className="mx-auto mb-2 text-yellow-400" /> },
        { title: 'Bonus Votes', key: 'BONUS_VOTES', icon: <FaGift size={40} className="mx-auto mb-2 text-yellow-400" /> },
    ];

    const renderServers = () => (
        <>

            <div className=' p-2 px-4 bg-yellow-400 flex justify-between items-center'>
                <p className='text-2xl text-black'>My Servers</p>
                <Link
                    to='/add-site'
                    title='Add New Server'
                    className='bg-blue-800 text-white text-xl px-4 py-2 rounded text-center'
                >
                    <FaPlus className='inline-block m-2' />
                    Add New Server
                </Link>
            </div>
            <div className="mt-6">

                <div className="flex justify-between items-center bg-yellow-400 p-4 rounded-md shadow-md">
                    <span className="font-bold text-lg">#254</span>
                    <div className="flex-grow ml-4">
                        <h2 className="font-semibold">TITLE</h2>
                        <p className="text-xs text-gray-700 truncate">
                            Server Description Server Description Server Description Server Description Server Description...
                        </p>
                        <div className="mt-2 flex gap-2">
                            {[...Array(8)].map((_, idx) => (
                                <Badge color="indigo" key={idx}>{`tag ${idx + 1}`}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-semibold text-lg">9000 VOTES</span>
                        <span className="text-yellow-600 font-bold">Premium member</span>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-blue-100 p-4 rounded-md shadow-md mt-4">
                    <span className="font-bold text-lg">#912</span>
                    <div className="flex-grow ml-4">
                        <h2 className="font-semibold">TITLE</h2>
                        <p className="text-xs text-gray-700 truncate">
                            Server Description Server Description Server Description Server Description Server Description...
                        </p>
                        <div className="mt-2 flex gap-2">
                            {[...Array(8)].map((_, idx) => (
                                <Badge color="indigo" key={idx}>{`tag ${idx + 1}`}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-semibold text-lg">8507 VOTES</span>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex flex-col items-center">
            <div className="top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-900 text-white">
                {navigationCards.map((card) => (
                    <Card
                        key={card.key}
                        onClick={() => setActiveTab(card.key)}
                        className={`cursor-pointer w-32 h-32 flex flex-col items-center p-4 rounded-md transition-colors hover:bg-gray-700 ${activeTab === card.key ? 'bg-yellow-500' : 'bg-gray-800'
                            }`}
                    >

                        <div className="flex-grow flex items-center justify-center">{card.icon}</div>

                        <span className="text-center font-semibold mt-2">{card.title}</span>
                    </Card>
                ))}

            </div>



            <div className="w-full px-6 py-4">
                {activeTab === 'MY_SERVERS' && renderServers()}
                {activeTab === 'ACCOUNT_SETTINGS' && <EditAccountForm />}
            </div>
        </div>
    );
};

export default Dashboard;
