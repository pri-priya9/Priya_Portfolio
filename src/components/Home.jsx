import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaPalette, FaMobileAlt, FaServer, FaDownload } from 'react-icons/fa';

const Home = () => {
  const skills = [
    { name: "Frontend Development", icon: <FaCode className="text-blue-400 mr-2" /> },
    { name: "UI/UX Design", icon: <FaPalette className="text-purple-400 mr-2" /> },
    { name: "Responsive Design", icon: <FaMobileAlt className="text-green-400 mr-2" /> },
    { name: "Backend Integration", icon: <FaServer className="text-yellow-400 mr-2" /> }
  ];

  return (
    <section id="home" className="relative bg-gray-900 text-white py-20 md:py-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        
        {/* Image Section - EXACTLY AS YOU WANTED (NO CHANGES) */}
        <div className="-mt-13 md:-mt-30 md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src="/priyaa.jpg"
            alt="Priya Yadav"
            className="w-80 h-110 md:w-96 md:h-140 shadow-lg"
          />
        </div>

        {/* Enhanced Content Section */}
        <div className="text-center md:text-left md:w-1/2 md:-mt-30">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Priya <span className="text-blue-500">Yadav</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            I am a <span className="font-semibold text-blue-500">Web Developer</span> with <span className="font-semibold text-blue-500">3+ years</span> of experience.
          </p>

          {/* Skills with Icons (NEW ADDITION) */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
                  {skill.icon}
                  <span className="text-sm md:text-base">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons (Improved) */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
            <a 
              href="https://www.canva.com/design/DAGhBkmNZNQ/9pUKd-Lank8JU5PDIedz2g/view" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full flex items-center justify-center transition duration-300"
            >
              <FaDownload className="mr-2" /> View Resume
            </a>
            <Link 
              to='/hire-me'
              className="bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-6 rounded-full flex items-center justify-center transition duration-300"
            >
              Hire Me
            </Link>
          </div>
        </div>       
      </div>
    </section>
  );
};

export default Home;