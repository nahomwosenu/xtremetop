import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Nav from "../components/Nav/Nav";
import { NavProvider } from "../context/NavContext";

const Home = () => {
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
        <Hero />
      </div>
      <Features />
      <Footer />
    </>
  )
}

export default Home;