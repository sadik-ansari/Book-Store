import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/books`;
// const BASE_URL = `http://localhost:5000/api/books`;  

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
    const token = sessionStorage.getItem("token");
    const res = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = sessionStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data?.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

// CREATE book
export const createBook = async (bookData, onProgress) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.post(BASE_URL, bookData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          onProgress?.(percent);
        }
      }
    );

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
export const updateBook = async (id, updatedData, onProgress) => {

  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        if (!progressEvent.total) return;

        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        onProgress?.(percent);
      }
    });

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
    const token = sessionStorage.getItem("token");
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: "Book deleted successfully",
    };
  } catch (error) {
    return handleError(error);
  }
};