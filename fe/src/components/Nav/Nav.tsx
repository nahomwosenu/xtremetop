import React, { FC, useContext, useEffect, useState } from "react";
import { useNav } from "../../context/NavContext";
import { Link, useLocation } from "react-router-dom";
import GameCategoryDropdown from "../GameList/GameCategoryDropdown";
import { useTranslation } from "../../context/TranslationContext";
import { FaArrowDown, FaCaretDown, FaCaretSquareDown } from "react-icons/fa";
import {
  RiArrowDownCircleLine,
  RiArrowDownDoubleLine,
  RiArrowDownLine,
} from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";

interface NavProps {}

const Nav: FC<NavProps> = () => {
  const { activeNav, setActiveNav } = useNav();
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectGameActive, setSelectGameActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const currentPath = location.pathname;

    // Find the nav link that matches the current path
    const matchingNavLink = navLinks.find((link) => link.route === currentPath);

    if (matchingNavLink) {
      setActiveNav(matchingNavLink.id);
    } else {
      // Optionally handle unmatched routes
      setActiveNav("home");
    }
  }, [location.pathname, setActiveNav]);

  const { user } = useContext(AuthContext);

  const navLinks = [
    { label: t("nav.home"), id: "home", route: "/" },
    { label: t("nav.add_server"), id: "add_site", route: "/add-site" },
    {
      label: t("nav.edit_account"),
      id: "edit_account",
      route: "/edit-account",
      auth: true,
    },
    { label: t("nav.select_game"), id: "select_game", route: "#" },
    { label: t("nav.premium"), id: "premium", route: "/premium" },
    { label: t("nav.advertise"), id: "advertise", route: "/advertise" },
    { label: t("nav.last_servers"), id: "last_servers", route: "/servers" },
    {
      label: t("nav.dashboard"),
      id: "dashboard",
      route: "/dashboard",
      auth: true,
    },
  ];

  return (
    <nav className="bg-transparent border-0 border-b-2 border-yellow-400">
      <div className="mx-auto px-8 md:px-16 lg:px-64">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation links */}
          <div
            className={`flex-1 flex items-center justify-between ${
              isMobileMenuOpen
                ? "block bg-gray-700 z-10 mt-auto pt-4 w-full"
                : "hidden"
            } md:flex`}
          >
            <div className="flex items-center w-full">
              {/* Adjust padding/margin to maintain fixed spacing */}
              <div className="flex w-full justify-between">
                {navLinks
                  .filter((nav) => !nav?.auth || !!user)
                  .map((link) =>
                    link.route === "#" ? (
                      <a
                        key={link.id}
                        className={
                          "relative font-franklin text-white hover:bg-gray-700 hover:text-white px-5 py-5 rounded-md text-base font-medium " +
                          (activeNav === link.id
                            ? "bg-gray-500 bg-opacity-40 border-b-4 border-yellow-300"
                            : "")
                        }
                        style={{ fontWeight: 700 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveNav(link.id);
                          if (link.id === "select_game") {
                            setSelectGameActive(!selectGameActive);
                          }
                        }}
                      >
                        {link.label}
                        <GameCategoryDropdown isOpen={selectGameActive} />
                        {link.id === "select_game" && (
                          <img
                            src="/images/caret.svg"
                            className="inline-block p-2"
                          />
                        )}
                      </a>
                    ) : (
                      <Link
                        key={link.id}
                        to={link.route}
                        className={
                          "text-white font-franklin hover:bg-gray-700 hover:text-white px-5 py-5 rounded-md text-base font-medium " +
                          (activeNav === link.id
                            ? "bg-gray-500 bg-opacity-40 border-b-4 border-yellow-300"
                            : "")
                        }
                        style={{ fontWeight: 700 }}
                        onClick={() => setActiveNav(link.id)}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
