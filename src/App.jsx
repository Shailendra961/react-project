import { Route, Routes } from "react-router";
import Navigations from "./components/Navigations";
import Home from "./pages/Home";
import CountryFlags from "./projects/countryFlags/CountryFlags";
import Pokemon from "./projects/pokemonShow/Pokemon";

function App() {
  return (
    <>
      <Navigations/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/country-flags" element={<CountryFlags/>} />
        <Route path="/pokemon" element={<Pokemon/>} />
      </Routes>
    </>
  );
}

export default App;
