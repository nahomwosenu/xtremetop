import React, { useCallback } from 'react';
import { FcCheckmark } from 'react-icons/fc';

interface PremiumCardProps {
    duration: string;
    price: string;
    discount?: string;
    selected?: boolean;
    votes: string;
    bonusVotes: string;
    features: string[];
}

const PremiumCard: React.FC<PremiumCardProps> = ({ duration, price, discount, votes, bonusVotes, features, selected = false }) => {

    return (
        <div className={"bg-blue-950 text-center border rounded-lg shadow-lg flex flex-col justify-between h-full " + (selected ? "border-blue-600" : "border-yellow-300")}>
            <div className={'h-full lg:h-20 ' + (selected ? "bg-blue-600" : "bg-yellow-300")}>
                <h3 className="text-white text-2xl font-bold mb-2">PREMIUM <span className='text-black'>{duration}</span></h3>
            </div>
            <div className='p-2'>
                <p className="text-yellow-400 text-4xl font-bold mb-1"><sup>$</sup>{<span>{price.split('/')[0]}/</span>}{<span className='text-white'>{price.split('/')[1]}</span>}</p>

                {discount && <p className="text-pink-300 text-sm font-semibold mb-4">{discount} DISCOUNT</p>}
            </div>
            <ul className="text-left mb-6 ps-2 space-y-8 mt-2">
                <li className="text-white mb-2"><FcCheckmark className='inline text-yellow-300' /> {bonusVotes}</li>
                {features.map((feature, index) => (
                    <li key={index} className="text-white mb-2"><FcCheckmark className='inline text-yellow-300' /> {feature}</li>
                ))}
            </ul>

            {/* Aligning the button at the bottom */}
            <div className="mt-auto">
                <button className="px-4 bg-yellow-500 text-white font-bold py-2 rounded hover:bg-yellow-600 my-4">
                    BUY NOW
                </button>
            </div>
        </div>

    );
};

export default PremiumCard;
