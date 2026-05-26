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
} from "@mui/material";

import ViewBook from "./ViewBook";
import BookUploadForm from "./BookUploadForm";
import { deleteBook, getBooks } from "./BookApi";

function BookList() {
  // ✅ separate states
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getBooks();
      if (res.success) {
        setBooks(res.data);
      }
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

    console.log(res);

    if (res.success) {
      setBooks((prev) => prev.filter(book => book._id !== id))
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Book List</Typography>

        <Button variant="contained" onClick={handleOpenForm}>
          Add New Book
        </Button>
      </Box>

      {/* Book Upload Form */}
      <BookUploadForm open={openForm} setBooks={setBooks} handleClose={handleCloseForm} />

      <Box
        sx={{
          display: "flex",
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
        />

        {/* Genre Filter */}
        <TextField
          select
          label="Genre"
          value={genreFilter}
          onChange={(e) =>
            setGenreFilter(e.target.value)
          }
          sx={{ minWidth: 200 }}
        >

          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="Fiction">
            Fiction
          </MenuItem>

          <MenuItem value="Non-Fiction">
            Non-Fiction
          </MenuItem>

          <MenuItem value="Self-Help">
            Self-Help
          </MenuItem>

          <MenuItem value="Science">
            Science
          </MenuItem>

        </TextField>

      </Box>

      {/* Book Grid */}
      <Grid container spacing={3} >
        {filteredBooks.map((book) => (
          <Grid size={{ xs: 12, sm: 12, md: 6 }} key={book._id}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                height: "100%",
              }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{book.title}</Typography>

                <Typography color="text.secondary">
                  Author: {book.author}
                </Typography>

                <Typography color="text.secondary">
                  Genre: {book.genre}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Year: {book.year}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleView(book._id)}
                  >
                    View
                  </Button>

                  <Button onClick={() => handleDelete(book._id)} variant="outlined" color="error" size="small" >
                    Delete
                  </Button>
                </Box>
              </CardContent>

              <CardMedia
                component="img"
                image={`http://localhost:5000${book.image}`}
                alt={book.title}
                sx={{
                  width: 120,
                  height: 160,
                  borderRadius: 2,
                  objectFit: "cover",
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