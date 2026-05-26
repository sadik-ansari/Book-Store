import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  CardMedia,
  Button,
} from "@mui/material";
import { getBookById } from "./BookApi";
import UpdateBookData from "./UpdateBookData";

function ViewBook({ open, handleClose, bookId, setBooks }) {
  const [book, setBook] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {

    if (!bookId) return;

    const fetchBook = async () => {
      const res = await getBookById(bookId);
      console.log(res.data)
      if (res.success) {
        setBook(res.data);
      }
    };

    fetchBook();

  }, [bookId]);

  if (!book) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          Loading...
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {book.title}

        <Button
          variant="contained"
          onClick={() => setOpenEdit(true)}
        >
          Edit
        </Button>
      </DialogTitle>

      <UpdateBookData
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        book={book}
        setBook={setBook}
        setBooks={setBooks}
      />

      <DialogContent>

        {/* TOP SECTION */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            mb: 4,
            flexWrap: "wrap",
          }}
        >

          {/* LEFT SIDE */}
          <Box sx={{ flex: 1, minWidth: "250px" }}>

            <Typography variant="h6" gutterBottom>
              Book Details
            </Typography>

            <Typography>
              <strong>Author:</strong> {book.author}
            </Typography>

            <Typography>
              <strong>Genre:</strong> {book.genre}
            </Typography>

            <Typography>
              <strong>Publication Year:</strong>{" "}
              {book.publicationYear}
            </Typography>

            {book.link && (
              <Typography sx={{ mt: 2 }}>
                <strong>External Link:</strong>

                <a
                  href={book.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginLeft: "8px" }}
                >
                  Open Link
                </a>
              </Typography>
            )}

          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              width: "250px",
              display: "flex",
              justifyContent: "center",
            }}
          >

            <img
              src={`http://localhost:5000${book.image}`}
              alt={book.title}
              style={{
                width: "100%",
                maxHeight: "350px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

          </Box>

        </Box>

        {/* PDF SECTION */}
        {book.pdf && (
          <Box>

            <Typography
              variant="h6"
              gutterBottom
            >
              PDF Preview
            </Typography>

            <iframe
              src={`http://localhost:5000${book.pdf}`}
              width="100%"
              height="500px"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              title="Book PDF"
            />

          </Box>
        )}

      </DialogContent>
    </Dialog>
  );
}

export default ViewBook;