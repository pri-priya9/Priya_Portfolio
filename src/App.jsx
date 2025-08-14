import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import MyTech from "./components/MyTech";
//import Services from './components/Services';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HirePage from "./hire-me/HirePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecentWork from "./components/RecentWork";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Main Portfolio Route (with Navbar) */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <About />
                <Education />
                <Skills />
                <Projects />
                <RecentWork />
                {/* <Services /> */}
                <MyTech />
                <Experience />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Hire-Me Route (without Navbar) */}
          <Route
            path="/hire-me"
            element={
              <>
                <HirePage />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
