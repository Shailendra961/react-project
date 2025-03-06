import { Route, Routes } from "react-router";
import Navigations from "./components/Navigations";
import Home from "./pages/Home";
import CountryFlags from "./projects/countryFlags/CountryFlags";

function App() {
  return (
    <>
      <Navigations/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/country-flags" element={<CountryFlags/>} />
      </Routes>
    </>
  );
}

export default App;
