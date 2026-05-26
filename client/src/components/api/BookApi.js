import axios from "axios";

const BASE_URL = "http://localhost:5000/api/books";

// Helper function for error handling
const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      success: false,
      message: error.response.data?.message || "Server Error",
      status: error.response.status,
    };
  } else if (error.request) {
    // No response from server
    return {
      success: false,
      message: "No response from server",
    };
  } else {
    // Other errors
    return {
      success: false,
      message: error.message,
    };
  }
};

// GET all books
export const getBooks = async () => {
  try {
    const res = await axios.get(BASE_URL);
    
    return {
      success: true,
      data: res.data?.data || [],
    };
  } catch (error) {
    return handleError(error);
  }
};

// GET single book
export const getBookById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

// CREATE book
export const createBook = async (bookData) => {
  try {
    console.log("Creating book with data:", bookData);
    const res = await axios.post(BASE_URL, bookData);

    return {
      success: true,
      data: res.data?.data,
      message: "Book created successfully",
    };
  } catch (error) {
    return handleError(error);
  }
};

// UPDATE book
export const updateBook = async (id, updatedData) => {
  console.log("Updating book with ID:", id);
  for (let pair of updatedData.entries()) {
    console.log(pair[0], pair[1]);
  }
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData);

    return {
      success: true,
      data: res.data?.data,
      message: "Book updated successfully",
    };
  } catch (error) {
    return handleError(error);
  }
};

// DELETE book
export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);

    return {
      success: true,
      message: "Book deleted successfully",
    };
  } catch (error) {
    return handleError(error);
  }
};