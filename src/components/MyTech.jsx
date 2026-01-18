import { FaPython, FaReact, FaNodeJs, FaHtml5 , FaGithub , FaDatabase , FaMagic , FaPaintBrush , FaServer } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
  SiExpress,
  SiAppwrite,
  SiRedux 
} from "react-icons/si";
import { motion } from "framer-motion";
import { useRef } from "react";

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
  { icon: <FaHtml5 className="text-orange-400" />, name: "HTML5" },
  { icon: <SiJavascript className="text-yellow-500" />, name: "Javascript" },
  { icon: <FaReact className="text-blue-400" />, name: "React.js" },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
  { icon: <SiRedux className="text-purple-600" />, name: "Redux" },
  { icon: <FaPython className="text-green-500" />, name: "Python" },
  { icon: <SiTypescript className="text-blue-500" />, name: "TypeScript" },
  { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
  { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
  { icon: <SiMongodb className="text-green-600" />, name: "MongoDB" },
  { icon: <SiExpress className="text-white" />, name: "Express.js" },
  { icon: <FaGithub className="text-white" />, name: "GitHub" },
  { icon: <FaDatabase className="text-blue-500" />, name: "SQL" },
  { icon: <SiAppwrite className="text-pink-600" />, name: "Appwrite" },
];


const specialties = [
    {
      icon: <FaPaintBrush className="text-pink-500 text-3xl" />,
      title: "Frontend Artistry",
      content: "Creating beautiful, interactive UIs with React & Next.js"
    },
    {
      icon: <FaServer className="text-green-500 text-3xl" />,
      title: "Backend Logic",
      content: "Building robust APIs and server-side architecture"
    },
    {
      icon: <FaDatabase className="text-orange-500 text-3xl" />,
      title: "Data Management",
      content: "Designing efficient database structures and queries"
    },
    {
      icon: <FaMagic className="text-purple-500 text-3xl" />,
      title: "Full Stack Magic",
      content: "Seamlessly connecting frontend and backend systems"
    }
  ];


const MyTech = () => {
  const sectionRef = useRef(null);
  return (
    <section id="skills"  ref={sectionRef}>
    <div className="w-full py-12 md:py-8 bg-gray-100">
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
              <span className="text-gray-900">My code </span>
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

       {/* Specialties Section - Replaces Tech Stack */}
        <div className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              variants={itemVariants}
              className="max-w-6xl mx-auto"
            >
            <div className="text-center mb-10 relative ">
            <h3 className="text-3xl font-bold inline-block">
              <span className="text-gray-900"> My </span>
              <span className="text-blue-600"> Expertise </span>
            </h3>
            <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative -top-1"></div>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {specialties.map((specialty, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-900 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      {specialty.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-gray-100">{specialty.title}</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">{specialty.content}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
    </section>
  );
};

export default MyTech;