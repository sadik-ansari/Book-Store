const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    publicationYear: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    // Option 1: PDF upload
    pdf: {
      type: String,
      default: "",
    },

    // Option 2: External link
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// validation: at least one required
// bookSchema.pre("validate", function (next) {
//   if (
//     (!this.pdf || this.pdf.trim() === "") &&
//     (!this.link || this.link.trim() === "")
//   ) {
//     this.invalidate("pdf", "Either PDF or Link is required");
//   }
// });

module.exports = mongoose.model("Book", bookSchema);