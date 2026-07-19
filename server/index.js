const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const usersBookRoutes = require('./routes/usersBookRoutes')
const userVisitRoute = require('./routes/userVisitRoute')

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// connect DB
// connectDB();

// routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);
app.use("/api", usersBookRoutes)
app.use("/api/visit", userVisitRoute)

// app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Book Server Running");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer(); 