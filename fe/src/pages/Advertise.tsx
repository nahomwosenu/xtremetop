import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Nav from "../components/Nav/Nav"
import AdvertiseServer from "../components/Servers/AdvertiseServer"
import { NavProvider } from "../context/NavContext"
import { useTranslation } from "../context/TranslationContext"


const Advertise = () => {
    const { t } = useTranslation();

    return (
        <>
            <Header />
            <div
                className="relative"
                style={{
                    backgroundImage: "url('/images/hero.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <NavProvider>
                    <Nav />
                </NavProvider>
                <Hero
                    label1={t('hero.label1')} // "ADVERTISE ON"
                    label2={t('hero.label2')} // "XTREMETOP"
                    description={t('hero.description')} // "XTREMETOP is an fast growing site with many opportunities for advertising. Join our big communit and promote your server to millions of players worldwide"
                    hero // Assuming this is a boolean prop
                />
                <AdvertiseServer />
            </div>
            <Footer />
        </>
    );
};

export default Advertise;