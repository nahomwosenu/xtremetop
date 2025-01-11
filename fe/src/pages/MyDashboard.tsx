import Dashboard from "../components/Dashboard/Dashboard"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Nav from "../components/Nav/Nav"
import { NavProvider } from "../context/NavContext"


const MyDashboard = () => {
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
                <Hero label1="XTREMETOP" label2="USER DASHBOARD" description="Edit your account settings, update server information, become premium member, advertise your servers and much more. All in one place in the user's dashboard" hero />
                <Dashboard />

            </div>
            <Footer />
        </>
    )
}

export default MyDashboard;