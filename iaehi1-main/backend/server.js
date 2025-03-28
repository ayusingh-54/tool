// filepath: /c:/Users/uditv/OneDrive/Desktop/iaehi/backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

// Import and use the users route
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Import and use the admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
