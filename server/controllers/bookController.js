const Book = require("../models/Book");

// CREATE Book
const createBook = async (req, res) => {
  try {
    let pdfPath = "";
    let imagePath = "";

    // PDF upload
    if (req.files?.pdf) {
      pdfPath =
        req.files.pdf[0].path;
    }

    // Image upload
    if (req.files?.image) {
      imagePath =
        req.files.image[0].path;
    }

    const bookData = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear:
        req.body.publicationYear,
      link: req.body.link || "",
      pdf: pdfPath,
      image: imagePath,
    };

    const book = await Book.create(bookData);

    res.status(201).json({
      success: true,
      data: book,
    });

  } catch (error) {
  console.error("CREATE BOOK ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

// GET all Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET single Book
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Book
const updateBook = async (req, res) => {
  try {

    const updatedData = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publicationYear: req.body.publicationYear,
      link: req.body.link,
    };

    // update pdf if uploaded
    if (req.files?.pdf) {
      updatedData.pdf =
        req.files.pdf[0].path;
    }

    // update image if uploaded
    if (req.files?.image) {
      updatedData.image =
        req.files.image[0].path;
    }

    const updatedBook =
      await Book.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      data: updatedBook,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// DELETE Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};