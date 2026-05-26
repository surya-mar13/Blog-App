# Blog Application - Backend API

A comprehensive Node.js/Express backend for a multi-user blog platform with role-based access control, article management, and user authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [CORS Configuration](#cors-configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **User Roles**: Support for Admin, Author, and User roles with role-based access control
- **Article Management**: Create, read, update, delete articles with author attribution
- **Admin Dashboard**: Manage users, articles, and authors
- **Image Uploads**: Integration with Cloudinary for article images and user avatars
- **Secure API**: Password hashing with bcrypt, token verification middleware
- **CORS Protection**: Single-origin CORS configuration for frontend security
- **Database Persistence**: MongoDB integration with Mongoose ODM

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js 4.x |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcryptjs |
| **Image Storage** | Cloudinary |
| **CORS** | cors middleware |
| **Environment** | dotenv |
| **HTTP Parser** | body-parser |
| **Cookies** | cookie-parser |

## 📁 Project Structure

```
Blog-Backend/
├── APIs/                      # API route handlers
│   ├── AdminAPI.js           # Admin-only endpoints
│   ├── AuthorAPI.js          # Author management endpoints
│   ├── UserAPI.js            # User profile endpoints
│   └── commonAPI.js          # Shared endpoints (auth, articles)
├── config/
│   └── cloudinaryConfig.js   # Cloudinary setup
├── Middlewears/              # Custom middleware
│   ├── checkAuthor.js        # Author role verification
│   └── verifyToken.js        # JWT token verification
├── models/                   # Database schemas
│   ├── UserModel.js          # User schema
│   └── ArticleModel.js       # Article schema
├── services/                 # Business logic
│   └── authService.js        # Authentication utilities
├── store/
│   └── authStore.js          # Token storage/management
├── server.js                 # Express app setup & entry point
├── package.json              # Dependencies & scripts
└── .env                      # Environment variables (not in repo)
```

## 🚀 Installation

### Prerequisites
- Node.js 14+ and npm/yarn
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (see [Environment Variables](#environment-variables))
   ```bash
   cp .env.example .env  # if available
   ```

4. **Verify server starts**
   ```bash
   npm start
   ```
   Expected output: `Server is running on port 4000` (or your PORT value)

## 🔐 Environment Variables

Create a `.env` file in the `Blog-Backend/` root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Server Configuration
PORT=4000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRY=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_min_32_chars

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL (for CORS)
FRONTEND_URL=https://blog-application-beryl.vercel.app
```

### Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/blogdb` |
| `PORT` | Server port (Render uses `PORT`) | `4000` |
| `JWT_SECRET` | Secret for signing JWT tokens | `your-32-character-secret-key` |
| `CLOUDINARY_*` | Image upload service credentials | From Cloudinary dashboard |
| `FRONTEND_URL` | Allowed frontend origin for CORS | `https://blog-application-beryl.vercel.app` |

## 💻 Running Locally

### Development Mode
```bash
npm start
```
Server runs on `http://localhost:4000`

### Testing API Endpoints
Use the included `req.http` file with REST Client extension, or use:
```bash
curl -X GET http://localhost:4000/common-api/check-auth
```

### Debugging
Monitor requests in console output. Check:
- Network logs in `req.http`
- MongoDB Atlas activity monitor
- Cloudinary upload logs

## 🔌 API Endpoints

### Common API (`/common-api/*`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/register` | Public | Register new user/author |
| POST | `/login` | Public | User/author login |
| GET | `/check-auth` | JWT | Verify current user session |
| GET | `/articles` | Public | Get all articles |
| GET | `/articles/:id` | Public | Get single article |
| POST | `/articles` | JWT + Author | Create new article |
| PUT | `/articles/:id` | JWT + Author | Update article (owner only) |
| DELETE | `/articles/:id` | JWT + Author | Delete article (owner only) |

### Author API (`/author-api/*`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/my-articles` | JWT + Author | Get author's own articles |
| GET | `/profile` | JWT + Author | Get author profile |
| PUT | `/profile` | JWT + Author | Update author profile |

### User API (`/user-api/*`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/profile` | JWT | Get user profile |
| PUT | `/profile` | JWT | Update user profile |
| GET | `/articles/:id` | Public | Get article details |

### Admin API (`/admin-api/*`)
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/users` | JWT + Admin | Get all users |
| GET | `/authors` | JWT + Admin | Get all authors |
| DELETE | `/users/:id` | JWT + Admin | Delete user |
| DELETE | `/authors/:id` | JWT + Admin | Delete author |
| PUT | `/approve-author/:id` | JWT + Admin | Approve author request |

## 🗄 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  avatar: String (Cloudinary URL),
  role: String (enum: ["user", "author", "admin"]),
  bio: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Article Schema
```javascript
{
  title: String (required),
  description: String (required),
  content: String (required),
  image: String (Cloudinary URL),
  author: ObjectId (ref: User),
  authorName: String,
  category: String,
  likes: [ObjectId] (user IDs who liked),
  comments: [Object],
  published: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Authentication & Authorization

### JWT Flow
1. User registers or logs in → Backend validates credentials
2. Server issues JWT token (expires in 7 days)
3. Client stores token in localStorage
4. Token sent in `Authorization` header for protected requests
5. `verifyToken` middleware validates token on each request
6. Expired token returns 401; client should refresh

### Middleware Chain
```
Request → verifyToken (if protected) → checkAuthor (if admin-only) → API Handler
```

### Token Storage (Backend)
- Tokens stored in `authStore.js` for server-side validation
- Refresh tokens handled for session persistence
- Logout clears token from store

## 🔒 CORS Configuration

**Current Configuration** (Production):
```javascript
// Single-origin CORS for security
app.use(cors({
  origin: 'https://blog-application-beryl.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**For Local Development**:
```javascript
// Temporarily allow localhost
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 🚀 Deployment

### Deploy to Render

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Connect GitHub account
   - Create new Web Service from your repo
   - Set environment variables (see `.env` section)

3. **Configure Build & Start**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Port: `4000` (Render will assign PORT env var)

4. **Verify Deployment**
   ```bash
   curl https://backend-2-jc5u.onrender.com/common-api/check-auth
   ```

### Environment Variables on Render
Set all variables from `.env` in Render dashboard:
- MONGODB_URI
- JWT_SECRET
- CLOUDINARY_* keys
- FRONTEND_URL (your deployed Vercel URL)
- PORT (auto-set by Render, but can override)

### Post-Deployment Checklist
- [ ] Backend service deployed and running
- [ ] Database connection working
- [ ] CORS allowing frontend origin
- [ ] Cloudinary credentials working
- [ ] Frontend `.env` points to deployed backend URL

## 🐛 Troubleshooting

### Common Issues

**"CORS error: Access denied"**
- Verify `FRONTEND_URL` in `.env` matches deployed frontend URL
- Check backend has been redeployed after CORS change
- Browser console shows blocked origin - this is expected CORS rejection

**"Cannot connect to MongoDB"**
- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas (allow `0.0.0.0` for Render)
- Test connection: `mongo "mongodb+srv://..."`

**"JWT token invalid or expired"**
- Token expires in 7 days; user needs to re-login
- Check `JWT_SECRET` is same between local and deployed
- Verify token format in Authorization header: `Bearer <token>`

**"Cloudinary upload fails"**
- Verify credentials in `.env`
- Check Cloudinary account has upload preset configured
- Test upload permissions

**"PORT already in use" (local development)**
```bash
# Linux/Mac: Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Windows: Find & terminate process
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**"server.js not found" (deployment)**
- Ensure `server.js` is in root `Blog-Backend/` directory
- Check `package.json` start script: `"start": "node server.js"`

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "Add feature X"`
4. Push and create Pull Request
5. Ensure all tests pass before merging

### Code Standards
- Use meaningful variable names
- Add comments for complex logic
- Follow Express.js conventions
- Handle errors gracefully with try-catch
- Validate all user inputs

## 📞 Support & Contact

For issues, questions, or suggestions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Contact development team

---

**Last Updated**: May 2026
**Maintainers**: Development Team
**License**: MIT