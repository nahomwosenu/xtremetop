import React, { FC, useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useTranslation } from '../../context/TranslationContext';
import ServersList from '../Servers/ServersList';
import ServerMenu from '../shared/ServerMenu';
import { ServerContext } from '../../context/ServerContext';
import { useSearch } from '../../context/SearchContext';


interface HeroProps {
  label1?: string;
  label2?: string;
  description?: string;
  hero?: boolean;
}

const Hero: FC<HeroProps> = ({ label1, label2, description, hero = false }) => {
  const { t } = useTranslation();
  const [showServers, setShowServers] = useState(false);
  const { servers } = useContext(ServerContext);
  const { searchTerm, setSearchTerm } = useSearch();

  const launchServers = (e: any) => {
    e.preventDefault();
    setShowServers(!showServers);
  }
  return (
    <section className="">
      <div className="bg-cover bg-center py-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/images/logo.svg" className='mx-auto' />
          {hero ? (
            <>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl px-2">
                <span className="inline-block uppercase me-1">{label1}</span>
                <span className="inline-block text-[#facd05] ms-2">{label2}</span>
              </h2>
              <p className="text-2xl text-white mt-4 mx-auto font-franklin max-w-[50rem] px-4">{description}</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl mt-2">
                <span className="inline-block uppercase me-1">{t("hero.default.label1")}</span>
                <span className="inline-block text-[#facd05] ms-2">{t("hero.default.label2")}</span>
              </h2>
              <p className="mt-8 text-2xl text-white font-franklin">{t("hero.default.description")}</p>
              <ul className="mt-2 max-w-lg space-y-1 text-white list-inside dark:text-gray-400 m-auto p-2 mb-8">
                <li className="flex items-center min-w-max">
                  <img src="/images/checkmark.svg" />&nbsp;<span className='ms-2 text-start min-w-max'>{t("hero.default.benefits.1")}</span>
                </li>
                <li className="flex items-center">
                  <img src="/images/checkmark.svg" />&nbsp;<span className='ms-2 text-start min-w-max'>{t("hero.default.benefits.2")}</span>
                </li>
                <li className="flex items-center">
                  <img src="/images/checkmark.svg" />&nbsp;<span className='ms-2 text-start min-w-max'>{t("hero.default.benefits.3")}</span>
                </li>
              </ul>
              <form className="relative max-w-xl mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src='/images/search_icon.svg' />
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block bebas-neue-regular w-full p-2 ps-10 text-lg text-black placeholder-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("hero.default.search_placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={launchServers}
                    className="text-black absolute end-1.5 top-1.5 bottom-1.5 bg-[#f6b723] hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {t("hero.default.search_button")}
                    <img src="/images/caret_black.svg" className='inline-block p-2' />
                  </button>

                </div>
                {
                  (showServers || searchTerm) &&
                  <div className="absolute z-10 left-0 right-0"
                    style={{ top: '100%' }}><ServerMenu letter={''} servers={servers.flatMap((server) => server.title)} /></div>
                }
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
