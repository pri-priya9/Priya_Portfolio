import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaDatabase,
  FaMobileAlt,
  FaServer,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { FaLayerGroup, FaUsers, FaAward } from "react-icons/fa";

const Home = () => {
  const [showResume, setShowResume] = useState(false);
  const skills = [
    { name: "Frontend", icon: <FaCode className="text-blue-400 mr-2" /> },
    { name: "Backend", icon: <FaServer className="text-yellow-400 mr-2" /> },
    { name: "Database", icon: <FaDatabase className="text-purple-400 mr-2" /> },
    {
      name: "Responsive Design",
      icon: <FaMobileAlt className="text-green-400 mr-2" />,
    },
  ];

  const toggleResume = () => {
    setShowResume(!showResume);
  };

  return (
    <section id="home" className="relative bg-gray-900 text-white py-20 md:py-40">
      {/* Main Content - Will be visible behind the modal */}
      <div className={`container mx-auto flex flex-col md:flex-row items-center px-4 ${
        showResume ? "filter blur-sm pointer-events-none" : ""
      }`}>
        {/* Image Section */}
        <div className="-mt-10 md:-mt-20 md:w-1/2 flex justify-center mb-6 md:mb-0 relative -top-3">
          <img
            src="/profile.jpg"
            alt="Priya Yadav"
            className="w-80 md:w-96 h-[420px] md:h-[500px] object-cover shadow-lg rounded-xl"
          />
        </div>

        {/* Content Section */}
        <div className="text-center md:text-left md:w-1/2 md:-mt-30">
          <h2 className="text-lg text-blue-400 font-semibold mb-2 tracking-wide">
            Hello I&apos;m
          </h2>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Priya <span className="text-blue-500">Yadav</span>
          </h1>

          <p className="text-lg text-gray-300 mb-4">
            A professional{" "}
            <span className="font-semibold text-blue-500 underline underline-offset-4 decoration-2 decoration-blue-400">
              Full Stack Developer
            </span>
          </p>

          <p className="text-lg mb-6">
            I craft modern, fully responsive websites and web applications with
            clean, efficient code and a strong focus on user experience.
            Dedicated to delivering high-quality, impactful digital solutions.
          </p>

          {/* Skills Section */}
          <div className="mb-3">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-800 rounded-md px-4 py-2 text-sm"
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-10 mb-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {/* Years Experience */}
              <div className="bg-gray-800 rounded-md px-4 py-4 text-center text-white w-36 hover:scale-105 transition-transform">
                <div className="text-blue-400 text-xl mb-1">
                  <FaCode className="mx-auto mb-1" />
                </div>
                <div className="text-blue-400 text-lg font-semibold">3+</div>
                <div className="text-xs text-gray-300">Years Experience</div>
              </div>

              {/* Projects Completed */}
              <div className="bg-gray-800 rounded-md px-4 py-4 text-center text-white w-36 hover:scale-105 transition-transform">
                <div className="text-purple-400 text-xl mb-1">
                  <FaLayerGroup className="mx-auto mb-1" />
                </div>
                <div className="text-purple-400 text-lg font-semibold">50+</div>
                <div className="text-xs text-gray-300">Projects Completed</div>
              </div>

              {/* Happy Clients */}
              <div className="bg-gray-800 rounded-md px-4 py-4 text-center text-white w-36 hover:scale-105 transition-transform">
                <div className="text-green-400 text-xl mb-1">
                  <FaUsers className="mx-auto mb-1" />
                </div>
                <div className="text-green-400 text-lg font-semibold">20+</div>
                <div className="text-xs text-gray-300">Happy Clients</div>
              </div>

              {/* Technologies Used */}
              <div className="bg-gray-800 rounded-md px-4 py-4 text-center text-white w-36 hover:scale-105 transition-transform">
                <div className="text-yellow-400 text-xl mb-1">
                  <FaAward className="mx-auto mb-1" />
                </div>
                <div className="text-yellow-400 text-lg font-semibold">10+</div>
                <div className="text-xs text-gray-300">Technologies Used</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={toggleResume}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaDownload className="mr-2" /> View Resume
            </button>
            <Link
              to="/hire-me"
              className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-6 rounded-full flex items-center justify-center transition duration-300"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>

      {/* Resume Modal - Semi-transparent overlay with content visible behind */}
      {showResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Semi-transparent overlay with very light blur */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[1px]"
            onClick={toggleResume}
          ></div>
          
          {/* Resume Container */}
          <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <button
              onClick={toggleResume}
              className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors z-50 bg-gray-800 rounded-full p-2"
            >
              <FaTimes className="text-xl" />
            </button>
            <iframe
              src="https://www.canva.com/design/DAGhBkmNZNQ/9pUKd-Lank8JU5PDIedz2g/view?embed"
              className="w-full h-full"
              allowFullScreen
              title="Priya Yadav's Resume"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;