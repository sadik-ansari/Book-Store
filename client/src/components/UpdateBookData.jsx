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
    CircularProgress,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createBook, updateBook } from "./api/BookApi";

const GENRES = ["Fiction", "Non-Fiction", "Self-Help", "Science", "Biography", "History", "Fantasy", "Mystery", "Romance", "Thriller", "Young Adult", "Children's"];

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let err = {};

        if (!form.title?.trim()) err.title = "Required";
        if (!form.author?.trim()) err.author = "Required";
        if (!form.genre?.trim()) err.genre = "Required";
        if (!form.publicationYear) err.publicationYear = "Required";

        // IMAGE
        if (image) {
            if (image.size > 2 * 1024 * 1024) {
                err.image = "Image must be less than 2MB";
            }

            if (!image.type.startsWith("image/")) {
                err.image = "Invalid image file";
            }
        }

        // PDF
        if (tab === 0) {
            if (!file && !book?.pdf) {
                err.file = "Upload PDF required";
            }

            if (file && file.size > 25 * 1024 * 1024) {
                err.file = "PDF must be less than 25MB";
            }
        }

        // URL
        if (tab === 1) {
            if (!url && !book?.link) {
                err.url = "URL required";
            }

            if (url && !url.startsWith("http")) {
                err.url = "Invalid URL";
            }
        }

        console.log("VALIDATION ERRORS:", err); // 🔥 IMPORTANT

        setError(err);

        return Object.keys(err).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        console.log("first")
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

        setLoading(true);
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

            setLoading(false);
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
                        JPG, PNG or WEBP
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

                    {/* NEW SELECTED FILE */}
                    {image && (
                        <Typography
                            sx={{
                                mt: 2,
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#333",
                            }}
                        >
                            Selected: {image.name}
                        </Typography>
                    )}

                    {/* CURRENT IMAGE (if no new file selected) */}
                    {!image && book?.image && (
                        <Box sx={{ mt: 2 }}>
                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#777",
                                    mb: 1,
                                }}
                            >
                                Current Image: {book.image.split("/").pop()}
                            </Typography>

                        </Box>
                    )}

                    {error.image && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ mt: 1 }}
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
                            PDF only (recommended max 10MB)
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

                        {/* NEW FILE */}
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

                        {/* EXISTING FILE */}
                        {!file && book?.pdf && (
                            <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: 13,
                                    color: "#777",
                                }}
                            >
                                Current: {book.pdf.split("/").pop()}
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
                            "Update Book"
                        )}
                    </Button>
                </Box>

            </DialogContent>

        </Dialog>
    );
}

export default UpdateBookData;