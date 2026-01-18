import { FaGraduationCap, FaCode, FaLightbulb, FaBusinessTime } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };


   const aboutPoints = [
    {
      icon: <FaGraduationCap className="text-blue-500 text-3xl" />,
      title: "Education",
      content: "12th Commerce from Kendriya Vidyalaya | Pursuing BCA from IGNOU"
    },
    {
      icon: <FaCode className="text-blue-500 text-3xl" />,
      title: "Experience",
      content: "3+ years coding experience | 2 years in web development"
    },
    {
      icon: <FaLightbulb className="text-blue-500 text-3xl" />,
      title: "Approach",
      content: "Problem solver | Clean code advocate | Continuous learner"
    },
    {
      icon: <FaBusinessTime className="text-blue-500 text-3xl" />,
      title: "Vision",
      content: "Combine technical skills with business acumen for impactful solutions"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-100 text-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div className="mb-8 md:mb-0 md:w-1/3 flex justify-center hidden md:block">
          <img
            src="/About.jpg"
            alt="Priya Yadav"
            className="w-60 h-60 md:w-72 md:h-72 rounded-full object-cover object-top shadow-lg border-4 border-white"
          />
        </div>

        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-black">About </span>
            <span className="text-blue-600">Me</span>
            <div className="w-16 h-1 bg-blue-400 mx-auto mt-2 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-700 space-y-4">
            {/* 📘 1. School Journey */}
            <span className="block mb-3">
              Hi, I&apos;m <span className="font-semibold">Priya Yadav</span>. I
              completed my schooling at{" "}
              <span className="font-medium">Kendriya Vidyalaya</span> up to 12th
              grade, choosing <span className="font-medium">Commerce</span> as
              my stream. However, my curiosity for coding began much earlier
              back in 10th grade when I discovered{" "}
              <span className="text-blue-600">Python</span>.
            </span>

            {/* 💻 2. Self-Study & Skill Growth */}
            <span className="block mb-3">
              Over the next two years, I deeply explored Python, building a
              strong foundation in programming. My passion then shifted toward
              web development. I taught myself{" "}
              <span className="text-blue-600">HTML</span>,{" "}
              <span className="text-blue-600">CSS</span>,{" "}
              <span className="text-blue-600">JavaScript</span>, and{" "}
              <span className="text-blue-600">React.js</span>, as well as
              styling libraries like{" "}
              <span className="text-blue-600">Tailwind CSS</span>. Currently, I
              am expanding my knowledge in back-end development, working with{" "}
              <span className="text-blue-600">Node.js</span> and{" "}
              <span className="text-blue-600">TypeScript</span>, continuously
              upgrading my skills.
            </span>

            {/* 🎓 3. College & Projects */}
            <span className="block">
              I’m pursuing my Bachelor’s degree in Computer Applications (BCA)
              from <span className="font-medium">IGNOU</span> (Indira Gandhi
              National Open University). Alongside my studies, I actively work
              as a freelance web developer and contribute to large-scale,
              real-world projects. Beyond coding, I have a strong interest in
              business and entrepreneurship, and I&apos;m driven by a mindset to
              build and grow in that direction.
            </span>
          </p>
        </div>
      </div>

       {/* Key Points Grid */}
        <div className="w-full bg-gray-200 py-12 md:py-12 mt-16">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              variants={containerVariants}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-900"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">
                      {point.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-100">{point.title}</h3>
                    <p className="text-gray-200">{point.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
    </section>
  );
};

export default About;
