const Portfolio = () => {
  const projects = [
    {
      title: 'Movie App',
      image: 'https://user-images.githubusercontent.com/16840579/100399183-a15b8a00-3006-11eb-92ed-d81652e57e60.gif',
      link: 'https://movieweb-with-react.netlify.app/',
    },
    {
      title: 'Weather App',
      image: 'https://cdn.dribbble.com/users/1200964/screenshots/3162905/weather_animated.gif',
      link: 'https://wheather-app-with-react.netlify.app/',
    },
    {
      title: 'Currency Converter',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20230420143221/Animation.gif',
      link: 'https://currency-convertor-9.netlify.app/',
    },
    {
      title: 'React.js Hooks in 1 Project',
      image: 'https://miro.medium.com/v2/resize:fit:1360/1*dXCLjGnYdgwj1O-98pE0Fg.gif',
      link: 'https://all-react-hooks-project.netlify.app/',
    }
  ];
  
  return (
    <section className="py-16 bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-white">My Work</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10 mt-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white shadow-lg p-5 rounded-lg text-center">
            <img src={project.image} alt={project.title} className="w-full h-40 rounded" />
            <p className="text-lg font-semibold mt-2">{project.title}</p>
            <a 
              href="https://github.com/pri-priya9?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Source Code
            </a>
          </div>
        ))}
      </div>

      {/* Read More Link */}
      <div className="text-center mt-8">
        <a 
          href="https://github.com/pri-priya9?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-lg font-semibold"
        >
          Read More
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
