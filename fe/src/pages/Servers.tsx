import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Nav from "../components/Nav/Nav"
import ServersList from "../components/Servers/ServersList"
import { NavProvider } from "../context/NavContext"


const Servers = () => {
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
                <ServersList />

            </div>
            <Footer />
        </>
    )
}

export default Servers;