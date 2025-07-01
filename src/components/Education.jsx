import React from "react";

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-900 text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white
         mb-12">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Card 1 */}
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-blue-700 mb-1 ml-0.8">Current </h3>
            <h2 className="text-2xl font-semibold mb-2">Bachelor of Computer Application <span className="text-blue-500">(BCA)</span></h2>
            <h3 className="text-xl text-blue-500 mb-2">Computer Science - Indra Gandhi National Open University</h3>
            {/* <p className="text-gray-700 mb-4">My Journey</p> */}
            <span className="text-sm text-gray-500">2024 - 2027</span>
          </div>

          {/* Education Card 2 */}
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-blue-700 mb-1 ml-0.8">Advance Education Current Time</h3>
            <h2 className="text-2xl font-semibold mb-2">Web Development</h2>
            <h3 className="text-xl text-blue-500 mb-2">I learn this myself and also learn it online.</h3>
            {/* <p className="text-gray-700 mb-4">My Journey</p> */}
            <span className="text-sm text-gray-500">2022 - Infinity</span>
          </div>
          {/* Education Card 3 */}
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-blue-700 mb-1 ml-0.8">At the time when I was at School</h3>
            <h2 className="text-2xl font-semibold mb-2">Commerce</h2>
            <h3 className="text-xl text-blue-500 mb-2">Stream Commerce - Kendriya Vidyalaya Sangathan</h3>
            {/* <p className="text-gray-700 mb-4">My Journey</p> */}
            <span className="text-sm text-gray-500">2022 - 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
