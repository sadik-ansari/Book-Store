import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  Button,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
} from "@mui/material";
import { createBook } from "./api/BookApi";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const GENRES = ["Fiction", "Non-Fiction", "Self-Help", "Science", "Biography", "History", "Fantasy", "Mystery", "Romance", "Thriller", "Young Adult", "Children's"];

const YEARS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

function BookUploadForm({ open, setBooks, handleClose }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
  });
  const [image, setImage] = useState(null);
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.title) err.title = "Required";
    if (!form.author) err.author = "Required";
    if (!form.genre) err.genre = "Required";
    if (!form.publicationYear) err.publicationYear = "Required";
    if (image) {
      if (image.size > 2 * 1024 * 1024) {
        err.image = "Image must be less than 2MB";
      }
    }

    // PDF tab validation
    if (tab === 0) {
      if (!file) {
        err.file = "Upload PDF required";
      } else if (file.size > 25 * 1024 * 1024) {
        err.file = "PDF must be less than 25MB";
      }
    }

    // URL tab validation
    if (tab === 1 && !url) {
      err.url = "URL required";
    }


    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    console.log({
      ...form,
      pdf: file,
      link: url,
    });

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("genre", form.genre);
    formData.append("publicationYear", form.publicationYear);

    if (image) {
      formData.append("image", image);
    }

    if (file) {
      formData.append("pdf", file);
    }

    if (url) {
      formData.append("link", url);
    }

    setLoading(true);
    console.log(formData);
    const res = await createBook(formData);

    //here i wanna add this new book in the book list without reffresh the page
    if (res.success) {
      
      setBooks((prev) => [...prev, res.data]);
    }

    setLoading(false);
    setForm({
      title: "",
      author: "",
      genre: "",
      publicationYear: "",
    });

    setFile(null);
    setUrl("");

    handleClose(); // close modal after submit
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

      <DialogTitle>Add New Book</DialogTitle>

      <DialogContent>

        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={!!error.title}
          helperText={error.title}
          sx={{ mt: 2 }}
        />

        {/* Author */}
        <TextField
          fullWidth
          label="Author"
          name="author"
          value={form.author}
          onChange={handleChange}
          error={!!error.author}
          helperText={error.author}
          sx={{ mt: 2 }}
        />

        {/* Genre + Year */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            select
            fullWidth
            label="Genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            error={!!error.genre}
            helperText={error.genre}
          >
            {GENRES.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Year"
            name="publicationYear"
            value={form.publicationYear}
            onChange={handleChange}
            error={!!error.publicationYear}
            helperText={error.publicationYear}
          >
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>

        </Box>

        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "2px dashed #ccc",
            borderRadius: 3,
            textAlign: "center",
            backgroundColor: "#fafafa",
            transition: "0.2s",

            "&:hover": {
              borderColor: "#1976d2",
              backgroundColor: "#f5f9ff",
            },
          }}
        >

          <ImageIcon sx={{ fontSize: 40, color: "#888" }} />

          <Typography sx={{ mt: 1, fontWeight: 500 }}>
            Upload Book Image
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#777", mb: 2 }}>
            JPG, PNG or WEBP (max 5MB)
          </Typography>

          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >

            Choose File

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

          </Button>

          {image && (
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                color: "#333",
                fontWeight: 500,
              }}
            >
              Selected: {image.name}
            </Typography>
          )}

          {error.image && (
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                color: "red",
                fontWeight: 500,
              }}
            >
              {error.image}
            </Typography>
          )}

        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 2 }}>
          <Tab label="PDF" />
          <Tab label="URL" />
        </Tabs>

        {/* PDF */}
        {tab === 0 && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: "2px dashed #ccc",
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fafafa",
              transition: "0.2s",

              "&:hover": {
                borderColor: "#1976d2",
                backgroundColor: "#f5f9ff",
              },
            }}
          >

            <DescriptionIcon sx={{ fontSize: 40, color: "#888" }} />

            <Typography sx={{ mt: 1, fontWeight: 500 }}>
              Upload PDF File
            </Typography>

            <Typography sx={{ fontSize: 13, color: "#777", mb: 2 }}>
              PDF only (max 10MB)
            </Typography>

            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >

              Choose File

              <input
                hidden
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />

            </Button>

            {/* File name preview */}
            {file && (
              <Typography
                sx={{
                  mt: 2,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#333",
                }}
              >
                Selected: {file.name}
              </Typography>
            )}

            {/* Error */}
            {error.file && (
              <Typography
                color="error"
                sx={{ mt: 1 }}
              >
                {error.file}
              </Typography>
            )}

          </Box>
        )}

        {/* URL */}
        {tab === 1 && (
          <TextField
            fullWidth
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!error.url}
            helperText={error.url}
            sx={{ mt: 2 }}
          />
        )}

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>

      </DialogContent>

    </Dialog>
  );
}

export default BookUploadForm;