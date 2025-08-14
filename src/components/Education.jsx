import React from "react";

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Education</h2>
          <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 rounded"></div>
        </div>

        {/* Cards in a single row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-sky-500 transition-all duration-300">
            <h3 className="text-blue-400 mb-1">Current</h3>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Bachelor of Computer Application{" "}
              <span className="text-blue-400">(BCA)</span>
            </h2>
            <h3 className="text-xl text-blue-400 mb-2">
              Computer Science - Indra Gandhi National Open University
            </h3>
            <span className="text-sm text-gray-300">2024 - 2027</span>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-sky-500 transition-all duration-300">
            <h3 className="text-blue-400 mb-1">Advance Education Current Time</h3>
            <h2 className="text-2xl font-semibold mb-2 text-white">Full Stack Development</h2>
            <h3 className="text-xl text-blue-400 mb-2">
              I learn this myself and also learn it online.
            </h3>
            <span className="text-sm text-gray-300">2022 - Present</span>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-sky-500 transition-all duration-300">
            <h3 className="text-blue-400 mb-1">At the time when I was at School</h3>
            <h2 className="text-2xl font-semibold mb-2 text-white">Commerce</h2>
            <h3 className="text-xl text-blue-400 mb-2">
              Stream Commerce - Kendriya Vidyalaya Sangathan
            </h3>
            <span className="text-sm text-gray-300">2022 - 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
