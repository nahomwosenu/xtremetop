import React from 'react';
import { FaFlagUsa } from 'react-icons/fa';
import { PiDiscordLogoFill } from 'react-icons/pi';
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface ServerCardProps {
    title: string;
    tags: string[];
    rank?: number;
    isPremium?: boolean;
    votes?: number;
}

const ServerCard: React.FC<ServerCardProps> = ({ title, tags, rank = 0, isPremium = false, votes = 0 }) => {
    const img = isPremium ? "/images/premium.png" : "/images/turumba.png";
    return (
        <div className='bg-gray-300 flex mb-2 shadow-md'>
            {rank ? <p className='text-2xl text-black mt-auto mb-auto'>#{rank}</p> : <img className='w-16 h-16 p-2 inline-block mt-auto mb-auto' src={img} />}
            {/* <div className='p-2 bg-gray-900 m-2' /> */}
            <div className="p-4 rounded-lg w-full ms-8">

                <h3 className="text-black text-xl font-semibold mb-2">{title}</h3>
                <div className="flex space-x-2 mb-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-400">Short description of the server goes here.</p>

            </div>
            {
                isPremium && <div className='flex items-start m-2 me-4 space-x-2'> <button className='bg-blue-950 p-2 text-xs flex items-center space-x-2'>
                    <PiDiscordLogoFill className='inline-block text-lg' />
                    <span>DISCORD</span>
                </button>
                    <span className="fi fi-us text-3xl"></span>
                </div>
            }
        </div>
    );
};

export default ServerCard;