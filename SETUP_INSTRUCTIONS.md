# Setup Instructions for Priya Portfolio - Industry Projects Feature

## Changes Made

### 1. Removed Components
- ✅ Removed `RecentWork` component from all locations
- ✅ Updated Navbar to remove "Recent Work" link

### 2. Added New Components
- ✅ `IndustryProjects.jsx` - Displays industry-level projects from Appwrite
- ✅ `ProjectDetailModal.jsx` - Modal for viewing project details
- ✅ `VideoPlayer.jsx` - Video player component for projects
- ✅ `ProtectedRoute.jsx` - Route protection for admin panel

### 3. Admin Panel Components
- ✅ `ProjectAdmin.jsx` - Main admin dashboard with tabs for Normal & Industry projects
- ✅ `BigProjectsAdmin.jsx` - Admin panel for managing industry projects
- ✅ `admin/projectAdmin/appwrite.js` - Appwrite configuration for admin

### 4. Authentication
- ✅ 3-click authentication on home page profile image
- ✅ Password: `PrI#*%57`
- ✅ Protected routes for admin panel

### 5. Updated Files
- ✅ `App.jsx` - Added admin route and removed RecentWork
- ✅ `Navbar.jsx` - Replaced "Recent Work" with "Industry Projects"
- ✅ `Home.jsx` - Added 3-click authentication feature
- ✅ `appwrite.js` - Added Storage support
- ✅ `.env` - Added new environment variables

## Required Setup Steps

### Step 1: Install Required Package
Run the following command to install the image compression library:

```bash
npm install browser-image-compression
```

### Step 2: Set Up Appwrite Database

You need to create a new collection in your Appwrite database for Industry Projects:

#### Collection Name: `industry_projects` or `big_projects`

#### Required Attributes:
1. **title** (String, Required, Max: 255)
2. **image** (String, Required, Max: 2000)
3. **videoUrl** (String, Optional, Max: 2000)
4. **images** (String, Optional, Max: 10000) - Comma-separated URLs
5. **description** (String, Optional, Max: 10000)
6. **liveLink** (String, Optional, Max: 2000)
7. **position** (Integer, Required) - For ordering projects

#### Permissions:
- Read access: Any
- Create/Update/Delete access: Your user ID or role

### Step 3: Set Up Appwrite Storage

Create a storage bucket in Appwrite for image uploads:

1. Go to Appwrite Console → Storage
2. Create a new bucket (e.g., "project-images")
3. Set permissions:
   - Read access: Any
   - Create access: Your user ID or role
   - Update/Delete access: Your user ID or role
4. Set file size limit (recommended: 10MB)
5. Allowed file extensions: jpg, jpeg, png, gif, webp

### Step 4: Update .env File

Open `.env` file and replace the placeholder values with your actual Appwrite IDs:

```env
VITE_APPWRITE_PROJECT_ID=your_actual_project_id
VITE_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=your_actual_database_id
VITE_APPWRITE_COLLECTION_ID=your_normal_projects_collection_id

# Add these new values
VITE_APPWRITE_BIG_PROJECTS_COLLECTION_ID=your_big_projects_collection_id
VITE_APPWRITE_STORAGE_BUCKET_ID=your_storage_bucket_id
```

### Step 5: Run the Application

```bash
npm run dev
```

## How to Access Admin Panel

1. Go to the home page
2. Click on the profile image **3 times** (within 1 second)
3. Enter password: `PrI#*%57`
4. You'll be redirected to the admin panel

## Admin Panel Features

### Normal Projects Tab
- Add, Edit, Delete regular projects
- Fields: Title, Image URL, Project Link, Source Code, Tech Stack, Description

### Industry Projects Tab
- Add, Edit, Delete industry-level projects
- Upload images directly (with compression)
- Fields: Title, Main Image, Video URL, Additional Images, Description, Live Link, Position
- Projects are ordered by position number (lower numbers appear first)

## Features

### Industry Projects Section (Public)
- Displays projects from Appwrite database
- Click on project card to view details in modal
- Video player for project demos
- Image gallery with fullscreen viewer
- Live project links

### Admin Panel (Protected)
- Tab-based interface for Normal and Industry projects
- Real-time database connection status
- Image upload with automatic compression
- Drag-and-drop image uploads
- Mobile-responsive design
- Success/Error notifications

## Troubleshooting

### Issue: Cannot access admin panel
**Solution**: Make sure you clicked the image exactly 3 times within 1 second, then enter the correct password.

### Issue: "Failed to connect to database"
**Solution**: Check your `.env` file and ensure all Appwrite IDs are correct.

### Issue: Image upload fails
**Solution**: 
- Verify your storage bucket ID in `.env`
- Check storage bucket permissions in Appwrite Console
- Ensure file size is under the bucket's limit

### Issue: Projects not showing
**Solution**:
- Verify collection ID in `.env`
- Check collection permissions in Appwrite Console
- Make sure you've added at least one project

## Notes

- The password is hardcoded as `PrI#*%57` (can be changed in [Home.jsx](Home.jsx#L29))
- Images are automatically compressed to max 0.5MB before upload
- Session storage is used for authentication (cleared on browser close)
- All admin actions require authentication
- Projects are automatically fetched from Appwrite on page load

## Support

If you encounter any issues, please check:
1. Appwrite Console for correct IDs and permissions
2. Browser console for error messages
3. Network tab for failed API calls
