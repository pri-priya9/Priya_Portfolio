import React, { useState, useEffect, useRef } from "react";
import { databases, Query } from "../appwrite";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const sectionRef = useRef(null);
    const carouselRef = useRef(null);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            [Query.orderDesc("$createdAt")]
          );
          setProjects(response.documents);
        } catch (err) {
          console.error("Error fetching projects:", err);
          setError("Failed to load projects. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
  
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      };
  
      handleScroll(); // Initial check
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }, [projects]);
  
    const scrollCarousel = (direction) => {
      const carousel = carouselRef.current;
      if (!carousel) return;
  
      const cardWidth = carousel.firstChild?.clientWidth || 300;
      const scrollAmount = cardWidth * (direction === 'left' ? -1 : 1);
      
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    };
  
    if (loading) {
      return (
        <section id="projects" ref={sectionRef} className="py-16 md:py-20 bg-gray-900 text-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              My <span className="text-blue-600">Projects</span>
            </h2>
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </section>
      );
    }
  
    if (error) {
      return (
        <section id="projects" ref={sectionRef} className="py-16 md:py-20 bg-gray-50 text-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              My <span className="text-blue-600">Projects</span>
            </h2>
            <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      );
    }
  
    return (
      <section id="projects" ref={sectionRef} className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold inline-block relative pb-2">
              My <span className="text-blue-600">Projects</span>
              <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 rounded"></div>
            </h2>
          </div>
  
          {projects.length === 0 ? (
            <div className="max-w-md mx-auto text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-600">No projects available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="relative">
              {/* Carousel container */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {projects.map((project) => (
                  <div
                    key={project.$id}
                    className="flex-shrink-0 w-72 sm:w-80 lg:w-96 mx-2 rounded-xl shadow-lg border border-gray-700 overflow-hidden bg-gray-200"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-56 rounded-lg mb-4 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400?text=Project+Image";
                          e.target.className = "w-full h-48 md:h-56 object-contain p-4 bg-gray-100";
                        }}
                      />
                      <h3 className="text-xl font-semibold text-center mb-3 text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-center text-gray-700 mb-4 flex-grow">
                        <strong>Tech Stack: </strong>
                        {project.techStack.split(",").map((tech, i, arr) => (
                          <span key={i} className="text-blue-600 font-medium">
                            {tech.trim()}
                            {i !== arr.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                      <div className="flex justify-center space-x-3 mt-auto">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <button className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 text-sm md:text-base">
                            View Project
                          </button>
                        </a>
                        {project.sourceCode && (
                          <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 text-sm md:text-base">
                              Source Code
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Navigation buttons - positioned at bottom right */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => scrollCarousel('left')}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    canScrollLeft 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
  
                <button
                  onClick={() => scrollCarousel('right')}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    canScrollRight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
  
              {/* Scroll indicators for mobile */}
              <div className="flex justify-center mt-4 space-x-2 sm:hidden">
                {projects.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-500"
                  ></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };
export default Projects;
