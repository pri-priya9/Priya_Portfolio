const Contact = () => {
    return (
      <section id="contact" className="py-16">
        <h2 className="text-3xl font-bold text-center">Get in Touch</h2>
        <form 
         action="https://formspree.io/f/xyzkpkdp"
        method="POST"
        className="max-w-lg mx-auto mt-6 bg-gray-300 shadow-lg p-6 rounded-lg ">
          <input type="text" name="Name" placeholder="Your Name" className="w-full p-3 border rounded-lg mb-4" />
          <input type="email" name="Email" placeholder="Your Email" className="w-full p-3 border rounded-lg mb-4" />
          <textarea placeholder="Your Message" name="Massage" className="w-full p-3 border rounded-lg mb-4"></textarea>
          <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">Send Message</button>
        </form>
      </section>
    );
  };
  export default Contact;
  