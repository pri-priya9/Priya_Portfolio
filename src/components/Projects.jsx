import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'Movie App',
      image: 'https://user-images.githubusercontent.com/16840579/100399183-a15b8a00-3006-11eb-92ed-d81652e57e60.gif',
      link: 'https://movieweb-with-react.netlify.app/',
      techStack: ['React', 'TMDB API'],
    },
    {
      title: 'Weather App',
      image: 'https://cdn.dribbble.com/users/1200964/screenshots/3162905/weather_animated.gif',
      link: 'https://wheather-app-with-react.netlify.app/',
      techStack: ['React.js', 'OpenWeatherMap API'],
    },
    {
      title: 'React.js Hooks in 1 Project',
      image: 'https://miro.medium.com/v2/resize:fit:1360/1*dXCLjGnYdgwj1O-98pE0Fg.gif',
      link: 'https://all-react-hooks-project.netlify.app/',
      techStack: ['React.js'],
    },
    {
      title: 'Background changer',
      image: 'https://reactjsexample.com/content/images/2017/03/Color-Changer-ReactJS.gif',
      link: 'https://background-changer-with-react.netlify.app/',
      techStack: ['React.js', 'Tailwind CSS'],
    },
    {
      title: 'Password Generator',
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*1TdjSW9_MNOTUsQFwdfN8Q.gif',
      link: 'https://passwordgenerator-with-react.netlify.app/',
      techStack: ['React.js'],
    },
    {
      title: 'Currency Converter',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230420143221/Animation.gif',
      link: 'https://currency-convertor-9.netlify.app/',
      techStack: ['React.js', 'Currency Exchange API', 'Tailwind CSS'],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900 text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-150 h-64 rounded-t-lg mb-6"
              />
              <h3 className="text-2xl font-semibold text-center mb-4">{project.title}</h3>
              
              {/* Technologies Used */}
              <p className="text-center text-gray-700 mb-4">
                <strong>Tech Stack: </strong>
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-blue-500 font-medium">
                    {tech}{i !== project.techStack.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

              <div className="flex justify-center space-x-4">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                    View Project
                  </button>
                </a>
                <a href={'https://github.com/pri-priya9/React-Js-Projects'} target="_blank" rel="noopener noreferrer">
                  <button className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300">
                    Source Code
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
