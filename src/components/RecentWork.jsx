import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize, FiChevronDown } from 'react-icons/fi';

const RecentWork = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Aictum",
      description: "Aictum is a Ai-Blockchain Based Company that provides AI solutions for various industries.",
      videoUrl: "/videos/Aictum.mp4",
      thumbnail: "/thumbnails/aictum.png",
      category: "Frontend"
    },
    {
      id: 2,
      title: "Ayuris Pharma Dashboard",
      description: "Ayuris Pharma Dashboard is a comprehensive platform for managing pharmaceutical operations.",
      videoUrl: "/videos/Pharma.mp4",
      thumbnail: "/thumbnails/pharma.png",
      category: "Frontend"
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Show only 3 projects initially unless "View All" is clicked
  const displayedProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 3);

  return (
    <section id="recent-work" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recent <span className="text-blue-600">Work</span>
            <div className="h-1 w-24 bg-blue-500 mx-auto mt-2 rounded"></div>
          </h2>
          </div>
          
          <p className="text-gray-700  max-w-2xl mx-auto mb-6">
            Here are the projects I&apos;ve been working on recently. Click on any video to see detailed demonstrations.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['All', 'Frontend', 'Backend', 'Full Stack', 'MERN Stack'].map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setShowAllProjects(false); // Reset view all when changing category
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isMobile={isMobile} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-800 py-12">
              There are currently no Works in this category.
            </div>
          )}
        </div>

        {/* View All Button (only shown when there are more projects to show) */}
        {filteredProjects.length > 3 && !showAllProjects && (
          <motion.div 
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(true)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              View All Projects <FiChevronDown className="mt-0.5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isMobile }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Format time (seconds to mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
    setIsLoading(false);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isDragging) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleProgressBarMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressBarMouseMove = useCallback((e) => {
    if (!isDragging || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos)); // Clamp between 0 and 1
    
    videoRef.current.currentTime = pos * videoRef.current.duration;
  }, [isDragging]);

  const handleProgressBarMouseUp = () => {
    setIsDragging(false);
  };

  const skipForward = () => {
    videoRef.current.currentTime += 5;
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  useEffect(() => {
    // Add event listeners for mouse move and up on the document level
    document.addEventListener('mousemove', handleProgressBarMouseMove);
    document.addEventListener('mouseup', handleProgressBarMouseUp);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleProgressBarMouseMove);
      document.removeEventListener('mouseup', handleProgressBarMouseUp);
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isDragging, handleProgressBarMouseMove]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Video Player */}
      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.thumbnail}
          className="w-full h-auto aspect-video object-cover cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          loop
          preload="metadata"
          loading="lazy"
        />

        {/* Video Controls */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 ${
            (showControls || isMobile || isDragging) ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
        >
          {/* Progress Bar */}
          <div 
            ref={progressBarRef}
            className="w-full bg-gray-600/50 h-2 rounded-full mb-2 overflow-hidden cursor-pointer"
            onClick={handleProgressBarClick}
            onMouseDown={handleProgressBarMouseDown}
          >
            <motion.div
              className="bg-blue-500 h-full rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Skip Backward Button */}
              <motion.button
                onClick={skipBackward}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-blue-400 transition-colors hidden sm:block"
                aria-label="Skip backward 5 seconds"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 19 2 12 11 5 11 19"></polygon>
                  <polygon points="22 19 13 12 22 5 22 19"></polygon>
                </svg>
              </motion.button>

              {/* Play/Pause Button */}
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </motion.button>

              {/* Skip Forward Button */}
              <motion.button
                onClick={skipForward}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-blue-400 transition-colors hidden sm:block"
                aria-label="Skip forward 5 seconds"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 19 22 12 13 5 13 19"></polygon>
                  <polygon points="2 19 11 12 2 5 2 19"></polygon>
                </svg>
              </motion.button>

              {/* Time Display */}
              <div className="text-white text-xs sm:text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Volume Control */}
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </motion.button>

              {/* Fullscreen Button */}
              <motion.button
                onClick={toggleFullscreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-blue-400 transition-colors"
                aria-label={isFullscreen ? "Minimize" : "Maximize"}
              >
                {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black/50 rounded-full p-4 text-white hover:bg-black/70 transition-all"
              aria-label="Play video"
            >
              <FiPlay size={32} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          {project.description}
        </p>
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          project.category === 'Frontend' 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            : project.category === 'Backend'
            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
            : project.category === 'Full Stack'
            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
            : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
        }`}>
          {project.category}
        </span>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    videoUrl: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default RecentWork;