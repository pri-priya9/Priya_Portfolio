import { useState, useEffect } from "react";

const Testimonials = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ name: "", text: "", rating: 0 });

    // Local Storage se feedbacks load karna
    useEffect(() => {
        const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        setFeedbacks(savedFeedbacks);
    }, []);

    // Feedback save karne ka function
    const handleSaveFeedback = () => {
        if (!newFeedback.name || !newFeedback.text || newFeedback.rating === 0) {
            alert("Please fill all fields and select a rating!");
            return;
        }

        const updatedFeedbacks = [...feedbacks, newFeedback];
        setFeedbacks(updatedFeedbacks);
        localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

        // Modal close aur input clear karna
        setIsModalOpen(false);
        setNewFeedback({ name: "", text: "", rating: 0 });
    };

    return (
        <section className="py-16 bg-gray-100">
            <h2 className="text-3xl font-bold text-center">Client Testimonials</h2>

            {/* Testimonials List */}
            <div className="mt-6 space-y-4 px-6">
                {feedbacks.map((feedback, index) => (
                    <div key={index} className="bg-white shadow-lg p-6 rounded-lg">
                        <p className="italic">"{feedback.text}"</p>
                        <p className="font-bold mt-2">- {feedback.name}</p>
                        <p className="text-yellow-500">⭐ {feedback.rating} Stars</p>
                    </div>
                ))}
            </div>

            {/* Feedback Button */}
            <div className="text-center mt-8">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Give Feedback
                </button>
            </div>

            {/* Feedback Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Give Your Feedback</h3>

                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={newFeedback.name}
                            onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <textarea 
                            placeholder="Your Feedback" 
                            value={newFeedback.text}
                            onChange={(e) => setNewFeedback({ ...newFeedback, text: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                        ></textarea>

                        <label className="block font-semibold">Rate Our Work:</label>
                        <div className="flex space-x-2 my-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button 
                                    key={star} 
                                    onClick={() => setNewFeedback({ ...newFeedback, rating: star })} 
                                    className={`p-2 text-xl ${newFeedback.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                                >
                                    ⭐
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveFeedback} 
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
