import React, { FC, useState } from "react";
import { FaUser, FaAlignLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { US, GB, DE, FR, ES, IT, NL, BE, CZ, PT, SE, FI, GR, RO } from "country-flag-icons/react/3x2";
import { useTranslation } from "../../context/TranslationContext";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const { currentLanguage, setLanguage, t } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

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
  ];

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    setShowLanguageSelector(false);
    // Add logic here to update the app's language
  };

  return (
    <div className="bg-[#133155] text-white flex justify-center items-center">
      <div className="py-4 flex justify-between items-center w-2/3">
        <div style={{ marginLeft: "-32px" }}>{t('header.promo')}</div>
        <div className="flex items-center space-x-2 pr-6">
          <img src="/images/user.svg" />
          <Link
            to="/login"
            className="bg-transparent hover:bg-yellow-600 text-dark font-bold py-1 px-2 rounded-l focus:outline-none dark:text-white"
          >
            {t('header.login')}
          </Link>
          <Link
            to="/register"
            className="bg-transparent hover:bg-gray-400 text-dark font-bold py-1 px-2 rounded-r focus:outline-none dark:text-white"
          >
            <FaAlignLeft className="inline text-2xl" color="white" /> {t('header.register')}
          </Link>

          {/* Language Selector */}
          <div className="relative">
            <button className="flex items-center space-x-2 text-white focus:outline-none" onClick={() => setShowLanguageSelector(!showLanguageSelector)}>
              {languages.find((lang) => lang.code === currentLanguage)?.icon}
              <span>
                {
                  languages.find((lang) => lang.code === currentLanguage)
                    ?.name
                }
              </span>
            </button>
            {showLanguageSelector && <div className="absolute right-0 mt-2 bg-[#161b33] border border-gray-700 rounded-lg shadow-lg w-48 z-10">
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
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
