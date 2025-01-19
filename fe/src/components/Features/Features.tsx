import React, { FC } from 'react';
import { FaPlus, FaMobileAlt, FaGamepad, FaChartLine, FaTrophy, FaThumbsUp, FaGift, FaUnlockAlt, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import Icon from '../Util/Icon';




interface FeaturesProps { }

const Features: FC<FeaturesProps> = () => {

  const { t } = useTranslation();

  const topFeatures = [
    {
      icon: "add_icon.png",
      title: t("free_listing"),
      description: t("free_listing_description"),
      buttonText: t("add_server"),
    },
    {
      icon: "icon_view.png",
      title: t("advertising"),
      description: t("advertising_description"),
      buttonText: t("advertising_button"),
      factor: 1.12
    },
    {
      icon: "premium_icon.png",
      title: t("premium"),
      description: t("premium_description"),
      buttonText: t("premium_membership"),
    },
  ];

  const features = [
    {
      icon: 'best_icon.png',
      title: t("best_servers"),
      description: t("best_servers_description"),
      buttonText: '',
    },
    {
      icon: 'traffic_icon.png',
      title: t("high_traffic"),
      description: t("high_traffic_description"),
      buttonText: '',
    },
    {
      icon: 'news_icon.png',
      title: t("news_title"),
      description: t("news_description"),
      buttonText: t("browse_button"),
      factor: 1
    },
    {
      icon: 'forum.png',
      title: t("forum_title"),
      description: t("forum_description"),
      buttonText: t('browse_button'),
    },
    {
      icon: 'partner_icon.png',
      title: t("partners"),
      description: t("partners_description"),
      buttonText: '',
      dropdown: {
        title: t("our_partners"),
        items: [
          {
            title: t("become_our_partner"),
            link: '/add-site'
          },
          {
            title: t("view_our_partners"),
            link: '/partners'
          }
        ]
      },
    },
    {
      icon: 'thumbs_up.png',
      title: t("social_media"),
      description: t("social_media_description"),
      buttonText: t("follow_us"),
    },
    {
      icon: 'reward_icon.png',
      title: t("reward_voters"),
      description: t("reward_voters_description"),
      buttonText: t("voting_check"),
    },
    {
      icon: 'support_icon.png',
      title: t("active_support"),
      description: t("active_support_description"),
      buttonText: t("contact_us"),
    },
  ];

  return (
    <section className="bg-[#161b33]">
      <div className="bg-[#161b33] py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {topFeatures.map((feature, index) => (
              <div key={index} className="bg-[#133155] h-80 w-66 rounded-lg p-6 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center justify-center border-2 border-yellow-400 hover:border-yellow-200"
                style={{ boxShadow: '0px 14px 16px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex items-center justify-center h-1/4 py-2">
                  <img src={`/images/cards/${feature.icon}`} className='p-2' style={{ width: `${feature?.factor ? (feature.factor * 90) : 90}px` }} />
                </div>
                <h3 className={`text-2xl p-2 py-6 leading-6 font-medium h-1/4 ${index === 0 ? 'text-[#f6b723]' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-100 p-2 ms-6 me-6 h-1/4 text-center">
                  {feature.description}
                </p>
                {feature.buttonText && (
                  <div className="mt-5 h-1/4">
                    <button
                      className={`${index === 0 ? 'bg-[#f6b723]' : 'bg-[#1298ff]'} hover:bg-yellow-600 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-items-center shadow-lg`}
                      style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 1.2)' }} // Optional for finer control
                    >
                      {<FaPlus color="white" className="text-center m-1 inline-block" size={15} />}
                      {feature.buttonText.toUpperCase()}
                    </button>
                  </div>

                )}
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#133155] rounded-lg p-4 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center justify-between border-[0.5px] border-yellow-400 hover:border-yellow-200 h-80 w-66"
                style={{ boxShadow: '0px 12px 12px rgba(0, 0, 0, 0.6)' }}
              >
                {/* Top: Icon */}
                <div className="flex items-center justify-center h-1/3">
                  <img src={`/images/cards/${feature.icon}`} className='p-2' style={{ width: `${feature?.factor ? (feature.factor * 90) : 90}px` }} />
                </div>

                {/* Middle: Title */}
                <div className="flex items-center justify-center h-1/3">
                  <h3 className="font-avenir text-3xl text-[#F6B723] text-center">
                    {feature.title}
                  </h3>
                </div>

                {/* Bottom: Description and Button */}
                <div className="flex flex-col items-center justify-center h-1/3">
                  <p className="text-base text-gray-100 text-center p-1">
                    {feature.description}
                  </p>
                  {feature?.dropdown && (
                    <>
                      <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="absolute bottom-0 left-0 w-full text-white bg-[#133155] hover:bg-blue-800 font-medium text-sm py-2.5 text-center border-t border-r border-l border-[#f6b723] rounded-t-xl"
                        type="button"
                      >
                        {feature.dropdown.title}
                        <svg
                          className="w-2.5 h-2.5 ml-2 inline-block"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>


                      <div id="dropdown" className="z-10 hidden bg-gray-700 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                          {
                            feature.dropdown.items.map(({ title, link }) => (
                              <li>
                                <a href={`${link}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{title}</a>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </>
                  )

                  }
                </div>
                <div className='h-1/3'>
                  {feature.buttonText && (
                    <button className="mt-3 bg-[#f6b723] hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 1.2)' }}
                    >
                      {feature.buttonText}
                    </button>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
