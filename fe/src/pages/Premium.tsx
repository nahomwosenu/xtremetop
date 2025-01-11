import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Nav from "../components/Nav/Nav"
import PremiumMembershipDisplay from "../components/Premium/PremiumMembershipDisplay"
import { NavProvider } from "../context/NavContext"


const Premium = () => {
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
            </div>
            <PremiumMembershipDisplay />
            <Footer />
        </>
    )
}

export default Premium;