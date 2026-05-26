const express = require("express");
const upload = require("../middleware/multer");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// CREATE book
router.post(
  "/",
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createBook
);

// GET all books
router.get("/", getAllBooks);

// GET single book
router.get("/:id", getBookById);

// UPDATE book
router.put( "/:id", upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]), updateBook );

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;