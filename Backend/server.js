const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

mongoose
  .connect(process.env.MONGO_URL + "test")
  .then(() => console.log("MongoDB Connected to test database"))
  .catch((err) => console.log(err));

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

