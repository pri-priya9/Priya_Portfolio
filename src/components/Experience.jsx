import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      },
    },
  };

  const experiences = [
    {
      title: "Full Stack Development Intern",
      company: "Aictum",
      type: "Internship",
      duration: "May 2025 - Present",
      description:
        "Working on Aictum's web development projects, focusing on responsive design and user experience.",
      skills: ["React", "Next.js", "Tailwind CSS", "Typescript", "Node.js", "python", "MongoDB"],
    },

    {
      title: "Freelance Web Developer",
      company: "Team Computers",
      type: "Freelance",
      duration: "May 2025",
      description:
        "Building a Online Learning Platform with Additional features and individuals. Teacher/Student support.",
      skills: ["React", "JavaScript", "Tailwind CSS", "Figma"],
    },
  ];

  return (
    <section
      id="experience"
      className="py-10 bg-gray-900 text-gray-100 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-center"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            Experience
          </motion.h2>
          <div className="h-1 w-24 bg-blue-400 mx-auto mt-3 rounded"></div>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-blue-700 mb-1">{exp.type}</h3>
                  <h2 className="text-2xl text-gray-900 font-semibold">
                    {exp.title}
                  </h2>
                  <h3 className="text-xl text-blue-500">{exp.company}</h3>
                </div>
                <span className="text-sm text-gray-500 mt-2 md:mt-0">
                  {exp.duration}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
