import React, { useState, useEffect } from "react";
import { databases, Query } from "../appwrite";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );
        setProjects(response.documents);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-16 md:py-20 bg-gray-900 text-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            My <span className="text-blue-600">Projects</span>
          </h2>
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="projects"
        className="py-16 md:py-20 bg-gray-50 text-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            My <span className="text-blue-600">Projects</span>
          </h2>
          <div className="max-w-md mx-auto text-center p-6 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 md:py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold inline-block relative pb-2">
            My <span className="text-blue-600">Projects</span>
            <div className="h-1 w-24 bg-blue-400 mx-auto mt-2 relative rounded"></div>
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="max-w-md mx-auto text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-600">
              No projects available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <div
                key={project.$id}
                className="project-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 rounded-t-lg mb-6 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Project+Image";
                    e.target.className =
                      "w-full h-64 object-contain p-4 bg-gray-100";
                  }}
                />
                <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">
                  {project.title}
                </h3>

                {/* Technologies Used */}
                <p className="text-center text-gray-700 mb-4">
                  <strong>Tech Stack: </strong>
                  {project.techStack.split(",").map((tech, i, arr) => (
                    <span key={i} className="text-blue-500 font-medium">
                      {tech.trim()}
                      {i !== arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <div className="flex justify-center space-x-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                      View Project
                    </button>
                  </a>
                  {project.sourceCode && (
                    <a
                      href={project.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300">
                        Source Code
                      </button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
