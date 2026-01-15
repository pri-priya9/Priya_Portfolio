import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-white to-blue-50 text-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative -top-1 rounded"></div>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Have a project idea or looking to collaborate? Feel free to reach out
          I’ll respond as soon as possible!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}

          <div className="bg-white p-8 rounded-xl shadow-md space-y-8">
            <h3 className="text-xl font-semibold text-blue-700">
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 text-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600">priyayadav4400@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 text-lg">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+91 7870454198</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-pink-100 text-pink-600 text-lg">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600">Bihar, Arrah (Bhojpur), India</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-md font-semibold text-blue-700 mt-4 mb-5">
                Follow Me
              </h4>
              <div className="flex space-x-5">
                <a
                  href="https://x.com/pri_priya9"
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/in/priyayadav9"
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://github.com/pri-priya9" 
                  className="text-gray-800 hover:text-black text-xl"
                >
                  <FaGithub />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/__pri.priya9?igsh=MTY5enoxYnF5cW9scw=="
                  className="text-pink-500 hover:text-pink-700 text-xl"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <form
            action="https://formspree.io/f/xyzkpkdp"
            method="POST"
            className="bg-white p-8 rounded-xl shadow-md space-y-6"
          >
            <h3 className="text-xl font-semibold text-blue-700">
              Send Me a Message
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center space-x-2 transition duration-300 w-full"
            >
              <span>✉️</span>
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
