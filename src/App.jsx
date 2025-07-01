import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
//import Services from './components/Services';  
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Education />
      <Skills />
      <Projects />
      {/* <Services />   */}
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
