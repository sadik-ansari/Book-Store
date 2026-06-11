const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log("file", file);

        if (
            file.mimetype === "application/pdf"
        ) {
            return { 
                folder: "books/pdfs",
                resource_type: "raw",
                public_id:
                    Date.now() +
                    "-" +
                    file.originalname,
            };
        }

        return {
            folder: "books/images",
            resource_type: "image",
            public_id:
                Date.now() +
                "-" +
                file.originalname,
        };
    },
});

// file validation
const fileFilter = (
    req,
    file,
    cb
) => {

    // pdf validation
    if (file.fieldname === "pdf") {

        if (
            file.mimetype !== "application/pdf"
        ) {
            return cb(
                new Error("Only PDF files allowed"),
                false
            );
        }
    }

    // image validation
    if (file.fieldname === "image") {

        if (
            !file.mimetype.startsWith("image/")
        ) {
            return cb(
                new Error("Only image files allowed"),
                false
            );
        }
    }

    cb(null, true);
};

module.exports = multer({
    storage, fileFilter,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB
    },

});