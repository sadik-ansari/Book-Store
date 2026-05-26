const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(
    __dirname,
    "../uploads"
);

// create uploads folder if missing
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true,
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

        const safeName =
            file.originalname.replace(/\s+/g, "-");

        cb(
            null,
            Date.now() + "-" + safeName
        );
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
        fileSize: 10 * 1024 * 1024, // 10MB
    },

});