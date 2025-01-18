import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from '../Select/Select';
import { Game, GameContext } from '../../context/GameContext';
import { Controller, useForm, useWatch } from 'react-hook-form';
import GameServerForm from './GameServerForm';
import { SERVER } from '../../Constants';
import { useToast } from '../../context/UseToast';
import { Advert, useAdvertContext } from '../../context/AdvertContext';
import PaymentModal from '../Payment/PaymentModal';
import { IAdvertSlot, useAdvertSlot } from './AdvertSlotContext';
import { Select as FlowbiteSelect, Label } from 'flowbite-react';
import { useTranslation } from '../../context/TranslationContext';

const FieldMap = {
    server_ip: "Server IP",
    server_port: "Server Join PORT",
    server_query_port: "Server Query Port",
    title: "Title or Name of server",
    description: "Description of server",
    url: "Website URL or IP Address"
}

const AdvertiseServer = () => {
    const { games } = useContext(GameContext);
    const { t } = useTranslation();
    const [game, setGame] = useState<Game>();
    const [slot, setSlot] = useState<IAdvertSlot>();
    const { handleSubmit, control, formState: { errors }, watch, register } = useForm();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const tags = useWatch({ control, name: 'tags' });
    const [title, period, website, email] = watch(['title', 'period', 'website', 'email']);
    const tagArray = tags ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [];
    const { success, error } = useToast();
    const { createAdvert } = useAdvertContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { advertSlots } = useAdvertSlot();
    const [amountToPay, setAmountToPay] = useState<Number>(0);

    const calculatedAmount: number = useMemo(() => Number(slot?.pricePerDay || 0) * Number(period || 0), [period, slot]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = async () => {
            const width = img.width;
            const height = img.height;

            // Replace these values with your width/height requirements
            const requiredWidth = slot?.bannerWidth;
            const requiredHeight = slot?.bannerHeight;

            if (width !== requiredWidth || height !== requiredHeight) {
                alert(`Image dimensions must be ${requiredWidth}x${requiredHeight}px`);
                return;
            }

            // Perform the upload
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`${SERVER}/raw/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.url); // Update state with the uploaded image URL
                    alert("Image uploaded successfully!");
                } else {
                    alert("Failed to upload image");
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("An error occurred during upload");
            }
        };

        img.onerror = () => {
            alert("Invalid image file");
        };
    };

    const createAd = (e: any) => {
        e.preventDefault();
        if (!slot || !game) {
            error('Please make sure to select slot, game and server for this ad!');
            return;
        }
        if (!imageUrl) {
            error('Banner Image is required for this Ad');
            return;
        }
        if (!period || !tags || !title) {
            error('Please fill all required fields');
            return;
        }

        createAdvert({
            game: game._id,
            slot: slot._id,
            website: website,
            title: title,
            period: period,
            tags: tagArray,
            banner: imageUrl,
            email: email,
        }).then((advert: Advert | null) => {
            if (advert) {
                success('Your Ad created successfully, complete the payment to publish your Ad');
                const payable = Number(slot.pricePerDay) * Number(period);
                if (payable > 1) {
                    setAmountToPay(payable);
                    setIsModalOpen(true);
                }
            } else {
                error('Failed to create this Ad, please try again later!');
            }
        }).catch((err) => error(`Something went wrong: ${err}`));

    }
    const postPaymentHandler = (paymentId: any) => {
        console.log("###>paymentDone", paymentId);
    }
    return (
        <div className="flex justify-center bg-[#161B33] py-10 text-white">
            <div className="w-full max-w-6xl p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form Section */}
                    <div className="flex flex-col bg-[#133155] p-6 rounded-lg border border-[#F6B723]">
                        <form onSubmit={createAd}>
                            <div className="mb-4">
                                <Select
                                    label={t('advertise.selectSlot')}
                                    options={advertSlots?.sort((s: IAdvertSlot, s2: IAdvertSlot) => s2.pricePerDay - s.pricePerDay)?.map((slot: IAdvertSlot) => ({
                                        label: `${slot.slot} (${slot.bannerHeight} x ${slot.bannerWidth})`,
                                        value: slot._id
                                    }))}
                                    placeholder={t('advertise.selectSlot')}
                                    onChange={(slotId) => setSlot(advertSlots?.find((s: IAdvertSlot) => s?._id === slotId))}
                                    value={slot?._id}
                                    darkMode={true}
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    label={t('advertise.selectGame')}
                                    options={games.map((game) => ({ label: game.name, value: game._id }))}
                                    placeholder={t('advertise.selectGame')}
                                    onChange={(gameId) => setGame(games?.find((g) => g._id == gameId))}
                                    value={game?._id}
                                    darkMode={true}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('advertise.bannerTitle')}</label>
                                <input
                                    type="text"
                                    {...register('title', { required: t('advertise.bannerTitleRequired') })}
                                    placeholder={t('advertise.bannerTitlePlaceholder')}
                                    className="w-full px-3 py-2 bg-[#133155] border border-[#F6B723] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('advertise.serverTags')}</label>
                                <input
                                    {...register('tags', { required: t('advertise.serverTagsRequired') })}
                                    type="text"
                                    placeholder={t('advertise.serverTagsPlaceholder')}
                                    className="w-full px-3 py-2 bg-[#133155] border border-[#F6B723] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <div className="flex gap-2 mt-2">
                                    {tagArray.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-[#1A1A2E] border border-[#F6B723] rounded">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {slot && <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('advertise.bannerImage')}</label>
                                <input type="file" className="w-full px-3 py-2 bg-[#133155] border border-[#F6B723] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>}

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('advertise.website')}</label>
                                <input
                                    type="url"
                                    {...register('website', { required: t('advertise.websiteRequired') })}
                                    placeholder={t('advertise.websitePlaceholder')} className="w-full px-3 py-2 bg-[#133155] border border-[#F6B723] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">{t('advertise.email')}</label>
                                <input
                                    type="email"
                                    {...register('email', { required: t('advertise.emailRequired') })}
                                    placeholder={t('advertise.emailPlaceholder')} className="w-full px-3 py-2 bg-[#133155] border border-[#F6B723] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                            </div>

                            <div className="mb-4">
                                <div className="max-w-md">
                                    <div className="mb-2 block">
                                        <Label htmlFor="period" className='text-white' value={t('advertise.periodDays')} />
                                    </div>
                                    <Controller
                                        name="period"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FlowbiteSelect
                                                id="period"
                                                {...field}
                                                theme={{ base: 'dark' }}
                                                className='rounded-lg bg-[#133155] border border-[#F6B723]'
                                                required>
                                                {Array.from({ length: 30 }, (_, index) => (
                                                    <option key={index + 1} value={index + 1}>
                                                        {index + 1} {t('advertise.days')}
                                                    </option>
                                                ))}
                                            </FlowbiteSelect>
                                        )}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-xl font-avenir">{t('advertise.totalPrice')}: <span className='text-[#F6B723]'>${calculatedAmount.toFixed(2)}</span></span>
                            <button type="submit" onClick={createAd} className="px-6 py-2 bg-[#F6B723] hover:bg-yellow-600 text-black font-semibold rounded-lg">{t('advertise.continue')}</button>
                        </div>
                    </div>
                    <PaymentModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        amount={Number(amountToPay)}
                        onSuccess={postPaymentHandler}
                    />
                    {/* Info Section */}
                    <div className="flex flex-col bg-[#133155] rounded-lg border border-[#F6B723] font-franklin">
                        <h3 className="m-6 md:mt-12 text-xl font-bold text-yellow-300">{t('advertise.availableToBuyNow')}</h3>
                        <div className="m-4 md:mt-8 space-y-4">
                            <img src="/images/advertise_exc.png" alt={t('advertise.bannerPreview')} className="w-full rounded-lg mb-4" />
                            <div className='pt-2 md:pt-8'>
                                <span className='text-xl mt-4'>{t('advertise.vipAds')}</span>
                                <p className="text-sm mb-2 ms-4 text-[#A1ADBB] font-avenir" style={{ fontWeight: 400 }}>{t('advertise.vipAdsDescription')}</p>
                            </div>
                            <div>
                                <span className='text-xl mt-2'>{t('advertise.sponsorServer')}</span>
                                <p className="text-sm mb-2 ms-4 text-[#A1ADBB] font-avenir" style={{ fontWeight: 400 }}>{t('advertise.sponsorServerDescription')}</p>
                            </div>
                            <div>
                                <span className='text-xl mt-2'>{t('advertise.topAds')}</span>
                                <p className="text-sm mb-2 ms-4 text-[#A1ADBB] font-avenir" style={{ fontWeight: 400 }}>{t('advertise.topAdsDescription')}</p>
                            </div>
                        </div>
                        <div className="text-yellow-400 mt-auto text-sm border border-yellow-500 w-full p-2 ps-4">
                            {t('advertise.trackPayments')} <br />
                            <span className='text-white'>{t('advertise.loginToBuy')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AdvertiseServer;
