# 📝 Blog Post Management System

A modern, production-ready full-stack web application for managing blog posts with complete CRUD functionality, search, pagination, CSV export, dark mode, and a premium SaaS-quality UI.

Built with **React.js** + **Node.js/Express** + **MongoDB** — plain JavaScript throughout.

---

## ✨ Features

### Core Functionality
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Server-side pagination with configurable page size
- ✅ Real-time search across title, author, and category
- ✅ Category and status filtering
- ✅ CSV export (all posts or filtered results)
- ✅ Dashboard with statistics cards
- ✅ Form validation with Zod (client + server)

### UI/UX
- 🌙 Dark/Light mode with system preference detection
- 🎨 Premium SaaS design inspired by Linear, Vercel & Notion
- 📱 Fully responsive (mobile, tablet, desktop)
- ⏳ Skeleton loading states
- 🔔 Toast notifications for all operations
- 💬 Confirmation dialogs before destructive actions
- 🎯 Empty states with call-to-action
- ✨ Smooth animations and micro-interactions

### Architecture
- 🏗️ Clean, modular architecture with separation of concerns
- 🔄 Reusable component library (15+ components)
- 📦 Service layer pattern (frontend & backend)
- 🛡️ Comprehensive error handling
- 📝 Professional JSDoc comments throughout

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| Shadcn UI | Component library (Radix UI primitives) |
| React Router v6 | Client-side routing |
| TanStack Query | Server state management |
| React Hook Form | Form management |
| Zod | Schema validation |
| Axios | HTTP client |
| Lucide React | Icons |
| Sonner | Toast notifications |
| next-themes | Dark mode |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| Zod | Validation |
| json2csv | CSV generation |
| Helmet | Security headers |
| Morgan | HTTP logging |
| CORS | Cross-origin support |

---

## 📸 Screenshots

> Add screenshots of your deployed application here

| Page | Description |
|------|-------------|
| Dashboard | Statistics overview with recent posts |
| Blog Listing | Data table with search, filters, pagination |
| Create Post | Form with real-time validation |
| Post Details | Creative blog post display |
| Edit Post | Prefilled form with validations |
| Dark Mode | Full dark mode support |

---

## 📁 Project Structure

```
blog-management/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/      # Error handling, async wrapper
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── services/        # Business logic layer
│   │   ├── utils/           # Utilities (CSV export, seed, AppError)
│   │   ├── validations/     # Zod schemas
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point
│   ├── .env.example         # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/      # PageHeader, StatusBadge, ConfirmDialog, etc.
│   │   │   ├── forms/       # FormInput, FormTextarea, FormSelect, PostForm
│   │   │   ├── layout/      # Header, Sidebar, Layout
│   │   │   ├── providers/   # ThemeProvider, QueryProvider
│   │   │   ├── table/       # DataTable, SearchBar, Pagination
│   │   │   └── ui/          # Shadcn UI primitives
│   │   ├── constants/       # App constants
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Axios instance, utilities
│   │   ├── pages/           # Route page components
│   │   ├── services/        # API service layer
│   │   ├── App.jsx          # Router setup
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles & design tokens
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ (v22 recommended)
- **npm** v9+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd blog-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-management
NODE_ENV=development
```

```bash
# Seed the database with 25 sample posts
npm run seed

# Start development server
npm run dev
```

The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Blog Posts

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/posts` | Create a new blog post |
| `GET` | `/posts` | Get all posts (paginated) |
| `GET` | `/posts/search` | Search posts |
| `GET` | `/posts/stats` | Get dashboard statistics |
| `GET` | `/posts/export` | Export posts as CSV |
| `GET` | `/posts/:id` | Get a single post |
| `PUT` | `/posts/:id` | Update a post |
| `DELETE` | `/posts/:id` | Delete a post |
| `GET` | `/health` | Health check |

### Query Parameters

#### GET /posts
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `category` | string | — | Filter by category |
| `status` | string | — | Filter by status (Draft/Published) |

#### GET /posts/search
| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Search term (searches title, author, category) |
| `page` | number | Page number |
| `limit` | number | Items per page |

#### GET /posts/export
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter exported posts by category |
| `status` | string | Filter exported posts by status |

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Posts retrieved successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

## 📋 Database Schema

```javascript
{
  title: String,             // Required, min 5 characters
  author: String,            // Required
  email: String,             // Valid email format
  category: String,          // Required
  tags: [String],            // Array of tag strings
  thumbnail: String,         // Valid URL
  shortDescription: String,  // Min 20 characters
  content: String,           // Min 100 characters
  status: "Draft" | "Published",
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-updated
}
```

---

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| Title | Required, minimum 5 characters |
| Author | Required |
| Email | Required, valid email format |
| Category | Required |
| Short Description | Required, minimum 20 characters |
| Content | Required, minimum 100 characters |
| Thumbnail URL | Required, valid URL |
| Status | Required, must be "Draft" or "Published" |
| Tags | Array of strings |

---

## 🧩 Reusable Components

| Component | Location | Description |
|-----------|----------|-------------|
| `DataTable` | `components/table/` | Configurable data table |
| `SearchBar` | `components/table/` | Search with filters |
| `Pagination` | `components/table/` | Page navigation |
| `StatusBadge` | `components/common/` | Color-coded status indicator |
| `ConfirmDialog` | `components/common/` | Destructive action confirmation |
| `PostCard` | `components/common/` | Blog post preview card |
| `PageHeader` | `components/common/` | Page title with breadcrumbs |
| `StatsCard` | `components/common/` | Dashboard statistics card |
| `EmptyState` | `components/common/` | Empty list placeholder |
| `FormInput` | `components/forms/` | Text input with validation |
| `FormTextarea` | `components/forms/` | Textarea with character count |
| `FormSelect` | `components/forms/` | Select dropdown |
| `PostForm` | `components/forms/` | Complete blog post form |

---

## 🚢 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the **Root Directory** to `frontend`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add environment variable:
   - `VITE_API_URL` = Your backend Render URL (e.g., `https://your-api.onrender.com`)
7. Deploy!

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) and create a **Web Service**
3. Connect your repository
4. Set the **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add environment variables:
   - `PORT` = `5000`
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `CORS_ORIGIN` = Your Vercel frontend URL
   - `NODE_ENV` = `production`
8. Deploy!

---

## 🏗️ Scripts

### Backend
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run seed     # Seed database with 25 sample posts
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build locally
```

---

## 🔒 Error Handling

### Backend
- Global error handler middleware
- Async handler wrapper for all routes
- Mongoose error handling (CastError, duplicate keys, validation)
- Zod validation errors with field-level messages
- 404 handler for unknown routes
- Custom `AppError` class

### Frontend
- API error interception via Axios interceptors
- Toast notifications for all API failures
- Form-level validation errors with Zod
- Network error handling
- Loading and error states for all pages

---

## 📄 License

This project is created as part of a Full Stack Developer assessment.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
