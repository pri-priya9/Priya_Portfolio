const services = [
  {
    title: 'On Site Work - ReactJS',
    price: '₹4500',
    description: '1 Day of ReactJS work on-site.',
    paymentLink: 'https://paymentlink.com', 
  },
  {
    title: 'Website Development',
    price: '₹12000',
    description: 'Full website development using ReactJS & Tailwind CSS.',
    paymentLink: 'https://paymentlink.com',
  },
  {
    title: 'UI/UX Design',
    price: '₹6000',
    description: 'UI/UX design for web applications.',
    paymentLink: 'https://paymentlink.com',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-lg text-gray-600">{service.description}</p>
              <p className="text-xl font-bold text-gray-800 mt-4">{service.price}</p>
              <a
                href={service.paymentLink}
                className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
