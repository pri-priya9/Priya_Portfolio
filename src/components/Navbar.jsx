import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-700 text-white sticky top-0 z-50">
      <div className="text-2xl font-bold">
        Priya <span className="text-blue-500">Yadav</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <button onClick={() => scrollToSection('about')} className="hover:text-blue-400">About</button>
        <button onClick={() => scrollToSection('education')} className="hover:text-blue-400">Education</button>
        <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400">Skills</button>
        <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400">Projects</button>
        {/* <button onClick={() => scrollToSection('services')} className="hover:text-blue-400">Services</button>  */}
        <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400">Contact</button>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden flex flex-col space-y-2 cursor-pointer" onClick={toggleMenu}>
        <div className={`w-8 h-1 bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''} transition-all duration-300`}></div>
        <div className={`w-8 h-1 bg-white ${menuOpen ? 'opacity-0' : ''} transition-all duration-300`}></div>
        <div className={`w-8 h-1 bg-white ${menuOpen ? '-rotate-45 -translate-y-2' : ''} transition-all duration-300`}></div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-10">
          <div className="flex justify-end p-4">
            <div className="text-white cursor-pointer" onClick={toggleMenu}>X</div>
          </div>
          <div className="flex flex-col items-center space-y-6 mt-16">
            <button onClick={() => { scrollToSection('about'); toggleMenu(); }} className="text-white">About</button>
            <button onClick={() => { scrollToSection('education'); toggleMenu(); }} className="text-white">Education</button>
            <button onClick={() => { scrollToSection('skills'); toggleMenu(); }} className="text-white">Skills</button>
            <button onClick={() => { scrollToSection('projects'); toggleMenu(); }} className="text-white">Projects</button>
            {/* <button onClick={() => { scrollToSection('services'); toggleMenu(); }} className="text-white">Services</button> */}
            <button onClick={() => { scrollToSection('contact'); toggleMenu(); }} className="text-white">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
