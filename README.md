# Book Management System

A full-stack Book Management System built using React.js, Material UI, Node.js, Express.js, and MongoDB.

This project was developed as part of a frontend evaluation assignment, but was extended with a custom backend API, file upload handling, and complete CRUD functionality to demonstrate full-stack development skills and scalable application structure.

---

## Features

### Book Management
- View all books
- Add new books
- Update existing books
- Delete books

### Search & Filtering
- Search books by title
- Search books by author
- Filter books by genre

### File Upload Support
- Upload book PDF files
- Upload book cover images
- Preview uploaded content

### UI Features
- Responsive Material UI design
- Modal-based forms
- Loading & error handling
- Consistent edit/create workflows

### Backend Features
- REST API with Express.js
- MongoDB database integration
- Multer-based file uploads
- Validation handling
- Static file serving

---

## Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

---

## Project Structure

```bash
client/
│
├── src/
│   ├── components/
│   ├── api/
│   └── assets/

server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/
└── config/
```

---

## Installation

### Clone Repository

```bash
git clone <https://github.com/sadik-ansari/Book-Store>
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the `Books` directory:

```env
PORT=5000
MONGO_URI=mongodb_connection_string
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| GET | /api/books/:id | Get single book |
| POST | /api/books | Create book |
| PUT | /api/books/:id | Update book |
| DELETE | /api/books/:id | Delete book |

---

## Learning Outcomes

This project helped strengthen understanding of:

- CRUD operations
- REST API integration
- React state management
- File uploads using Multer
- Form validation
- Component structuring
- Full-stack application architecture

---

## Additional Improvements Beyond Assignment

The original assignment focused mainly on frontend development and API integration.

Additional features implemented include:

- Custom backend API development
- MongoDB database integration
- PDF upload functionality
- Image upload functionality
- File validation handling
- Persistent data storage
- Full-stack architecture setup

---

## Future Improvements

- Authentication & authorization
- Pagination
- Cloud file storage (Cloudinary / AWS S3)
- Advanced search
- Debounced search input
- Dark mode support

---

## Author

Mohammed Sadik Ansari