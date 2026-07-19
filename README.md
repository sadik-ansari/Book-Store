# 📚 Book Management System

A full-stack Book Management System built with **React.js**, **Material UI**, **Node.js**, **Express.js**, and **MongoDB**.

The project started as a frontend evaluation assignment and was later expanded into a complete full-stack application with secure authentication, user-specific book management, Cloudinary file storage, JWT authorization, and a scalable REST API.

---

# 🚀 Live Demo

**Frontend:** https://book-store-client-z5b0.onrender.com

**Backend API:** https://book-store-iyri.onrender.com

---

# ✨ Features

## 📖 Book Management

- Add new books
- View your own books
- Update book details
- Delete books
- Upload book cover images
- Upload PDF books
- Preview uploaded files

---

## 🔐 Authentication & Authorization

- User Registration
- User Login
- Guest Login
- JWT Authentication
- Protected Routes
- Password hashing using bcrypt
- Token verification middleware
- Automatic logout after token expiration
- Each user can only access their own books

---

## 🔍 Search & Filtering

- Search books by title
- Search books by author
- Filter books by genre

---

## ☁️ Cloud Storage

Instead of storing files locally, all uploaded files are stored securely using **Cloudinary**.

Supported uploads:

- Book Cover Images
- PDF Books

---

## 🎨 User Interface

- Fully responsive Material UI design
- Modern Landing Page
- Modal-based Authentication
- Upload progress indicator
- Loading states
- Error handling
- Empty state UI

---

## ⚙️ Backend Features

- RESTful API
- MongoDB with Mongoose
- JWT Authentication
- Authentication Middleware
- Password Encryption (bcrypt)
- Cloudinary Integration
- Multer for multipart form parsing
- Request Validation
- User-specific CRUD operations

---

## 📊 Additional Features

- Guest Mode
- Website Visit Counter
- Token Expiration Handling
- Protected API Routes
- Responsive Design
- File Upload Progress
- Persistent Database Storage

---

# 🛠 Tech Stack

## Frontend

- React 19
- Material UI
- Axios
- React Router

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary

---

# 📂 Project Structure

```text
client/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── assets/

server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sadik-ansari/Book-Store.git
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Backend

```bash
cd server
npm install
npm run dev
```

Runs on

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

SECRET=_jwt_secret

CLOUDINARY_CLOUD_NAME=_cloud_name

CLOUDINARY_API_KEY=_api_key

CLOUDINARY_API_SECRET=_api_secret
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api | Register User |
| POST | /api/user | Login User |
| POST | /api/user/guest-user | Guest Login |
| POST | /api/user/verifyToken | Verify JWT Token |

---

## Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/books | Get Logged-in User Books |
| GET | /api/books/:id | Get Single Book |
| POST | /api/books | Create Book |
| PUT | /api/books/:id | Update Book |
| DELETE | /api/books/:id | Delete Book |

---

## Visit Counter

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/visit | Increase Website Visit Count |

---

# 🔒 Security

- JWT Authentication
- Password Hashing with bcrypt
- Protected Backend Routes
- Token Verification Middleware
- User-specific Resource Access
- Secure File Upload Workflow

---

# 📚 What I Learned

This project helped strengthen my understanding of

- React Application Architecture
- REST API Design
- MongoDB & Mongoose
- Authentication & Authorization
- JWT Token Handling
- Password Hashing
- Express Middleware
- Cloudinary Integration
- File Upload Handling
- CRUD Operations
- Protected Routes
- Full-stack Application Development

---

# 🚀 Future Improvements

- Refresh Tokens
- Email Verification
- Forgot Password
- User Profile
- Book Favorites
- Pagination
- Infinite Scrolling
- Advanced Search
- Admin Dashboard
- AWS S3 Support
- Docker Deployment
- Unit & Integration Testing

---

# 👨‍💻 Author

**Mohammed Sadik Ansari**

Frontend Developer

GitHub: https://github.com/sadik-ansari

LinkedIn: https://www.linkedin.com/in/mohammed-sadik-ansari-947091205/