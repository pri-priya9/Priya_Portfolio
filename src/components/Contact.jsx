import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <form className="max-w-lg mx-auto bg-gray-300 p-8 rounded-lg shadow-lg space-y-6"
        action="https://formspree.io/f/xyzkpkdp"
        method="POST"
        >
          <div className="space-y-4">
            <input

              type="text"
              placeholder="Your Name"
              required
              name='name'
              className="w-full p-4 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              name='email'
              className="w-full p-4 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              required
              name='phone'
              className="w-full p-4 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              required
              name='message'
              className="w-full p-4 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              name='submit'
              className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
