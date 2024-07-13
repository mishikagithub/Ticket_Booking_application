import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routers.js";
import adminRouter from "./routes/admin-routes.js"; // Correct path
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/user", userRouter); // Use the user router
app.use("/admin",adminRouter);
app.use("/movie",movieRouter); // Use the admin router
app.use("/booking",bookingsRouter)
// Check if the password environment variable is loaded
const dbPassword = process.env.MONGODB_PASSWORD;
if (!dbPassword) {
  console.error("MONGODB_PASSWORD is not defined in the .env file");
  process.exit(1); // Exit the application if the password is not set
}

// Construct the MongoDB connection URI
const uri = `mongodb+srv://mishikavishw03:${encodeURIComponent(
  dbPassword
)}@movie.vydnzyj.mongodb.net/your-database-name?retryWrites=true&w=majority&appName=movie`;

// Connect to MongoDB and start the server
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application on connection failure
  });
