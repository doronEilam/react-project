const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cardRoutes = require("./routes/cards");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);

const PORT = 4000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
