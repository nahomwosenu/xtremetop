import React, { FC, useContext, useState } from "react";
import { FaUser, FaAlignLeft, FaCheck } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  US,
  GB,
  DE,
  FR,
  ES,
  IT,
  NL,
  BE,
  CZ,
  PT,
  SE,
  FI,
  GR,
  RO,
  PL,
} from "country-flag-icons/react/3x2";
import { useTranslation } from "../../context/TranslationContext";
import { AuthContext } from "../../context/AuthContext";
import Logout from "../../assets/icons/logout.svg?react";
import { ServerContext } from "../../context/ServerContext";
import ServerMenu from "../shared/ServerMenu";
import { useSearch } from "../../context/SearchContext";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const { currentLanguage, setLanguage, t } = useTranslation();
  const { user } = useContext(AuthContext);
  //const user = {};
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showServers, setShowServers] = useState(false);
  const { servers } = useContext(ServerContext);
  const { searchTerm, setSearchTerm } = useSearch();
  const path = useLocation();

  const launchServers = (e: any) => {
    e.preventDefault();
    setShowServers(!showServers);
  };

  const languages = [
    { code: "en", name: "English (US)", icon: <US className="w-6 h-6" /> },
    { code: "en-uk", name: "English (UK)", icon: <GB className="w-6 h-6" /> },
    { code: "fr", name: "Français", icon: <FR className="w-6 h-6" /> },
    { code: "es", name: "Español", icon: <ES className="w-6 h-6" /> },
    { code: "de", name: "Deutsch", icon: <DE className="w-6 h-6" /> },
    { code: "it", name: "Italiano", icon: <IT className="w-6 h-6" /> },
    { code: "nl", name: "Nederlands", icon: <NL className="w-6 h-6" /> },
    { code: "be", name: "België", icon: <BE className="w-6 h-6" /> },
    { code: "cz", name: "Čeština", icon: <CZ className="w-6 h-6" /> },
    { code: "pt", name: "Português", icon: <PT className="w-6 h-6" /> },
    { code: "se", name: "Svenska", icon: <SE className="w-6 h-6" /> },
    { code: "fi", name: "Suomi", icon: <FI className="w-6 h-6" /> },
    { code: "gr", name: "Ελληνικά", icon: <GR className="w-6 h-6" /> },
    { code: "ro", name: "Română", icon: <RO className="w-6 h-6" /> },
    { code: "pl", name: "Polish", icon: <PL className="w-6 h-6" /> },
  ];

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    setShowLanguageSelector(false);
    // Add logic here to update the app's language
  };

  return (
    <div className="bg-gradient-to-r from-[#133155] to-[#2A6CBB] text-white flex justify-center items-center">
      <div className="py-4 flex justify-between items-center px-10 sm:px-16 md:px-24 lg:px-48 xl:px-96 w-full">
        <div className="bebas-neue-regular">{t("header.promo")}</div>
        {path.pathname !== "/" && (
          <form className="mx-auto w-1/2">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <img src="/images/search_icon.svg" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-lg text-black placeholder-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <img
                  src="/images/caret_black.svg"
                  className="inline-block p-2"
                />
              </button>
            </div>
            {(showServers || searchTerm) && (
              <div className="justify-center flex mt-4 lg:mt-8 xl:mt-12 z-10 absolute inset-0">
                <ServerMenu
                  letter={""}
                  servers={servers.flatMap((server) => server.title)}
                />
              </div>
            )}
          </form>
        )}
        <div className="flex items-center space-x-2 pr-6">
          {user ? (
            <>
              <Logout /> <span className="px-1">Logout</span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-transparent bebas-neue-regular hover:bg-yellow-600 text-dark font-bold py-1 px-2 rounded-l focus:outline-none dark:text-white"
              >
                {t("header.login")}
              </Link>
              <Link
                to="/register"
                className="bg-transparent bebas-neue-regular hover:bg-gray-400 text-dark font-bold py-1 px-2 rounded-r focus:outline-none dark:text-white"
              >
                <FaAlignLeft className="inline text-2xl" color="white" />{" "}
                {t("header.register").toUpperCase()}
              </Link>
            </>
          )}

          {/* Language Selector */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-white focus:outline-none"
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
            >
              {languages.find((lang) => lang.code === currentLanguage)?.icon}
            </button>
            {showLanguageSelector && (
              <div className="absolute right-0 mt-2 bg-[#161b33] border border-gray-700 rounded-lg shadow-lg w-48 z-10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 text-sm text-white focus:outline-none"
                  >
                    <div className="flex items-center space-x-2">
                      {lang.icon}
                      <span>{lang.name}</span>
                    </div>
                    {currentLanguage === lang.code && (
                      <FaCheck className="text-yellow-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
