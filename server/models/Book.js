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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);