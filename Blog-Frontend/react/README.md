# Blog Application - Frontend

A modern, responsive React web application for reading and publishing blog articles. Features user authentication, article management, and role-based dashboards for authors and admins.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Build & Deployment](#build--deployment)
- [Component Documentation](#component-documentation)
- [API Integration](#api-integration)
- [Authentication Flow](#authentication-flow)
- [Styling & Theme](#styling--theme)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**: Register, login, and logout with JWT tokens
- **Role-Based Dashboards**: Separate interfaces for Users, Authors, and Admins
- **Article Management**: Create, edit, view, and delete articles
- **Image Uploads**: Upload article thumbnails and user avatars
- **User Profiles**: View and edit user profile information
- **Article Discovery**: Browse all articles with search and filtering
- **Author Portfolio**: View articles by specific authors
- **Admin Panel**: Manage users, authors, and content moderation
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Error Handling**: Comprehensive error boundaries and user feedback
- **LocalStorage Persistence**: Automatic session recovery

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5.x |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **Styling** | CSS 3 (vanilla + CSS modules) |
| **Linting** | ESLint |
| **Node Version** | 18+ |

## 📁 Project Structure

```
Blog-Frontend/react/
├── src/
│   ├── components/              # React components
│   │   ├── Header.jsx          # Navigation bar
│   │   ├── Footer.jsx          # Footer
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login form
│   │   ├── Register.jsx        # Registration form
│   │   ├── Articles.jsx        # Articles listing
│   │   ├── ArticleById.jsx     # Single article view
│   │   ├── WriteArticle.jsx    # Create article
│   │   ├── EditArticle.jsx     # Edit article
│   │   ├── UserProfile.jsx     # User profile page
│   │   ├── AuthorProfile.jsx   # Author profile
│   │   ├── AuthorDashboard.jsx # Author management panel
│   │   ├── AdminProfile.jsx    # Admin dashboard
│   │   ├── AuthorsList.jsx     # Browse authors
│   │   ├── UsersList.jsx       # User management
│   │   ├── RootLayout.jsx      # App wrapper
│   │   ├── UserRoleGuard.jsx   # Route protection
│   │   └── ErrorBoundary.jsx   # Error handling
│   ├── assets/                  # Static files
│   ├── apiConfig.js            # Centralized API configuration
│   ├── useAuthor.js            # Zustand auth store
│   ├── App.jsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── index.css               # Base styles
│   └── main.jsx                # Entry point
├── public/                      # Static public assets
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser (Chrome, Firefox, Safari, Edge)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-Frontend/react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (see [Environment Variables](#environment-variables))
   ```bash
   cat > .env.local << EOF
   VITE_API_BASE_URL=http://localhost:4000
   EOF
   ```

4. **Verify installation**
   ```bash
   npm run build
   ```
   Should complete without errors.

## 🔐 Environment Variables

Create a `.env.local` file in the `Blog-Frontend/react/` directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:4000

# Optional: For Vercel deployment
# VITE_API_BASE_URL=https://backend-2-jc5u.onrender.com
```

### Environment Variables Explained

| Variable | Purpose | Local Development | Production |
|----------|---------|-------------------|------------|
| `VITE_API_BASE_URL` | Backend API endpoint | `http://localhost:4000` | `https://backend-2-jc5u.onrender.com` |

**Important**: Vite prefixes env vars with `VITE_`. Changes to `.env.local` require dev server restart to take effect.

## 💻 Running Locally

### Development Server
```bash
npm run dev
```
- Opens at `http://localhost:5173`
- Hot Module Replacement (HMR) enabled - changes auto-refresh
- Console shows warnings/errors

### Production Build
```bash
npm run build
```
Outputs to `dist/` folder - optimized and minified.

### Preview Production Build
```bash
npm run preview
```
Simulates production environment locally.

### Lint Check
```bash
npm run lint
```
Reports ESLint violations.

## 🏗 Build & Deployment

### Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Update frontend"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import from GitHub repository
   - Select `Blog-Frontend/react` as root directory

3. **Configure Environment**
   - Add environment variable in Vercel dashboard:
     ```
     VITE_API_BASE_URL = https://backend-2-jc5u.onrender.com
     ```

4. **Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node Version: 18.x or 20.x

5. **Deploy**
   - Click "Deploy" → Vercel builds and deploys automatically

### Local to Production Checklist
- [ ] Backend deployed and running
- [ ] Backend CORS allows frontend origin
- [ ] `.env` has correct `VITE_API_BASE_URL`
- [ ] Dev server restarted after `.env` change
- [ ] `npm run build` completes without errors
- [ ] Production build tested with `npm run preview`
- [ ] Git repo pushed to main branch
- [ ] Vercel redeploy triggered

## 📦 Component Documentation

### Core Components

**Header.jsx**
- Navigation bar with logo/branding
- Auth status display (logged in user)
- Role-based menu items (Author/Admin links)
- Logout button

**Login.jsx**
- Email & password form
- Validation & error display
- Auto-redirect on success
- Register link

**Register.jsx**
- Name, email, password, role selection
- Password confirmation
- Terms acceptance
- Link to login

**Articles.jsx**
- Displays all published articles
- Search/filter functionality
- Pagination
- Author info per article
- Links to full article view

**ArticleById.jsx**
- Full article content
- Author details & profile link
- Like/comment functionality
- Edit button (owner only)
- Delete button (owner only)

**WriteArticle.jsx**
- Rich text editor for content
- Title, description, image upload
- Category selection
- Publish button
- Author role required

**AuthorDashboard.jsx**
- Author's own articles list
- Quick edit/delete actions
- Article stats
- Publish/unpublish toggle

**AdminProfile.jsx**
- User management table
- Author approval/rejection
- Delete user functionality
- System statistics

**UserRoleGuard.jsx**
- Route protection middleware
- Redirects unauthorized users
- Checks role requirements
- Prevents direct URL access

### Styling

**App.css** - Global styles
- Layout & typography
- Color scheme
- Responsive breakpoints
- Component spacing

**Component Styles** - Inline or scoped CSS
- Card layouts
- Form styling
- Button styles
- Modal/dialog designs

## 🔌 API Integration

### API Configuration (`apiConfig.js`)

```javascript
export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  "https://backend-2-jc5u.onrender.com";
```

**Benefits**:
- Centralized URL management
- Easy switching between environments
- Fallback to production if env var missing
- Single point to update all API calls

### Making API Calls

**Pattern Used Throughout**:
```javascript
import { API_BASE_URL } from "../apiConfig";
import axios from "axios";

// Example: Get all articles
const response = await axios.get(`${API_BASE_URL}/common-api/articles`);

// With headers
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};
const response = await axios.post(
  `${API_BASE_URL}/common-api/login`,
  credentials,
  config
);
```

### Error Handling

```javascript
try {
  const response = await axios.get(`${API_BASE_URL}/endpoint`);
  // Handle success
} catch (error) {
  if (error.response?.status === 401) {
    // Token expired - redirect to login
  } else if (error.response?.status === 403) {
    // Permission denied
  } else {
    // Network or server error
  }
}
```

## 🔐 Authentication Flow

### Login Flow
1. User enters credentials in Login.jsx
2. POST to `/common-api/login` with email & password
3. Backend validates and returns JWT token
4. Token stored in localStorage via Zustand store (useAuthor.js)
5. User redirected to dashboard based on role

### Token Usage
- Stored in localStorage as `authToken`
- Added to all API requests via `Authorization` header
- Checked on app load to restore session
- Cleared on logout

### Zustand Store (useAuthor.js)

```javascript
const useAuthorStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  
  setUser: (user, token) => set({ user, token, isLoggedIn: true }),
  logout: () => set({ user: null, token: null, isLoggedIn: false })
}));
```

**Usage in Components**:
```javascript
import { useAuthorStore } from "../useAuthor";

function MyComponent() {
  const { user, token, logout } = useAuthorStore();
  // Access auth state
}
```

### Protected Routes

```javascript
<Route 
  path="/dashboard" 
  element={
    <UserRoleGuard requiredRole="author">
      <AuthorDashboard />
    </UserRoleGuard>
  } 
/>
```

## 🎨 Styling & Theme

### CSS Architecture
- **Global**: `App.css`, `index.css`
- **Component-scoped**: Inline `<style>` tags or `.module.css` files
- **Responsive**: Mobile-first with media queries

### Color Scheme
```css
/* Primary */
--primary: #007bff;
--primary-dark: #0056b3;

/* Semantic */
--success: #28a745;
--error: #dc3545;
--warning: #ffc107;
--info: #17a2b8;

/* Neutral */
--text: #333;
--bg: #fff;
--border: #ddd;
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 576px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to backend" / CORS error**
- Verify backend is running: `curl http://localhost:4000/common-api/check-auth`
- Check `VITE_API_BASE_URL` in `.env.local`
- Restart dev server after `.env` change
- Check browser console for full error message

**"Auth token not persisting" / Login doesn't work
- Clear localStorage: `localStorage.clear()` in console
- Check `useAuthor.js` store is initialized
- Verify token in browser Network tab (should be in response headers)
- Check browser allows localStorage

**"Components not updating" after API call**
- Ensure Zustand store is updated with new state
- Check axios response structure matches expected format
- Verify async/await is used correctly in try-catch blocks

**"Build fails" / "npm run build" errors**
- Check for TypeScript/ESLint errors: `npm run lint`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)
- Try: `npm cache clean --force && npm install`

**"Env variables not working"**
- Restart dev server - Vite must restart to read `.env` changes
- Use `VITE_` prefix for all client-side env vars
- Check `.env.local` is in correct directory (`Blog-Frontend/react/`)
- Verify no spaces around `=` in env file

**"Image upload fails"**
- Verify Cloudinary credentials in backend `.env`
- Check upload form sends FormData (not JSON)
- Test backend directly: POST to `/common-api/articles` with image

**"Port 5173 already in use"**
```bash
# Linux/Mac: Kill process
lsof -ti:5173 | xargs kill -9

# Windows: Find & kill
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Alternative: Use different port
npm run dev -- --port 5174
```

### Development Tips

**Debug State in Component**:
```javascript
const store = useAuthorStore();
console.log('Current user:', store.user);
console.log('Token:', store.token);
```

**Check API Response**:
```javascript
const response = await axios.get(`${API_BASE_URL}/endpoint`);
console.log('API Response:', response.data);
```

**Test CORS locally**:
```bash
# Simple preflight test
curl -X OPTIONS http://localhost:4000/common-api/articles \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET"
```

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally: `npm run dev`
3. Run lint: `npm run lint` (fix errors)
4. Build and preview: `npm run build && npm run preview`
5. Commit with clear messages: `git commit -m "Add feature X"`
6. Push and create Pull Request

### Code Standards
- Use functional components with hooks
- Follow React naming conventions (PascalCase for components)
- Add comments for complex logic
- Keep components focused and reusable
- Validate all user inputs before API calls
- Handle all API errors gracefully

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | May 2026 | Initial release with all core features |

## 📞 Support & Contact

For issues, questions, or suggestions:
- Check GitHub issues for similar problems
- Create detailed issue with browser console errors
- Include screenshots of errors/unexpected behavior
- Specify Node version, browser, and OS

---

**Last Updated**: May 2026
**Maintained By**: Development Team
**License**: MIT
