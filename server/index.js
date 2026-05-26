const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// connect DB
connectDB();

// routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Book Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});