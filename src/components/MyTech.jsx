import React from "react";
import { FaPython, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
} from "react-icons/si";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const techStack = [
  { icon: <FaPython className="text-blue-500" />, name: "Python" },
  { icon: <FaReact className="text-blue-400" />, name: "React.js" },
  { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
  { icon: <SiNextdotjs className="text-gray-100" />, name: "Next.js" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
  { icon: <SiExpress className="text-gray-100" />, name: "Express.js" },
  { icon: <SiMongodb className="text-green-600" />, name: "MongoDB" },
];

const MyTech = () => {
  return (
    <div>
      {/* Tech Stack - Full Width with Container */}
      <div className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="text-center mb-10 relative">
              <h3 className="text-3xl font-bold inline-block">
                <span className="text-gray-900">My code </span>
                <span className="text-blue-600"> Stack</span>
              </h3>
              <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative -top-1"></div>
            </div>

            {/* Now making boxes compact */}
            <div className="flex justify-center gap-2 flex-nowrap overflow-hidden">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="flex items-center bg-gray-900 px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all text-white"
                >
                  <span className="text-xl md:text-2xl mr-2">{tech.icon}</span>
                  <span className="font-medium text-sm md:text-base whitespace-nowrap">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyTech;
