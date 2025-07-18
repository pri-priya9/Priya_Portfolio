import React from "react";

const About = () => {
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
              Hi, I'm <span className="font-semibold">Priya Yadav</span>. I
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
              business and entrepreneurship, and I'm driven by a mindset to
              build and grow in that direction.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
