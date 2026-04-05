const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Finance Backend Running ✅");
});

// server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});