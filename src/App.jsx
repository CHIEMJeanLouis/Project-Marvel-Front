import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//component
import Header from "./components/Header";

//pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favoris from "./pages/Favoris";
import Character from "./pages/Character";
import Welcome from "./pages/Welcome";
import Comic from "./pages/Comic";
import Footer from "./components/Footer";

function App() {
  const [fav, setFav] = useState([]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/characters"
            element={<Characters fav={fav} setFav={setFav} />}
          />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route
            path="/favoris"
            element={<Favoris fav={fav} setFav={setFav} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
