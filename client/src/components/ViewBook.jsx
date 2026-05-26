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
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getBookById } from "./api/BookApi";
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
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: {
            xs: 1,
            sm: 2,
          },
          backgroundColor: "#fafafa",
        },
      }}
    >

      {/* HEADER */}
      <DialogTitle
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          pb: 1,
          width: "95%",
        }}
      >

        <Typography
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2rem",
            },
            fontWeight: 700,
            lineHeight: 1.2,
            pr: 5,
          }}
        >
          {book.title}
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenEdit(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            fontWeight: 500,
          }}
        >
          Edit Book
        </Button>


      </DialogTitle>

      {/* CLOSE BUTTON */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 20,
          top: 18,
          color: "#666",

          "&:hover": {
            backgroundColor: "#f3f3f3",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* EDIT MODAL */}
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
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
            gap: 5,
            mt: 2,
            mb: 5,
          }}
        >

          {/* LEFT DETAILS */}
          <Box
            sx={{
              flex: 1,
            }}
          >

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Book Details
            </Typography>

            {/* Detail Card */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff",
                border: "1px solid #eee",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.04)",
              }}
            >

              <Typography>
                <strong>Author:</strong>{" "}
                {book.author}
              </Typography>

              <Typography>
                <strong>Genre:</strong>{" "}
                {book.genre}
              </Typography>

              <Typography>
                <strong>Publication Year:</strong>{" "}
                {book.publicationYear}
              </Typography>

              {book.link && (
                <Typography>

                  <strong>
                    External Link:
                  </strong>

                  <a
                    href={book.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: 8,
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    Open Link
                  </a>

                </Typography>
              )}

            </Box>

          </Box>

          {/* RIGHT IMAGE */}
         <Box
  sx={{
    width: {
      xs: "100%",
      md: 300,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
  <Box
    sx={{
      width: "100%",
      height: 380,
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
      backgroundColor: "#f5f5f5",
    }}
  >
    <img
      src={`${import.meta.env.VITE_API_URL}${book.image}`}
      alt={book.title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  </Box>
</Box>

        </Box>

        {/* PDF SECTION */}
        {book.pdf && (

          <Box>

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 2,
              }}
            >
              PDF Preview
            </Typography>

            <Box
              sx={{
                overflow: "hidden",
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.04)",
                backgroundColor: "#fff",
              }}
            >

              <iframe
                src={`${import.meta.env.VITE_API_URL}${book.pdf}`}
                width="100%"
                height="800px"
                style={{
                  border: "none",
                }}
                title="Book PDF"
              />

            </Box>

          </Box>
        )}

      </DialogContent>

    </Dialog>
  );
}

export default ViewBook;