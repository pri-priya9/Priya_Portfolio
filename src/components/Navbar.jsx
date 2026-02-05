import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Animation variants for sidebar
  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  // Animation variants for menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-700 text-white sticky top-0 z-50">
      <div className="text-2xl font-bold">
        Priya <span className="text-blue-500">Yadav</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <button onClick={() => scrollToSection('home')}
        className="hover:text-blue-400">Home</button>
        <button onClick={() => scrollToSection('about')} 
        className="hover:text-blue-400">About</button>
        <button onClick={() => scrollToSection('education')} className="hover:text-blue-400">Education</button>
        <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400">Skills</button>
        <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400">Projects</button>
        <button onClick={() => scrollToSection('industry-projects')} className="hover:text-blue-400">Industry Projects</button>
        {/* <button onClick={() => scrollToSection('services')} className="hover:text-blue-400">Services</button>  */}
        <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400">Contact</button>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="md:hidden flex flex-col space-y-2 cursor-pointer" onClick={toggleMenu}>
        <div className={`w-8 h-1 bg-white ${menuOpen ? 'rotate-45 translate-y-2' : ''} transition-all duration-300`}></div>
        <div className={`w-8 h-1 bg-white ${menuOpen ? 'opacity-0' : ''} transition-all duration-300`}></div>
        <div className={`w-8 h-1 bg-white ${menuOpen ? '-rotate-45 -translate-y-2' : ''} transition-all duration-300`}></div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              className="fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 shadow-2xl"
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={toggleMenu}
                  className="text-white text-2xl p-2 hover:text-blue-400 transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <motion.div className="flex flex-col items-start px-8 pt-8 space-y-6 h-full">
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('about'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  About
                </motion.button>
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('education'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  Education
                </motion.button>
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('skills'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  Skills
                </motion.button>
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('projects'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  Projects
                </motion.button>
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('industry-projects'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  Industry Projects
                </motion.button>
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => { scrollToSection('contact'); toggleMenu(); }}
                  className="text-white text-xl hover:text-blue-400 transition-colors"
                >
                  Contact
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
