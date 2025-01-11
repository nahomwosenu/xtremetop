import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Nav from "../components/Nav/Nav"
import { NavProvider } from "../context/NavContext"
import Registration from "../components/Registration/Registration"
import Footer from "../components/Footer/Footer"

const Register = () => {
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
      <Registration />
      <Footer />
    </>
    )
}
export default Register;