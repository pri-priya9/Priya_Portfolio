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
import { HelmetProvider } from 'react-helmet-async';
import "./App.css";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div>
          <Routes>
            {/* Main Portfolio Route (with Navbar) */}
            <Route
              path="/"
              element={
                <>
                  <Helmet>
                    <title>Priya Yadav | Full Stack Developer & UI/UX Designer Portfolio</title>
                    <meta name="description" content="Priya Yadav - Expert Full Stack Developer & UI/UX Designer specializing in React.js, JavaScript, Node.js, MongoDB. Building modern web applications with clean code and beautiful designs." />
                    <meta name="keywords" content="Priya Yadav, Full Stack Developer, React Developer, UI/UX Designer, Web Developer, JavaScript Developer, Frontend Developer, Portfolio, MERN Stack Developer, Node.js, MongoDB, Web Design, Responsive Design, Modern Web Development, Software Engineer, Frontend Engineer, Backend Developer, Web Applications, Freelance Developer, Tech Portfolio, Coding, Programming, Software Development, User Experience, User Interface, Web Technologies, Arrah, Bihar, India top 1 Developer, Best Developer in Arrah, Full Stack Engineer, Web Solutions, Arrah tech services, top developer in bihar, priyayadav, priyayadav9" />
                    <meta property="og:title" content="Priya Yadav | Full Stack Developer & UI/UX Designer" />
                    <meta property="og:description" content="Expert Full Stack Developer & UI/UX Designer specializing in modern web technologies and responsive designs." />
                    <meta property="og:url" content="https://priya9.netlify.app/" />
                    <meta property="og:image" content="https://priya9.netlify.app/og-image.jpg" />
                    <meta name="twitter:title" content="Priya Yadav | Full Stack Developer" />
                    <meta name="twitter:description" content="Expert Full Stack Developer & UI/UX Designer building modern web applications." />
                    <meta name="twitter:image" content="https://priya9.netlify.app/og-image.jpg" />
                    <link rel="canonical" href="https://priya9.netlify.app/" />
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Priya Yadav",
                        "url": "https://priya9.netlify.app/",
                        "jobTitle": "Full Stack Developer & UI/UX Designer",
                        "description": "Expert Full Stack Developer specializing in React.js, Node.js, MongoDB and modern web technologies.",
                        "knowsAbout": ["React.js", "JavaScript", "Node.js", "MongoDB", "UI/UX Design", "Web Development"],
                        "sameAs": [
                          "https://github.com/pri-priya9",
                          "https://linkedin.com/in/priyayadav9",
                          "https://twitter.com/priyayadav9"
                        ]
                      })}
                    </script>
                  </Helmet>
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
                  <Helmet>
                    <title>Hire Priya Yadav | Full Stack Developer & UI/UX Designer</title>
                    <meta name="description" content="Hire Priya Yadav - Expert Full Stack Developer & UI/UX Designer for your web projects. Specializing in React.js, Node.js, MongoDB. Get top-quality web solutions from Arrah, Bihar." />
                    <meta name="keywords" content="Hire Developer, Full Stack Engineer, Web Solutions, Arrah tech services, Priya Yadav, Full Stack Developer, React Developer, UI/UX Designer, Freelance Developer, Hire Full Stack Developer, Best Developer in Arrah, top developer in bihar, priyayadav, priyayadav9, Web Applications, Software Engineer" />
                    <meta property="og:title" content="Hire Priya Yadav | Full Stack Developer & UI/UX Designer" />
                    <meta property="og:description" content="Hire expert Full Stack Developer for modern web applications. Specializing in React.js, Node.js, MongoDB." />
                    <meta property="og:url" content="https://priya9.netlify.app/hire-me" />
                    <meta property="og:image" content="https://priya9.netlify.app/og-image.jpg" />
                    <meta name="twitter:title" content="Hire Priya Yadav | Full Stack Developer" />
                    <meta name="twitter:description" content="Hire expert Full Stack Developer for your web projects." />
                    <meta name="twitter:image" content="https://priya9.netlify.app/og-image.jpg" />
                    <link rel="canonical" href="https://priya9.netlify.app/hire-me" />
                  </Helmet>
                  <HirePage />
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
