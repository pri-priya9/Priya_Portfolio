import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import { databases, Query } from '../appwrite';
import ProjectDetailModal from './ProjectDetailModal';

const IndustryProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
        [Query.orderAsc("position")]
      );
      setProjects(response.documents);
    } catch (error) {
      console.error("Error fetching industry projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="industry-projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-center items-center h-40 sm:h-48 md:h-64">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="industry-projects" className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 md:mb-4"
            >
              Industry-Level{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Projects
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-300 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2"
            >
              Explore my portfolio of large-scale industry projects showcasing real-world solutions and professional development.
            </motion.p>
          </motion.div>

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 dark:text-gray-300 py-10 sm:py-12 md:py-16"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🚀</div>
              <p className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2">
                No industry projects available yet.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Check back later for exciting new additions!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.$id}
                  initial={{ opacity: 0, y: isMobile ? 15 : 30, scale: isMobile ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: isMobile ? 0.3 : 0.4, 
                    delay: isMobile ? index * 0.05 : index * 0.1 
                  }}
                  viewport={{ 
                    once: true, 
                    margin: isMobile ? "-20px" : "-50px" 
                  }}
                  whileHover={{ 
                    y: isMobile ? -4 : -8, 
                    scale: isMobile ? 1.01 : 1.02 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image - Responsive */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                        <p className="text-white text-xs sm:text-sm font-medium">
                          {isMobile ? 'Tap for details' : 'Click to view details'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Mobile Touch Indicator */}
                    {isMobile && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Project Details - Responsive */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex flex-col h-full">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-1 sm:mb-2 md:mb-3 line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Description Preview - Responsive */}
                      {project.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm line-clamp-2 sm:line-clamp-2 leading-relaxed flex-grow">
                          {project.description}
                        </p>
                      )}

                      {/* Live Link - Responsive */}
                      {project.liveLink && (
                        <div className="pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? -0.5 : -1 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-md shadow-blue-500/25 w-full sm:w-auto"
                          >
                            <FiExternalLink size={isMobile ? 12 : 14} />
                            <span>{isMobile ? 'Visit' : 'Visit Project'}</span>
                          </motion.a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* View More Indicator for Mobile */}
          {projects.length > 0 && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6 sm:mt-8"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Swipe horizontally to see more projects →
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default IndustryProjects;
