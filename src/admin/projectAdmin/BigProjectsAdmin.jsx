import { useState, useEffect, useCallback } from "react";
import { databases, storage, Query, ID } from "../../appwrite";
import imageCompression from "browser-image-compression";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiDatabase,
  FiUpload,
  FiImage,
} from "react-icons/fi";

const BigProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    videoUrl: "",
    images: "",
    description: "",
    liveLink: "",
    position: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [notification, setNotification] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [activeTab, setActiveTab] = useState("form");

  const isMobile = window.innerWidth < 768;

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
        [Query.orderAsc("position")]
      );
      setProjects(response.documents);
    } catch (error) {
      console.error("Error fetching big projects:", error);
      showNotification("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
          [Query.limit(1)]
        );
      } catch (error) {
        console.error("Connection error:", error);
        showNotification("Failed to connect to database", "error");
      }
    };

    checkConnection();
    fetchProjects();
  }, [fetchProjects]);

  // Image compression and upload
  const compressAndUploadImage = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      // Compress the image
      const compressedBlob = await imageCompression(file, options);
      
      // Convert blob back to File object with proper name
      const compressedFile = new File(
        [compressedBlob], 
        file.name, 
        { type: compressedBlob.type }
      );

      // Upload to Appwrite
      const uploadedFile = await storage.createFile(
        import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
        ID.unique(),
        compressedFile
      );

      // Return the file URL
      return storage.getFileView(
        import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
        uploadedFile.$id
      );
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setAdditionalImagesPreviews((prev) => [...prev, ...newPreviews]);
      setAdditionalImageFiles((prev) => [...prev, ...files]);
    }
  };

  const removeAdditionalImage = (index) => {
    const newPreviews = [...additionalImagesPreviews];
    newPreviews.splice(index, 1);
    setAdditionalImagesPreviews(newPreviews);

    const newFiles = [...additionalImageFiles];
    newFiles.splice(index, 1);
    setAdditionalImageFiles(newFiles);

    if (formData.images) {
      const imagesArray = formData.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url);

      if (imagesArray.length > index) {
        imagesArray.splice(index, 1);
        setFormData((prev) => ({ ...prev, images: imagesArray.join(", ") }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      videoUrl: "",
      images: "",
      description: "",
      liveLink: "",
      position: "",
    });
    setEditingId(null);
    setImagePreview(null);
    setAdditionalImagesPreviews([]);
    setMainImageFile(null);
    setAdditionalImageFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.position.trim()) {
      showNotification("Please enter project position", "error");
      return;
    }

    if (!mainImageFile && !formData.image) {
      showNotification("Please upload main image", "error");
      return;
    }

    setUploading(true);
    try {
      let mainImageUrl = formData.image;
      let additionalImagesUrls = formData.images
        ? formData.images
            .split(",")
            .map((url) => url.trim())
            .filter((url) => url)
        : [];

      if (mainImageFile) {
        setUploadProgress("Uploading main image...");
        mainImageUrl = await compressAndUploadImage(mainImageFile);
      }

      if (additionalImageFiles.length > 0) {
        for (let i = 0; i < additionalImageFiles.length; i++) {
          setUploadProgress(
            `Uploading image ${i + 1} of ${additionalImageFiles.length}...`
          );
          const imageUrl = await compressAndUploadImage(additionalImageFiles[i]);
          additionalImagesUrls.push(imageUrl);
        }
      }

      setUploadProgress("Saving project...");

      const projectData = {
        title: formData.title,
        image: mainImageUrl,
        videoUrl: formData.videoUrl || undefined,
        images:
          additionalImagesUrls.length > 0
            ? additionalImagesUrls.join(", ")
            : undefined,
        description: formData.description || undefined,
        liveLink: formData.liveLink || undefined,
        position: parseInt(formData.position),
      };

      if (editingId) {
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
          editingId,
          projectData
        );
        showNotification("Project updated successfully!");
      } else {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
          ID.unique(),
          projectData
        );
        showNotification("Project saved successfully!");
      }

      resetForm();
      fetchProjects();

      if (window.innerWidth < 768) setActiveTab("list");
    } catch (error) {
      console.error("Error saving project:", error);
      showNotification(`Failed to save project: ${error.message}`, "error");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      image: project.image,
      videoUrl: project.videoUrl || "",
      images: project.images || "",
      description: project.description || "",
      liveLink: project.liveLink || "",
      position: project.position.toString(),
    });

    setEditingId(project.$id);
    setImagePreview(project.image);

    setMainImageFile(null);
    setAdditionalImageFiles([]);

    if (project.images) {
      const imagesArray = project.images
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url);
      setAdditionalImagesPreviews(imagesArray);
    } else {
      setAdditionalImagesPreviews([]);
    }

    if (window.innerWidth < 768) setActiveTab("form");
  };

  // Helper function to extract file ID from Appwrite URL
  const getFileIdFromUrl = (url) => {
    if (!url) return null;
    // Appwrite URL format: https://[endpoint]/v1/storage/buckets/[bucket-id]/files/[file-id]/view
    const match = url.match(/\/files\/([^/]+)\/(view|preview)/);
    return match ? match[1] : null;
  };

  // Delete images from storage
  const deleteImagesFromStorage = async (imageUrls) => {
    const fileIds = imageUrls
      .map((url) => getFileIdFromUrl(url))
      .filter(Boolean);

    for (const fileId of fileIds) {
      try {
        await storage.deleteFile(
          import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID,
          fileId
        );
        console.log(`Deleted image: ${fileId}`);
      } catch (error) {
        console.error(`Failed to delete image ${fileId}:`, error);
        // Continue deleting other images even if one fails
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // First, fetch the project to get all image URLs
        const project = projects.find((p) => p.$id === id);
        
        if (project) {
          const imageUrls = [];
          
          // Add main image
          if (project.image) {
            imageUrls.push(project.image);
          }
          
          // Add additional images
          if (project.images) {
            const additionalImages = project.images
              .split(",")
              .map((url) => url.trim())
              .filter(Boolean);
            imageUrls.push(...additionalImages);
          }
          
          // Delete images from storage
          if (imageUrls.length > 0) {
            await deleteImagesFromStorage(imageUrls);
          }
        }

        // Delete project from database
        await databases.deleteDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID,
          id
        );
        
        showNotification("Project and images deleted successfully!");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        showNotification("Failed to delete project", "error");
      }
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Notifications */}
      {notification && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl shadow-lg text-sm max-w-[90%] ${
            notification.type === "error"
              ? "bg-red-900/90 text-red-100"
              : "bg-green-900/90 text-green-100"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "error" ? <FiX /> : <FiCheck />}
            <span className="truncate">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="fixed top-36 left-1/2 -translate-x-1/2 z-[60] bg-blue-900/90 text-blue-100 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm max-w-[90%]">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-300" />
          <span className="truncate">{uploadProgress}</span>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-6 md:py-10">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Industry Projects
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-1">
            Manage your portfolio projects
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden mb-4">
          <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-1 flex gap-1 shadow-lg">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === "form"
                  ? "bg-gradient-to-r from-purple-600 to-pink-700 text-white"
                  : "text-gray-300 hover:bg-gray-700/60"
              }`}
            >
              {editingId ? "Edit Project" : "Add Project"}
            </button>

            <button
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === "list"
                  ? "bg-gradient-to-r from-purple-600 to-pink-700 text-white"
                  : "text-gray-300 hover:bg-gray-700/60"
              }`}
            >
              Projects ({projects.length})
            </button>
          </div>
        </div>

        <div className="md:grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FORM */}
          <div
            className={`${
              isMobile ? (activeTab === "form" ? "block" : "hidden") : "block"
            } bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl border border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                  {editingId ? <FiEdit2 size={16} /> : "+"}
                </span>
                {editingId ? "Edit Project" : "Add New Project"}
              </h3>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>

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
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  required
                  maxLength={100}
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Main Image*
                </label>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 transition bg-gray-700/30">
                  <FiUpload className="text-3xl text-gray-400 mb-1" />
                  <span className="text-sm text-gray-400">
                    Click to upload main image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                {imagePreview && (
                  <div className="relative mt-3">
                    <img
                      src={imagePreview}
                      alt="Main preview"
                      className="w-full h-44 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setMainImageFile(null);
                        setFormData((prev) => ({ ...prev, image: "" }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Video URL <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="YouTube / Google Drive link"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Additional Images{" "}
                  <span className="text-gray-500">(Optional)</span>
                </label>

                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 transition bg-gray-700/30">
                  <div className="text-center">
                    <FiImage className="mx-auto text-2xl text-gray-400 mb-1" />
                    <span className="text-sm text-gray-400">
                      Upload multiple images
                    </span>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                {additionalImagesPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {additionalImagesPreviews.map((preview, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={preview}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Description <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
                  placeholder="Describe your project..."
                  maxLength={10000}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Live Link <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Position*
                </label>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="1, 2, 3..."
                  required
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white py-3 px-6 rounded-xl shadow-lg transition flex-1 disabled:opacity-50"
                >
                  {editingId ? "Update Project" : "Save Project"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl shadow transition flex-1"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div
            className={`${
              isMobile ? (activeTab === "list" ? "block" : "hidden") : "block"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                  <FiDatabase size={16} />
                </span>
                Projects List ({projects.length})
              </h3>
              <span className="text-xs text-gray-400">Click to edit</span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center">
                <p className="text-gray-400 mb-2">No projects found</p>
                <p className="text-gray-500 text-sm">
                  Tap &quot;Add Project&quot; to start
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-1">
                {projects.map((project) => (
                  <div
                    key={project.$id}
                    className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition shadow-md"
                  >
                    <div className="flex justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-purple-900/30 text-purple-400 text-xs px-2 py-1 rounded-lg font-medium">
                            #{project.position}
                          </span>
                          {project.videoUrl && (
                            <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-lg font-medium">
                              📹 Video
                            </span>
                          )}
                          {project.liveLink && (
                            <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-lg font-medium">
                              🔗 Live
                            </span>
                          )}
                        </div>

                        <h4 className="font-semibold text-base truncate mb-1">
                          {project.title}
                        </h4>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {project.description || "No description available"}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-purple-400 hover:text-purple-300 bg-purple-900/20 hover:bg-purple-900/30 p-2 rounded-xl transition"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(project.$id)}
                          className="text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 p-2 rounded-xl transition"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigProjectsAdmin;
