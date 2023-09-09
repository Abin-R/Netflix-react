import React from "react";
import NavBar from "./Components/Navbar/NavBar";
import { ComedyMovies, HorrorMovies, RomanceMovies, action ,orginals} from "./urls";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost Url={orginals}  title="Netflix Orginals"/>
      <RowPost Url={action}  title="Action" isSmall />
      <RowPost Url={ComedyMovies}  title="Comedy" isSmall />
      <RowPost Url={HorrorMovies}  title="Horror" isSmall />
      <RowPost Url={RomanceMovies}  title="Romance" isSmall />
    </div>
  );
}

export default App;
