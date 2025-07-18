import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaPython,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTypescript, SiAppwrite } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

const skills = [
  {
    name: "HTML/CSS",
    percent: 95,
    icon: <FaHtml5 className="text-orange-500" />,
  },
  {
    name: "JavaScript",
    percent: 95,
    icon: <FaJs className="text-yellow-500" />,
  },
  { name: "React", percent: 90, icon: <FaReact className="text-blue-500" /> },
  {
    name: "Node.js",
    percent: 50,
    icon: <FaNodeJs className="text-green-500" />,
  },
  {
    name: "Next.js",
    percent: 90,
    icon: <RiNextjsFill className="text-white" />,
  },
  {
    name: "TypeScripte",
    percent: 80,
    icon: <SiTypescript className="text-blue-400" />,
  },
  { name: "Python", percent: 85, icon: <FaPython className="text-blue-300" /> },
  { name: "Git", percent: 80, icon: <FaGitAlt className="text-red-500" /> },
  {
    name: "SQL",
    percent: 80,
    icon: <FaDatabase className="text-yellow-400" />,
  },
  {
    name: "Express.js",
    percent: 10,
    icon: <SiExpress className="text-gray-100" />,
  },
  {
    name: "MongoDB",
    percent: 10,
    icon: <SiMongodb className="text-green-700" />,
  },
  {
    name: "AppWrite",
    percent: 70,
    icon: <SiAppwrite className="text-pink-400" />,
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 tracking-wide">
            Skills
          </h2>
          <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative -top-1 rounded"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-900 shadow-2xl rounded-xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:shadow-3xl"
            >
              <div className="text-5xl mb-4 animate-bounce">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percent}%` }}
                ></div>
              </div>
              <span className="mt-2 text-white font-medium text-lg">
                {skill.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
