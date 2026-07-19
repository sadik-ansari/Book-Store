const express = require("express");
const upload = require("../middleware/multer");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { authMiddleware } = require("../middleware/auth.js");

const router = express.Router();

// CREATE book
router.post(
  "/", authMiddleware,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createBook
);

// GET all books
router.get("/", authMiddleware, getAllBooks);

// GET single book
router.get("/:id", authMiddleware, getBookById);

// UPDATE book
router.put( "/:id", authMiddleware, upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]), updateBook );

// DELETE book
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;