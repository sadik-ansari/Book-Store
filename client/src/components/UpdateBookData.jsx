import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { createBook, updateBook } from "./BookApi";

const GENRES = ["Fiction", "Non-Fiction", "Self-Help", "Science"];

const YEARS = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
);

function UpdateBookData({ open, handleClose, book, setBook, setBooks }) {
    const [form, setForm] = useState({
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        publicationYear: book?.publicationYear || "",
    });

    useEffect(() => {

        if (book) {
            setForm({
                title: book.title || "",
                author: book.author || "",
                genre: book.genre || "",
                publicationYear:
                    book.publicationYear || "",
            });

            setUrl(book.link || "");
        }

    }, [book]);

    const [image, setImage] = useState(null);
    const [tab, setTab] = useState(0);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const validate = () => {

  let err = {};

  if (!form.title)
    err.title = "Required";

  if (!form.author)
    err.author = "Required";

  if (!form.genre)
    err.genre = "Required";

  if (!form.publicationYear)
    err.publicationYear = "Required";

  // PDF tab validation
  if (
    tab === 0 &&
    !file &&
    !book?.pdf
  ) {
    err.file = "Upload PDF required";
  }

  // URL tab validation
  if (
    tab === 1 &&
    !url &&
    !book?.link
  ) {
    err.url = "URL required";
  }

  setError(err);

  return (
    Object.keys(err).length === 0
  );
};

    const handleSubmit = async () => {
        if (!validate()) return;
        console.log("submitted");
        
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

        const res = await updateBook(book._id, formData);

        //here i wanna add this new book in the book list without reffresh the page
        if (res.success) {

            // update single selected book
            setBook(res.data);

            // update book list
            setBooks((prev) =>
                prev.map((book) =>
                    book._id === res.data._id
                        ? res.data
                        : book
                )
            );

            handleClose();
        }
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
                <Box sx={{ mt: 2 }}>

                    <Typography mb={1}>
                        Upload Book Image
                    </Typography>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    {/* Existing uploaded filename */}
                    {!image && book?.image && (
                        <Typography
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            Current File:
                            {" "}
                            {book.image.split("/").pop()}
                        </Typography>
                    )}

                    {/* Newly selected filename */}
                    {image && (
                        <Typography
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            Selected File:
                            {" "}
                            {image.name}
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
                    <Box sx={{ mt: 2 }}>

                        <Typography mb={1}>
                            Upload PDF
                        </Typography>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setFile(e.target.files[0])
                            }
                        />

                        {/* Existing uploaded pdf */}
                        {!file && book?.pdf && (
                            <Typography
                                variant="body2"
                                sx={{ mt: 1 }}
                            >
                                Current PDF:
                                {" "}
                                {book.pdf.split("/").pop()}
                            </Typography>
                        )}

                        {/* Newly selected pdf */}
                        {file && (
                            <Typography
                                variant="body2"
                                sx={{ mt: 1 }}
                            >
                                Selected PDF:
                                {" "}
                                {file.name}
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

                    <Button fullWidth variant="contained" onClick={handleSubmit}>
                        Update Book
                    </Button>
                </Box>

            </DialogContent>

        </Dialog>
    );
}

export default UpdateBookData;