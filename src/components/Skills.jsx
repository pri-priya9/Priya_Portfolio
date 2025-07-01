import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

const skills = [
  { name: "HTML/CSS", percent: 95, icon: <FaHtml5 className="text-orange-500" /> },
  { name: "JavaScript", percent: 95, icon: <FaJs className="text-yellow-500" /> },
  { name: "React", percent: 90, icon: <FaReact className="text-blue-500" /> },
  { name: "Node.js", percent: 50, icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express.js", percent: 10, icon: <SiExpress className="text-gray-500" /> },
  { name: "MongoDB", percent: 10, icon: <SiMongodb className="text-green-700" /> },
  { name: "Git", percent: 80, icon: <FaGitAlt className="text-red-500" /> },
  { name: "Python", percent: 85, icon: <FaPython className="text-blue-400" /> },
  { name: "SQL", percent: 80, icon: <FaDatabase className="text-indigo-500" /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 tracking-wide">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-200 shadow-2xl rounded-xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:shadow-3xl">
              <div className="text-5xl mb-4 animate-bounce">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{skill.name}</h3>
              <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
              <span className="mt-2 text-gray-600 font-medium text-lg">{skill.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
