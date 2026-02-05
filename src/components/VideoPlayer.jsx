import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiPlay, FiPause, FiX } from 'react-icons/fi';

const VideoPlayer = ({ videoUrl, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  const getVideoEmbedUrl = () => {
    // Convert Google Drive share link to embed URL
    const fileId = videoUrl.match(/\/d\/([^/]+)?/)?.[1];
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return videoUrl;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Close on ESC key
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <FiX size={24} />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-white text-lg">Loading video...</p>
            </div>
          </div>
        )}

        {/* Video Iframe */}
        <iframe
          ref={iframeRef}
          src={getVideoEmbedUrl()}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          style={{
            pointerEvents: isPlaying ? 'auto' : 'none'
          }}
        />

        {/* Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 rounded-full p-6 text-white shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <FiPlay size={48} className="ml-2" />
            </button>
          </div>
        )}

        {/* Pause Button (when playing) */}
        {isPlaying && !isLoading && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <FiPause size={32} />
          </button>
        )}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VideoPlayer;
