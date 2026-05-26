# Blog Application - Frontend

Complete React + Vite frontend application for a multi-user blogging platform with role-based dashboards and article management.

## 📂 Repository Structure

```
Blog-Frontend/
├── react/                    # Main React application (see react/README.md for detailed docs)
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── apiConfig.js     # Centralized API configuration
│   │   ├── useAuthor.js     # Auth state management (Zustand)
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── README.md            # Detailed frontend documentation
├── vercel.json              # Vercel deployment configuration
└── readme.md                # This file (root level overview)
```

## 🎯 Quick Start

### Local Development

```bash
# Navigate to React app
cd react

# Install dependencies
npm install

# Start development server
npm run dev
```

Server runs on `http://localhost:5173`

### Build for Production

```bash
cd react

# Build optimized bundle
npm run build

# Test production build locally
npm run preview
```

Output in `react/dist/` - ready for deployment.

## 🚀 Deployment

**Deployed Frontend**: https://blog-application-beryl.vercel.app

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel (select `react` as root directory)
3. Set environment variable: `VITE_API_BASE_URL=https://backend-2-jc5u.onrender.com`
4. Deploy automatically on push to main branch

See [react/README.md](react/README.md) for detailed deployment instructions.

## 📋 Features

- **User Authentication** - Register, login, logout with JWT tokens
- **Article Management** - Create, edit, view, delete articles
- **Role-Based Access** - Different dashboards for Users, Authors, Admins
- **Image Uploads** - Upload thumbnails and profile pictures
- **Responsive Design** - Works on mobile, tablet, desktop
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Session Persistence** - Auto-recovery from localStorage

## 🔧 Key Files

| File | Purpose |
|------|---------|
| `react/src/apiConfig.js` | Centralized backend URL configuration |
| `react/src/useAuthor.js` | Zustand store for authentication state |
| `react/src/App.jsx` | Root React component with routing |
| `react/package.json` | Dependencies and scripts |
| `vercel.json` | Vercel deployment settings |

## 🔐 Environment Configuration

Create `.env.local` in `react/` folder:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Change for production:
```env
VITE_API_BASE_URL=https://backend-2-jc5u.onrender.com
```

**Important**: Restart dev server after changing `.env.local`

## 📦 Dependencies

### Core
- **react** 18.x - UI framework
- **vite** 5.x - Build tool & dev server
- **axios** - HTTP client for API calls
- **zustand** - Lightweight state management
- **react-router-dom** - Client-side routing

### Development
- **eslint** - Code quality checks
- **vite plugins** - React HMR support

See `react/package.json` for complete dependency list.

## 🧩 Architecture

### Component Hierarchy
```
App
├── RootLayout
│   ├── Header
│   ├── Routes
│   │   ├── Home
│   │   ├── Login
│   │   ├── Register
│   │   ├── Articles
│   │   ├── ArticleById
│   │   ├── UserRoleGuard
│   │   │   ├── WriteArticle
│   │   │   ├── AuthorDashboard
│   │   │   ├── AdminProfile
│   │   │   └── ...
│   │   └── ErrorBoundary
│   └── Footer
```

### State Management
- **Zustand Store** (`useAuthor.js`)
  - User authentication state
  - JWT token management
  - Login/logout actions
  - localStorage persistence

### API Communication
- **Centralized Config** (`apiConfig.js`)
  - Single source for backend URL
  - Environment variable override
  - Used by all components

## 🔄 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Develop locally**
   ```bash
   npm run dev
   ```

3. **Test production build**
   ```bash
   npm run build && npm run preview
   ```

4. **Lint & fix issues**
   ```bash
   npm run lint
   ```

5. **Commit & push**
   ```bash
   git add .
   git commit -m "Add feature X"
   git push origin feature/your-feature
   ```

6. **Create Pull Request** on GitHub

7. **Deploy** - Vercel auto-deploys on merge to main

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Verify backend is running: `http://localhost:4000` or `https://backend-2-jc5u.onrender.com`
- Check `VITE_API_BASE_URL` in `.env.local`
- Restart dev server after changing `.env.local`

### "CORS error"
- Backend CORS must allow frontend origin
- Verify `FRONTEND_URL` in backend `.env`
- Backend needs redeploy after CORS changes

### "Build fails"
```bash
cd react
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

### "Port 5173 in use"
```bash
# Use different port
npm run dev -- --port 5174
```

See [react/README.md](react/README.md) for more detailed troubleshooting.

## 📱 Component Reference

See `react/README.md` for detailed component documentation including:
- Header, Footer, Navigation
- Login, Register, User Profile
- Article listing, creation, editing
- Author Dashboard, Admin Panel
- Error Boundary, Route Guards

## 🔗 Links

- **Frontend Docs**: [react/README.md](react/README.md)
- **Backend Repo**: `../Blog-Backend/README.md`
- **Deployed App**: https://blog-application-beryl.vercel.app
- **Backend API**: https://backend-2-jc5u.onrender.com

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes and test thoroughly
4. Submit Pull Request with description
5. Wait for code review and merge

## 📄 License

MIT