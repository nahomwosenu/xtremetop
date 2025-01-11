import React from 'react';

const SideBanner: React.FC = () => {
    return (
        <div className="bg-blue-400 h-3/4 mt-12 flex flex-col justify-between items-center p-6 text-center m-6 w-1/2">
            <p className="text-white text-4xl font-bold">ADVERTISE HERE</p>
            <p className="text-white  mt-2 text-4xl">YOUR SERVER BANNER</p>
            <p className="text-white  mt-2 text-4xl"><span className='text-yellow-300'>XTREMETOP</span> Biggest Banner</p>
        </div>

    );
};

export default SideBanner;
