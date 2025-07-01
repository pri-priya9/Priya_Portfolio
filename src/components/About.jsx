import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-100 text-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        
        <div className="mb-8 md:mb-0 md:w-1/3 flex justify-center hidden md:block">
          <img
            src="/aboutImg.jpg"
            alt="Priya Yadav"
            className="w-64 h-64 md:w-97 md:h-110 shadow-xl"
          />
        </div>

        
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-gray-700">
            Hi, I'm <span className="font-semibold">Priya</span>! Hi, my name is Priya Yadav.I completed my education up to 12th grade at Kendriya Vidyalaya, specializing in Commerce during my 11th and 12th grades. However, my passion for coding began in 10th grade, when I started learning Python. I dedicated two years to mastering <span className="text-blue-500">Python</span>, and today, I have strong expertise in this programming language.

Later, my interest shifted to web development, and I focused on building my skills in front-end development. Within a year, I learned <span className="text-blue-500">HTML</span>, <span className="text-blue-500">CSS</span>, <span className="text-blue-500">Javascript</span>, and <span className="text-blue-500">React.js</span>, along with <span className="text-blue-500">Tailwind CSS</span>. Currently, I’m expanding my expertise in back-end development, working with <span className="text-blue-500">Node.js</span>, <span className="text-blue-500">Express.js</span>, <span className="text-blue-500">MongoDb</span>, and <span className="text-blue-500">SQL</span>. I continuously strive to improve and upgrade my skills over time.

I am pursuing a BCA from IGNOU (Indira Gandhi National Open University) while actively working on large-scale projects and freelancing as a web developer. Beyond coding, I have a strong interest in business and possess a business-oriented mindset, which drives me to explore opportunities in the entrepreneurial world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
