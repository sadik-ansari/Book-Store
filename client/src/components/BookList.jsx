import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Chip,
} from "@mui/material";

import ViewBook from "./ViewBook";
import BookUploadForm from "./BookUploadForm";
import { deleteBook, getBooks } from "./api/BookApi";

function BookList() {
  // ✅ separate states
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const GENRES = ["All", "Fiction", "Non-Fiction", "Self-Help", "Science", "Biography", "History", "Fantasy", "Mystery", "Romance", "Thriller", "Young Adult", "Children's"];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const res = await getBooks();
      if (res.success) {
        setBooks(res.data);
      }

      setLoading(false);
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {

    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      book.author
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesGenre =
      genreFilter === "" ||
      book.genre === genreFilter;

    return (
      matchesSearch &&
      matchesGenre
    );
  });

  const handleView = (bookId) => {
    setSelectedBookId(bookId);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleDelete = async (id) => {
    const res = await deleteBook(id);

    if (res.success) {
      setBooks((prev) => prev.filter(book => book._id !== id))
    }
  };

  if (loading) {
    return (

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <CircularProgress size={50} />

      </Box>
    );
  }


  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          gap: 2,
        }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
            },
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          Book Management System
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpenForm}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,

            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          Add New Book
        </Button>

      </Box>

      {/* Book Upload Form */}
      <BookUploadForm open={openForm} setBooks={setBooks} handleClose={handleCloseForm} />

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 4,
        }}
      >

        {/* Search */}
        <TextField
          fullWidth
          label="Search by title or author"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        />


      </Box>
      {/* Genre Filter */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
        }}
      >

        {GENRES.map((g) => (
          <Chip
            key={g}
            label={g}
            clickable
            color={genreFilter === g || (g === "All" && genreFilter === "") ? "primary" : "default"}
            onClick={() =>
              setGenreFilter(g === "All" ? "" : g)
            }
            sx={{
              fontWeight: 500,
              borderRadius: 2,
            }}
          />
        ))}

      </Box>

      {books.length === 0 && (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Books Found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 3,
            }}
          >
            Start by adding your first book.
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpenForm}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Add New Book
          </Button>

        </Box>
      )}

      {/* Book Grid */}
      <Grid container spacing={{ xs: 2, md: 6 }} >
        {filteredBooks.map((book) => (
          <Grid size={{ xs: 12, md: 6 }} key={book._id}>

            <Card
              sx={{
                display: "flex",

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },

                gap: 3,
                p: 2.5,
                borderRadius: 4,

                boxShadow:
                  "0 1px 50px rgba(0,0,0,0.03)",

                transition: "0.3s",

                height: "100%",
                width: "100%",

                alignItems: {
                  xs: "flex-start",
                  sm: "center",
                },

                border: "1px solid #eee",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.10)",
                },
              }}
            >

              {/* Left Content */}
              <CardContent
                sx={{
                  flex: 1,
                  p: "0 !important",
                }}
              >

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.5rem",
                    },
                    fontWeight: 600,
                    mb: 1,
                    lineHeight: 1.3,

                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {book.title}
                </Typography>

                {/* Author */}
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "#555",
                    mb: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: "#111",
                    }}
                  >
                    Author:
                  </Box>{" "}
                  {book.author}
                </Typography>

                {/* Genre */}
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "#555",
                    mb: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: "#111",
                    }}
                  >
                    Genre:
                  </Box>{" "}
                  {book.genre}
                </Typography>

                {/* Year */}
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: "#555",
                    mb: 3,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: "#111",
                    }}
                  >
                    Published:
                  </Box>{" "}
                  {book.publicationYear}
                </Typography>

                {/* Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap",
                  }}
                >

                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() =>
                      handleView(book._id)
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 3,
                      fontWeight: 500,
                    }}
                  >
                    View
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() =>
                      handleDelete(book._id)
                    }
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      px: 3,
                      fontWeight: 500,
                    }}
                  >
                    Delete
                  </Button>

                </Box>

              </CardContent>

              {/* Right Image */}
              <CardMedia
                component="img"
                image={book.image}
                alt={book.title}
                sx={{
                  width: {
                    xs: "100%",
                    sm: 140,
                  },

                  height: {
                    xs: 260,
                    sm: 200,
                  },

                  borderRadius: 3,

                  objectFit: "cover",

                  flexShrink: 0,

                  boxShadow:
                    "0 2px 50px rgba(0,0,0,0.04)",
                }}
              />

            </Card>

          </Grid>
        ))}
      </Grid>

      {/* View Book Modal */}
      <ViewBook
        open={openView}
        handleClose={handleCloseView}
        bookId={selectedBookId}
        setBooks={setBooks}
      />
    </Box>
  );
}

export default BookList;