const WorkProcess = () => {
  const steps = ["Consultation", "Design", "Development", "Testing", "Launch", "Support"];

  return (
    <section className="py-16 bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-white">My Work Process</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 md:px-12 mt-8">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg p-6 rounded-lg text-center transition duration-300 hover:shadow-xl"
          >
            <p className="text-lg font-semibold text-gray-800">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkProcess;
