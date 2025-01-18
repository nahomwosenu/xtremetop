import React from 'react';
import PremiumHeader from './PremiumHeader';
import PremiumCard from './PremiumCard';
import PremiumFooterNote from './PremiumFooterNote';
import { useTranslation } from '../../context/TranslationContext';

const PremiumMembershipDisplay: React.FC = () => {
    const { t } = useTranslation();
    // Plan details for each premium membership
    const plans = [
        {
            duration: t('plans.duration.1Month'),
            price: t('plans.price.10_28Days'),
            votes: t('plans.votes.bonusVotesNow100'),
            bonusVotes: t('plans.bonusVotes.nextMonth100'),
            features: [
                t('plans.features.uploadBiggerBanners'),
                t('plans.features.allYourServers'),
                t('plans.features.showPremiumBanner'),
                t('plans.features.highlightedBackground'),
                t('plans.features.bonusVotes')
            ]
        },
        {
            duration: t('plans.duration.3Months'),
            price: t('plans.price.21_84Days'),
            discount: t('plans.discount.30Percent'),
            votes: t('plans.votes.bonusVotesNow200'),
            bonusVotes: t('plans.bonusVotes.next2Months200'),
            features: [
                t('plans.features.uploadBiggerBanners'),
                t('plans.features.allYourServers'),
                t('plans.features.showPremiumBanner'),
                t('plans.features.highlightedBackground'),
                t('plans.features.bonusVotes')
            ]
        },
        {
            duration: t('plans.duration.6Months'),
            price: t('plans.price.39_182Days'),
            discount: t('plans.discount.40Percent'),
            votes: t('plans.votes.bonusVotesNow300'),
            bonusVotes: t('plans.bonusVotes.next5Months300'),
            features: [
                t('plans.features.uploadBiggerBanners'),
                t('plans.features.allYourServers'),
                t('plans.features.showPremiumBanner'),
                t('plans.features.highlightedBackground'),
                t('plans.features.bonusVotes')
            ]
        },
        {
            duration: t('plans.duration.1Year'),
            price: t('plans.price.52_364Days'),
            discount: t('plans.discount.60Percent'),
            votes: t('plans.votes.bonusVotesNow400'),
            bonusVotes: t('plans.bonusVotes.next11Months400'),
            selected: true,
            features: [
                t('plans.features.uploadBiggerBanners'),
                t('plans.features.allYourServers'),
                t('plans.features.showPremiumBanner'),
                t('plans.features.highlightedBackground'),
                t('plans.features.bonusVotes')
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
