import React from 'react';
import PremiumHeader from './PremiumHeader';
import PremiumCard from './PremiumCard';
import PremiumFooterNote from './PremiumFooterNote';

const PremiumMembershipDisplay: React.FC = () => {
    // Plan details for each premium membership
    const plans = [
        {
            duration: '1 Month',
            price: '10/28 Days',
            votes: '+100 bonus votes now',
            bonusVotes: '+100 next month',
            features: [
                'Upload bigger banners 728x90',
                'All your servers*',
                'Show premium banner**',
                'Highlighted background',
                'Bonus daily, weekly votes'
            ]
        },
        {
            duration: '3 Months',
            price: '21/84 Days',
            discount: '30%',
            votes: '+200 bonus votes now',
            bonusVotes: '+200 next 2 months',
            features: [
                'Upload bigger banners 728x90',
                'All your servers*',
                'Show premium banner**',
                'Highlighted background',
                'Bonus daily, weekly votes'
            ]
        },
        {
            duration: '6 Months',
            price: '39/182 Days',
            discount: '40%',
            votes: '+300 bonus votes now',
            bonusVotes: '+300 next 5 months',
            features: [
                'Upload bigger banners 728x90',
                'All your servers*',
                'Show premium banner**',
                'Highlighted background',
                'Bonus daily, weekly votes'
            ]
        },
        {
            duration: '1 Year',
            price: '52/364 Days',
            discount: '60%',
            votes: '+400 bonus votes now',
            bonusVotes: '+400 next 11 months',
            selected: true,
            features: [
                'Upload bigger banners 728x90',
                'All your servers*',
                'Show premium banner**',
                'Highlighted background',
                'Bonus daily, weekly votes'
            ]
        }
    ];

    return (
        <div className="bg-gray-900 text-white min-h-screen py-10 px-20">
            {/* Premium Header */}
            <PremiumHeader />

            {/* Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mt-10 w-full lg:w-5/6 mx-auto">
                {plans.map((plan, index) => (
                    <PremiumCard
                        key={index}
                        duration={plan.duration}
                        price={plan.price}
                        discount={plan.discount}
                        votes={plan.votes}
                        bonusVotes={plan.bonusVotes}
                        features={plan.features}
                        selected={plan?.selected}
                    />
                ))}
            </div>

            {/* Footer Notes */}
            <PremiumFooterNote />
        </div>
    );

};

export default PremiumMembershipDisplay;
