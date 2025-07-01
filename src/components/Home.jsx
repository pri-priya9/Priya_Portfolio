import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="home" className="relative bg-gray-900 text-white py-20 md:py-40">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        
        <div className="-mt-13 md:-mt-30 md:w-1/2 flex justify-center mb-6 md:mb-0">
  <img
    src="/priyaa.jpg"
    alt="Priya Yadav"
    className="w-80 h-110 md:w-96 md:h-140 shadow-lg"
  />
</div>


        <div className="text-center md:text-left md:w-1/2 md:-mt-30" >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Priya <span className="text-blue-500"></span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-6">
            I am a <span className="font-semibold text-blue-500">Web Developer</span> with <span className="font-semibold text-blue-500" >+3</span> years of experience.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.canva.com/design/DAGhBkmNZNQ/9pUKd-Lank8JU5PDIedz2g/view?utm_content=DAGhBkmNZNQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h49b1cd1c8b" target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                View Resume
              </button>
            </a>
            <Link to='/hire-me'>
              <button className="bg-transparent border-2 border-blue-500 text-blue-500 py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
                Hire Me
              </button>
           </Link>
          </div>
        </div>       
      </div>
    </section>
  );
};

export default Home;
