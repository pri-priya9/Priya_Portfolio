import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

const Testimonials = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ name: "", text: "", rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init("dgdc6ZiTVO8rXGxb6");
    }, []);

    // Load feedbacks from Local Storage
    useEffect(() => {
        const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        setFeedbacks(savedFeedbacks);
    }, []);

    // Show success message and hide after 1 second
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    // Save feedback to Local Storage and send email
    const handleSaveFeedback = async () => {
        if (!newFeedback.name || !newFeedback.text || newFeedback.rating === 0) {
            alert("Please fill all fields and select a rating!");
            return;
        }

        const feedbackWithDate = {
            ...newFeedback,
            date: new Date().toLocaleDateString()
        };

        // Save to local storage
        const updatedFeedbacks = [...feedbacks, feedbackWithDate];
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

        try {
            // Send email using EmailJS
            await emailjs.send(
                "service_2gs4uqk",
                "template_4929ty3",
                {
                    from_name: newFeedback.name,
                    message: newFeedback.text,
                    rating: newFeedback.rating
                }
            );

            // Show success message
            setShowSuccess(true);
            
            // Close modal and reset form
            setIsModalOpen(false);
            setNewFeedback({ name: "", text: "", rating: 0 });
        } catch (error) {
            console.error("Failed to send feedback:", error);
            alert("Failed to send feedback. Please try again.");
        }
    };

    // Animation variants
    const testimonialVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: { opacity: 0, scale: 0.9 }
    };

    const successVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <motion.h2 
                    className="text-4xl font-bold text-center mb-12 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Client Testimonials
                </motion.h2>

                {/* Success Notification */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
                        >
                            Feedback submitted successfully!
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Testimonials Grid */}
                {feedbacks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {feedbacks.map((feedback, index) => (
                                <motion.div
                                    key={index}
                                    variants={testimonialVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                            {feedback.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-bold text-lg">{feedback.name}</h3>
                                            <p className="text-sm text-gray-500">{feedback.date}</p>
                                        </div>
                                    </div>
                                    <p className="italic text-gray-700 mb-4">&quot;{feedback.text}&quot;</p>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">{feedback.rating}.0</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        className="text-center py-12 bg-white rounded-xl shadow-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-gray-500 text-lg">No testimonials yet. Be the first to share your experience!</p>
                    </motion.div>
                )}

                {/* Feedback Button */}
                <div className="text-center mt-12">
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Share Your Feedback
                    </motion.button>
                </div>

                {/* Feedback Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                variants={modalVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            value={newFeedback.name}
                                            onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                                        <textarea
                                            placeholder="Share your experience..."
                                            value={newFeedback.text}
                                            onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="focus:outline-none"
                                                >
                                                    <svg
                                                        className={`w-8 h-8 ${(hoverRating || newFeedback.rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <motion.button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        onClick={handleSaveFeedback}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Submit Feedback
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Testimonials;