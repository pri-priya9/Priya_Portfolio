import { useState } from "react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="text-center py-20 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Hey, I'm Priya Yadav 👋</h1>
      <p className="mt-4 text-lg">
        I'm a Web Developer Specialized in{" "}
        <span className="text-blue-500">Frontend</span> and{" "}
        <span className="text-blue-500">Backend</span>{" "}
        Development.
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 inline-block px-6 py-3 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
      >
        Hire Me Now
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Hire Me</h2>

            <form
             action="https://formspree.io/f/xyzkpkdp"
             method="POST">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your name"
                  name="hire-me Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your phone number"
                  name="hire-me Number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1">Why do you want to hire me?</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                  placeholder="Enter your message"
                  name="hire-me Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
