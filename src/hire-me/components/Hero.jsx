import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiUser, FiMessageSquare, FiX } from "react-icons/fi";
import emailjs from '@emailjs/browser';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await emailjs.send(
        'service_2gs4uqk', // Your service ID
        'template_o2fpbsp', // Your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone,
          message: formData.message
        },
        'dgdc6ZiTVO8rXGxb6' // Your public key
      );
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hey, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Priya </span> 👋
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            I&apos;m a Full Stack Developer specialized in{" "}
            <span className="text-blue-400 font-medium">Frontend</span>,{" "}
            <span className="text-blue-400 font-medium">Backend</span>, and{" "}
            <span className="text-blue-400 font-medium">Database</span>
          </p>
          
          <motion.button
            onClick={() => setIsOpen(true)}
            className="mt-8 inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMail className="mr-2" />
            Hire Me Now
          </motion.button>
        </motion.div>

        {/* Modal Popup */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX className="text-xl" />
                </button>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Thank You!</h3>
                    <p className="text-gray-600 text-sm">Your message has been sent successfully.</p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Let&apos;s Work Together</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1 flex items-center text-sm">
                          <FiUser className="mr-2 text-base" />
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1 flex items-center text-sm">
                          <FiMail className="mr-2 text-base" />
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="your.email@example.com"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1 flex items-center text-sm">
                          <FiPhone className="mr-2 text-base" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+91 1234567890"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-5">
                        <label className="block text-gray-700 font-medium mb-1 flex items-center text-sm">
                          <FiMessageSquare className="mr-2 text-base" />
                          Project Details
                        </label>
                        <textarea
                          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  focus-within:text-gray-800 not-focus-within:text-gray-700 not-focus-within:placeholder:text-gray-400"
                          rows="3"
                          placeholder="Tell me about your project..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all text-sm"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;