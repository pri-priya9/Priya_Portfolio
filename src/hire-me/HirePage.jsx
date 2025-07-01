import Hero from "./components/Hero";
import About from "./components/About";
import WorkProcess from "./components/WorkProcess";
import Testimonials from "./components/Testimonials";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
// import Footer from "./components/Footer";
import { Link } from "react-router-dom";

function HirePage() {
  return (
    <div className="bg-gray-50">
      
      <Hero />
      <Link to="/"
          className="fixed top-4 left-4 md:top-6 md:left-6 px-3 py-1 bg-white bg-opacity-60 text-gray-900 font-semibold text-sm rounded-md shadow-md hover:bg-opacity-90 transition-all"
        >
          ← Back
        </Link>
      <About />
      <WorkProcess />
      <Testimonials />
      <Portfolio />
      <Contact />
      {/* <Footer /> */}
    </div>
  );
}
export default HirePage;
