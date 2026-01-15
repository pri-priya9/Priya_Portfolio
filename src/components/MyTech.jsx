import { FaPython, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
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
  { icon: <FaPython className="text-green-500" />, name: "Python" },
  { icon: <SiJavascript className="text-yellow-500" />, name: "Javascript" },
  { icon: <FaReact className="text-blue-400" />, name: "React.js" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
  { icon: <SiNextdotjs className="text-gray-100" />, name: "Next.js" },
  { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
  { icon: <SiMongodb className="text-green-600" />, name: "MongoDB" },
];

const MyTech = () => {
  return (
    <div className="w-full py-12 md:py-8 bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Title */}
          <div className="text-center mb-10 relative ">
            <h3 className="text-3xl font-bold inline-block">
              <span className="text-gray-100">My code </span>
              <span className="text-blue-600"> Stack</span>
            </h3>
            <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative -top-1"></div>
          </div>

          {/* Responsive Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-6 bg-white rounded-xl shadow-lg">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.04 }}
                className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-white aspect-square"
              >
                <span className="text-3xl mb-2">
                  {tech.icon}
                </span>
                <span className="font-medium text-sm text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyTech;