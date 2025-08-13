import React from "react";
import { motion } from "framer-motion";
import { 
  FiMessageSquare, 
  FiLayout, 
  FiCode, 
  FiCheckCircle,
  FiUploadCloud, // Replaces FiRocket
  FiLifeBuoy,
  FiAward // Additional icon if needed
} from "react-icons/fi";

const WorkProcess = () => {
  const steps = [
    {
      title: "Consultation",
      icon: <FiMessageSquare className="text-blue-400" size={32} />,
      description: "We discuss your project requirements and goals"
    },
    {
      title: "Design",
      icon: <FiLayout className="text-blue-400" size={32} />,
      description: "Creating wireframes and UI/UX designs"
    },
    {
      title: "Development",
      icon: <FiCode className="text-blue-400" size={32} />,
      description: "Building your application with modern technologies"
    },
    {
      title: "Testing",
      icon: <FiCheckCircle className="text-blue-400" size={32} />,
      description: "Rigorous testing for quality assurance"
    },
    {
      title: "Launch",
      icon: <FiUploadCloud className="text-blue-400" size={32} />, // Changed from FiRocket to FiUploadCloud
      description: "Deployment and going live"
    },
    {
      title: "Support",
      icon: <FiLifeBuoy className="text-blue-400" size={32} />,
      description: "Ongoing maintenance and updates"
    }
  ];

  return (
    <section id="work-process" className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500 rounded-full filter blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Work Process</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A systematic approach to deliver high-quality results for every project
          </p>
        </motion.div>

        {/* Responsive Grid Layout with connecting lines */}
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 px-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg w-full h-full text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gray-700/50 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                  <div className="mt-4 text-blue-400 font-medium text-sm">
                    Step {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;