import { useState, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import VideoPlayer from "./VideoPlayer";

const ProjectDetailModal = ({ project, onClose, isMobile = false }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const imagesContainerRef = useRef(null);

  // ✅ Parse images from comma-separated string
  const images = useMemo(() => {
    return project?.images
      ? project.images
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean)
      : [];
  }, [project?.images]);

  // ✅ Get video embed URL
  const getVideoEmbedUrl = (url) => {
    if (!url) return "";

    // Google Drive share link to embed
    const fileId = url.match(/\/d\/([^/]+)?/)?.[1];
    if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;

    // YouTube embed
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

    return url;
  };

  // ✅ Format description with line breaks
  const formatDescription = (text) => {
    if (!text) return "";
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <span key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </span>
    ));
  };

  // ✅ Check if images container needs scroll buttons
  useEffect(() => {
    const checkScroll = () => {
      const container = imagesContainerRef.current;
      if (container) {
        const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
        setShowScrollButtons(hasHorizontalScroll && isMobile);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [images, isMobile]);

  // ✅ Scroll functions for mobile carousel
  const scrollLeft = () => {
    if (imagesContainerRef.current) {
      imagesContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (imagesContainerRef.current) {
      imagesContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  // ✅ Handle image click with index for fullscreen viewer
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // ✅ Navigate between images in fullscreen viewer
  const nextImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) {
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-3 md:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 18 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-4xl
              bg-white dark:bg-gray-800
              rounded-xl sm:rounded-2xl
              shadow-2xl
              overflow-hidden
              max-h-[95vh]
              sm:max-h-[90vh]
              flex flex-col
            "
          >
            {/* ✅ Sticky Top Bar (Mobile Friendly) */}
            <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 flex items-center justify-between">
              <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate pr-3">
                {project?.title || "Project Details"}
              </p>

              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:scale-105 shadow-md active:scale-95"
                aria-label="Close Modal"
              >
                <FiX size={isMobile ? 18 : 20} />
              </button>
            </div>

            {/* ✅ Scrollable Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Video Section */}
              {project.videoUrl && (
                <div className="relative">
                  <div
                    className="w-full aspect-video bg-gray-900 relative group cursor-pointer overflow-hidden"
                    onClick={() => setShowVideoPlayer(true)}
                  >
                    <iframe
                      src={getVideoEmbedUrl(project.videoUrl)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      style={{ pointerEvents: "none" }}
                      title="Video Preview"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center px-3 sm:px-4">
                        <motion.div
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600/90 hover:bg-blue-700 rounded-full p-3 sm:p-4 md:p-6 text-white shadow-2xl mb-2 inline-flex items-center justify-center backdrop-blur-sm"
                        >
                          <FiPlay size={isMobile ? 20 : 28} className="ml-0.5 sm:ml-1" />
                        </motion.div>
                        <p className="text-white text-xs sm:text-sm md:text-lg font-medium drop-shadow-lg">
                          {isMobile ? 'Tap to Play Video' : 'Tap to Play Full Video'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 md:mb-4 break-words">
                  {project.title}
                </h2>

                {/* Description */}
                {project.description && (
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-1.5 sm:mb-2 md:mb-3">
                      Description
                    </h3>

                    <div className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {formatDescription(project.description)}
                    </div>
                  </div>
                )}

                {/* Images Section - Responsive Carousel */}
                {images.length > 0 && (
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
                        Project Images ({images.length})
                      </h3>
                      {isMobile && images.length > 1 && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Swipe →
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Desktop Grid Layout */}
                    {!isMobile ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                        {images.map((image, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg cursor-pointer bg-gray-100 dark:bg-gray-900"
                            onClick={() => handleImageClick(image, index)}
                          >
                            <img
                              src={image}
                              alt={`Project screenshot ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      /* Mobile Horizontal Carousel */
                      <div className="relative">
                        {/* Scroll Buttons (Conditional) */}
                        {showScrollButtons && (
                          <>
                            <button
                              onClick={scrollLeft}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg"
                              aria-label="Scroll left"
                            >
                              <FiChevronLeft size={20} className="text-gray-800 dark:text-white" />
                            </button>
                            <button
                              onClick={scrollRight}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg"
                              aria-label="Scroll right"
                            >
                              <FiChevronRight size={20} className="text-gray-800 dark:text-white" />
                            </button>
                          </>
                        )}

                        {/* Images Container with Horizontal Scroll */}
                        <div
                          ref={imagesContainerRef}
                          className="flex overflow-x-auto gap-2.5 pb-3 -mx-1 px-1 scrollbar-hide"
                          style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                          }}
                        >
                          {images.map((image, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-shrink-0 w-48 sm:w-56 aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-900"
                              onClick={() => handleImageClick(image, index)}
                            >
                              <div className="relative w-full h-full">
                                <img
                                  src={image}
                                  alt={`Project screenshot ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                {/* Image Number Badge */}
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                  {index + 1}/{images.length}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        {/* Scroll Indicator Dots */}
                        {images.length > 1 && (
                          <div className="flex justify-center mt-3 space-x-1.5">
                            {Array.from({ length: Math.min(images.length, 5) }).map((_, idx) => (
                              <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  idx === 0 
                                    ? 'w-6 bg-blue-500' 
                                    : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                                }`}
                              />
                            ))}
                            {images.length > 5 && (
                              <span className="text-xs text-gray-500 ml-1">
                                +{images.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Live Link */}
                {project.liveLink && (
                  <div className="mt-4 sm:mt-5 md:mt-6">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        w-full
                        inline-flex items-center justify-center gap-1.5 sm:gap-2
                        px-4 sm:px-5 md:px-6 py-2.5 sm:py-3
                        bg-blue-600 hover:bg-blue-700
                        text-white
                        rounded-lg sm:rounded-xl
                        text-sm sm:text-base md:text-lg
                        font-semibold
                        transition-all duration-300
                        shadow-lg shadow-blue-500/25
                        active:bg-blue-800
                      "
                    >
                      <FiExternalLink size={isMobile ? 14 : 18} />
                      {isMobile ? 'Visit Project' : 'Visit Live Project'}
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Video Player Modal */}
      {showVideoPlayer && (
        <VideoPlayer
          videoUrl={project.videoUrl}
          onClose={() => setShowVideoPlayer(false)}
          isMobile={isMobile}
        />
      )}

      {/* ✅ Full Screen Image Viewer with Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-2 sm:p-3 md:p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-200 active:scale-95"
              aria-label="Close Image Viewer"
            >
              <FiX size={isMobile ? 18 : 22} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Navigation Buttons (only show if multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-200 active:scale-95"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={isMobile ? 24 : 28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2 sm:p-3 rounded-full transition-all duration-200 active:scale-95"
                  aria-label="Next image"
                >
                  <FiChevronRight size={isMobile ? 24 : 28} />
                </button>
              </>
            )}

            {/* Image with Gesture Support */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={`Project screenshot ${currentImageIndex + 1}`}
                className="
                  max-w-full max-h-[85vh]
                  object-contain
                  rounded-lg sm:rounded-xl
                  shadow-2xl
                  select-none
                "
                draggable={false}
              />
            </motion.div>

            {/* Image Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                      setSelectedImage(images[idx]);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

ProjectDetailModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    videoUrl: PropTypes.string,
    images: PropTypes.string,
    description: PropTypes.string,
    liveLink: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};

export default ProjectDetailModal;
