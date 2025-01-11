import Footer from "../components/Footer/Footer";
import GameList from "../components/GameList/GameList";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import { NavProvider } from "../context/NavContext";

const Games = () => {
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
            <GameList />
            <Footer />
        </>
    )
}

export default Games;