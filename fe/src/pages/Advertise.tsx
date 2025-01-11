import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Nav from "../components/Nav/Nav"
import AdvertiseServer from "../components/Servers/AdvertiseServer"
import { NavProvider } from "../context/NavContext"


const Advertise = () => {
    return (
        <>
            <Header />
            <div className="relative" style={{
                backgroundImage: "url('/images/hero.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center"
            }}>
                <NavProvider>
                    <Nav />
                </NavProvider>
                <Hero label1="ADVERTISE ON" label2="XTREMETOP" description="XTREMETOP is an fast growing site with many opportunities for advertising. Join our big communit and promote your server to millions of players worldwide" hero />
                <AdvertiseServer />

            </div>
            <Footer />
        </>
    )
}

export default Advertise;