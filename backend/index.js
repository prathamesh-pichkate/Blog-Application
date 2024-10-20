import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import blogRouter from "./routes/blog.route.js";
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Connect DB
connectDb();

// CORS Configuration
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow sending cookies with requests
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`The Server Started at port ${PORT}`);
});
