import { createContext, useContext, useState, ReactNode } from "react";

interface INavContext {
    activeNav: string;
    setActiveNav: (val: string) => void;
}

const NavContext = createContext<INavContext>({
    activeNav: "home",
    setActiveNav: () => { }
});

interface NavProviderProps {
    children: ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
    const [activeNav, setActiveNav] = useState<string>("home");

    return (
        <NavContext.Provider value={{ activeNav, setActiveNav }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNav = () => useContext(NavContext);
