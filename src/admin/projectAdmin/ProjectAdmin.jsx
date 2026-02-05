import { useState, useEffect, useCallback } from "react";
import { databases, Query, ID } from "./appwrite";
import { Link } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiDatabase,
} from "react-icons/fi";
import BigProjectsAdmin from "./BigProjectsAdmin";

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const ProjectsAdmin = () => {
  const [activeTab, setActiveTab] = useState("normal"); // "normal" or "industry"
  const [normalViewTab, setNormalViewTab] = useState("form"); // "form" or "list" for normal projects
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    link: "",
    sourceCode: "",
    techStack: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Checking...");
  const [notification, setNotification] = useState(null);

  const isMobile = window.innerWidth < 768;

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
        Query.orderDesc("$createdAt"),
      ]);
      setProjects(response.documents);
    } catch (error) {
      console.error("Error fetching projects:", error);
      showNotification("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await databases.listDocuments(DB_ID, COLLECTION_ID, [Query.limit(1)]);
        setConnectionStatus("Connected");
      } catch (error) {
        console.error("Connection error:", error);
        setConnectionStatus("Disconnected");
        showNotification("Failed to connect to database", "error");
      }
    };

    checkConnection();
    fetchProjects();
  }, [fetchProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      link: "",
      sourceCode: "",
      techStack: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Strong validation
    if (!formData.title.trim()) {
      showNotification("Please enter project title", "error");
      return;
    }

    if (!formData.image.trim()) {
      showNotification("Please enter image URL", "error");
      return;
    }

    if (!formData.link.trim()) {
      showNotification("Please enter project link", "error");
      return;
    }

    if (!formData.techStack.trim()) {
      showNotification("Please enter technologies used", "error");
      return;
    }

    try {
      const projectData = {
        title: formData.title.trim(),
        image: formData.image.trim(),
        link: formData.link.trim(),
        sourceCode: formData.sourceCode.trim() || undefined,
        techStack: formData.techStack.trim(),
      };

      if (editingId) {
        await databases.updateDocument(
          DB_ID,
          COLLECTION_ID,
          editingId,
          projectData
        );
        showNotification("Project updated successfully!");
      } else {
        await databases.createDocument(
          DB_ID,
          COLLECTION_ID,
          ID.unique(),
          projectData
        );
        showNotification("Project saved successfully!");
      }

      resetForm();
      fetchProjects();
      
      if (window.innerWidth < 768) setNormalViewTab("list");
    } catch (error) {
      console.error("Error saving project:", error);
      showNotification("Failed to save project", "error");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title || "",
      image: project.image || "",
      link: project.link || "",
      sourceCode: project.sourceCode || "",
      techStack: project.techStack || "",
    });
    setEditingId(project.$id);
    
    if (window.innerWidth < 768) setNormalViewTab("form");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
      showNotification("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      showNotification("Failed to delete project", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      {/* ✅ TOP STICKY BAR */}
      <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-3 md:px-6 py-3 flex items-center justify-between">
          {/* Back Button */}
          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700 text-white px-4 py-2 rounded-xl border border-gray-700 transition shadow"
          >
            <FiArrowLeft className="text-base" />
            <span className="text-sm md:text-base font-medium">
              Back to Portfolio
            </span>
          </Link>

          {/* Connection Status */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-medium border ${
              connectionStatus === "Connected"
                ? "bg-green-900/30 text-green-300 border-green-800/50"
                : "bg-red-900/30 text-red-300 border-red-800/50"
            }`}
          >
            <FiDatabase className="text-base" />
            <span>{connectionStatus}</span>
          </div>
        </div>

        {/* ✅ TABS (Premium chip style) */}
        <div className="px-3 md:px-6 pb-3">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-1 flex gap-1 shadow-lg">
              <button
                onClick={() => setActiveTab("normal")}
                className={`flex-1 py-2 rounded-xl text-sm md:text-base font-semibold transition ${
                  activeTab === "normal"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                Normal Projects
              </button>

              <button
                onClick={() => setActiveTab("industry")}
                className={`flex-1 py-2 rounded-xl text-sm md:text-base font-semibold transition ${
                  activeTab === "industry"
                    ? "bg-gradient-to-r from-purple-600 to-pink-700 text-white"
                    : "text-gray-300 hover:bg-gray-700/60"
                }`}
              >
                Industry Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl shadow-lg text-sm max-w-[90%] ${
            notification.type === "error"
              ? "bg-red-900/90 text-red-100"
              : "bg-green-900/90 text-green-100"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "error" ? (
              <FiX className="text-base" />
            ) : (
              <FiCheck className="text-base" />
            )}
            <span className="truncate">{notification.message}</span>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-3 md:px-6 py-6 md:py-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Projects Dashboard
        </h1>
        <p className="text-gray-400 mb-6 text-center md:text-left">
          Manage your portfolio projects
        </p>

        {/* Tab Content */}
        {activeTab === "normal" ? (
          <>
            {/* Mobile Tabs for Normal Projects */}
            <div className="md:hidden mb-4">
              <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-1 flex gap-1 shadow-lg">
                <button
                  onClick={() => setNormalViewTab("form")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                    normalViewTab === "form"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-700/60"
                  }`}
                >
                  {editingId ? "Edit Project" : "Add Project"}
                </button>

                <button
                  onClick={() => setNormalViewTab("list")}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                    normalViewTab === "list"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-700/60"
                  }`}
                >
                  Projects ({projects.length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Form Section */}
              <div className={`${
                isMobile ? (normalViewTab === "form" ? "block" : "hidden") : "block"
              } bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl border border-gray-700`}>
              <h2 className="text-lg md:text-xl font-semibold mb-5 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                  {editingId ? <FiEdit2 /> : "+"}
                </span>
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Image URL*
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Project Link*
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Source Code Link
                  </label>
                  <input
                    type="url"
                    name="sourceCode"
                    value={formData.sourceCode}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">
                    Tech Stack*
                  </label>
                  <input
                    type="text"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
                    placeholder="React, Tailwind CSS, Node.js"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Separate technologies with commas
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex-1 flex items-center justify-center"
                  >
                    {editingId ? "Update Project" : "Save Project"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl shadow hover:shadow-md transition-all duration-300 flex-1"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Projects List */}
            <div className={`${
              isMobile ? (normalViewTab === "list" ? "block" : "hidden") : "block"
            }`}>
              <h2 className="text-lg md:text-xl font-semibold mb-5 flex items-center">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                  <FiDatabase />
                </span>
                Projects List
              </h2>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 text-center">
                  <p className="text-gray-400">No projects found</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Add your first project using the form
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
                  {projects.map((project) => (
                    <div
                      key={project.$id}
                      className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base md:text-lg truncate">
                            {project.title}
                          </h3>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {(project.techStack || "")
                              .split(",")
                              .filter(Boolean)
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-lg"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="text-blue-400 hover:text-blue-300 bg-blue-900/20 hover:bg-blue-900/30 p-2 rounded-xl transition-all"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() => handleDelete(project.$id)}
                            className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 p-2 rounded-xl transition-all"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          </>
        ) : (
          <BigProjectsAdmin />
        )}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
