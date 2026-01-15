import { useState, useEffect, useRef } from "react";
import {
  FaHtml5, FaJs, FaReact, FaNodeJs,
  FaDatabase, FaGitAlt, FaPython
} from "react-icons/fa";
import {
  SiExpress, SiMongodb, SiTypescript, SiAppwrite, SiTailwindcss
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

const skills = [
  { name: "HTML/CSS", percent: 95, icon: <FaHtml5 className="text-orange-500" /> },
  { name: "JavaScript", percent: 95, icon: <FaJs className="text-yellow-500" /> },
  { name: "React", percent: 90, icon: <FaReact className="text-blue-500" /> },
  { name: "Tailwind CSS", percent: 90, icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Node.js", percent: 80, icon: <FaNodeJs className="text-green-500" /> },
  { name: "Next.js", percent: 70, icon: <RiNextjsFill className="text-white" /> },
  { name: "TypeScript", percent: 95, icon: <SiTypescript className="text-blue-400" /> },
  { name: "Python", percent: 85, icon: <FaPython className="text-blue-300" /> },
  { name: "Git", percent: 80, icon: <FaGitAlt className="text-red-500" /> },
  { name: "SQL", percent: 80, icon: <FaDatabase className="text-yellow-400" /> },
  { name: "Express.js", percent: 80, icon: <SiExpress className="text-gray-100" /> },
  { name: "MongoDB", percent: 75, icon: <SiMongodb className="text-green-700" /> },
  { name: "AppWrite", percent: 95, icon: <SiAppwrite className="text-pink-400" /> },
];

const Skills = () => {
  const [progress, setProgress] = useState(skills.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress(skills.map(() => 0));

          setTimeout(() => {
            skills.forEach((skill, i) => {
              const timer = setInterval(() => {
                setProgress((prev) => {
                  const updated = [...prev];
                  if (updated[i] < skill.percent) {
                    updated[i] += 1;
                  }
                  if (updated[i] >= skill.percent) {
                    updated[i] = skill.percent;
                    clearInterval(timer);
                  }
                  return updated;
                });
              }, 15);
            });
          }, 100);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section id="skills" className="py-16 bg-gray-100" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide">
            Skills
          </h2>
          <div className="h-1 w-20 sm:w-24 bg-blue-400 mx-auto mt-2 rounded"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-900 shadow-2xl rounded-xl p-5 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:shadow-3xl"
            >
              <div className="text-4xl sm:text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">{skill.name}</h3>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress[index]}%` }}
                ></div>
              </div>

              {/* Percentage */}
              <span className="mt-2 text-white font-medium text-base sm:text-lg">
                {progress[index]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
