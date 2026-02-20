import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Auth } from "./pages/Auth";
import { Support } from "./pages/Support";
import { Catalog } from "./pages/Catalog";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Header />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/support" element={<Support />}></Route>
        </Routes>

      <Footer />

      </BrowserRouter>
    </>
  );
}



export default App;
